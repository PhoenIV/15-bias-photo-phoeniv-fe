"use client";

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";

const STORAGE_KEY = "phoeniv:in-app-history";
const HISTORY_STATE_KEY = "__inAppHistoryIndex";
export const MAX_HISTORY_STACK = 50;

const InAppHistoryContext = createContext({
  checkCanGoBack: () => false,
  markFallbackReplace: () => {},
});

/**
 * document.referrer가 현재 앱과 동일한 출처인지 판별
 *
 * @param {string} referrer
 * @param {string} currentOrigin
 * @returns {boolean}
 */
export function isSameOriginReferrer(referrer, currentOrigin) {
  if (!referrer || !currentOrigin) return false;
  try {
    return new URL(referrer).origin === currentOrigin;
  } catch {
    return false;
  }
}

/**
 * 앱 내 이전 히스토리로 돌아갈 수 있는지 판별
 *
 * @param {{ index: number, stack: string[] } | null | undefined} historyState
 * @param {number} browserHistoryLength
 * @returns {boolean}
 */
export function canNavigateBackInApp(historyState, browserHistoryLength) {
  return Boolean(historyState && historyState.index > 0 && browserHistoryLength > 1);
}

/**
 * 초기 마운트 시 sessionStorage에 저장된 히스토리 스택을 복원할지 판별
 * - 새로고침(reload)이거나 현재 history.state에 유효한 앱 내 인덱스가 기록된 경우에만 복원합니다.
 * - 새 탭 진입, 외부 링크 진입, 로그인 리다이렉트 직후에는 false를 반환해 0부터 새로 시작합니다.
 *
 * @param {Object} params
 * @param {{ index: number, stack: string[] } | null | undefined} params.stored
 * @param {string} params.pathname
 * @param {string} params.navType
 * @param {number | undefined} params.stateIndex
 * @param {number} params.browserHistoryLength
 * @returns {boolean}
 */
export function shouldRestoreStoredHistory({
  browserHistoryLength,
  navType,
  pathname,
  stateIndex,
  stored,
}) {
  if (!stored || !Array.isArray(stored.stack) || stored.stack.length === 0) {
    return false;
  }
  if (browserHistoryLength <= 1) {
    return false;
  }
  if (
    typeof stateIndex === "number" &&
    stateIndex >= 0 &&
    stateIndex < stored.stack.length &&
    stored.stack[stateIndex] === pathname
  ) {
    return true;
  }
  if (
    (navType === "reload" || navType === "back_forward") &&
    stored.stack[stored.index] === pathname
  ) {
    return true;
  }
  return false;
}

/**
 * 저장된 히스토리 스택을 복원할 때 stateIndex를 우선 반영
 *
 * @param {{ index: number, stack: string[] }} stored
 * @param {string} pathname
 * @param {number | undefined} stateIndex
 * @returns {{ index: number, stack: string[] }}
 */
export function resolveRestoredHistoryState(stored, pathname, stateIndex) {
  if (
    typeof stateIndex === "number" &&
    stateIndex >= 0 &&
    stateIndex < stored.stack.length &&
    stored.stack[stateIndex] === pathname
  ) {
    return { index: stateIndex, stack: stored.stack };
  }
  if (stored.stack[stored.index] === pathname) {
    return stored;
  }
  return resolveNextHistoryState(stored, pathname, { isPopState: true, stateIndex });
}

/**
 * 현재 경로 변경이 replace 이동인지 판별
 * 1순위: BackButton 폴백 등 명시적인 replace 플래그(isExplicitReplace)
 * 2순위: Navigation API의 navigate 이벤트가 제공한 navigationType("replace" | "push" 등)
 * 3순위(폴백 휴리스틱): Navigation API 미지원 환경(구형 Safari 등)에서는 뒤로가기 이력이 없을 때
 *   history.length가 그대로인 경우 replace로 간주합니다.
 *   (한계: Navigation API 미지원 브라우저에서 한 번 이상 뒤로가기를 수행한 이후에는
 *    새 push가 forward 기록을 덮어써도 history.length가 늘지 않을 수 있으므로 휴리스틱을 비활성화합니다.)
 *
 * @param {Object} params
 * @param {boolean} [params.isExplicitReplace=false]
 * @param {boolean} [params. isPopState=false]
 * @param {string | null} [params.navigationType=null]
 * @param {boolean} [params.hasPopped=false]
 * @param {number} [params.prevHistoryLength=0]
 * @param {number} [params.currentHistoryLength=0]
 * @param {number} [params.maxStackSize=MAX_HISTORY_STACK]
 * @returns {boolean}
 */
export function detectReplaceNavigation({
  currentHistoryLength = 0,
  hasPopped = false,
  isExplicitReplace = false,
  isPopState = false,
  maxStackSize = MAX_HISTORY_STACK,
  navigationType = null,
  prevHistoryLength = 0,
} = {}) {
  if (isPopState) return false;
  if (isExplicitReplace) return true;
  if (navigationType === "replace") return true;
  if (navigationType === "push" || navigationType === "traverse") return false;

  return (
    !hasPopped &&
    prevHistoryLength > 0 &&
    currentHistoryLength === prevHistoryLength &&
    currentHistoryLength < maxStackSize
  );
}

/**
 * 경로 변경 시 다음 앱 내 히스토리 스택과 인덱스를 계산
 *
 * @param {{ index: number, stack: string[] } | null | undefined} prevState
 * @param {string} pathname
 * @param {Object} [options]
 * @param {boolean} [options.isPopState=false] - 브라우저 뒤로/앞으로가기(popstate) 여부
 * @param {boolean} [options.isReplace=false] - router.replace 이동 여부
 * @param {number} [options.stateIndex] - history.state에 기록된 인덱스 (교차 검증용)
 * @param {number} [options.maxStackSize=MAX_HISTORY_STACK] - 스택 최대 크기
 * @returns {{ index: number, stack: string[] }}
 */
export function resolveNextHistoryState(
  prevState,
  pathname,
  { isPopState = false, isReplace = false, maxStackSize = MAX_HISTORY_STACK, stateIndex } = {},
) {
  if (!prevState || !Array.isArray(prevState.stack) || prevState.stack.length === 0) {
    return { index: 0, stack: [pathname] };
  }

  // 동일 pathname으로 호출된 경우(쿼리 변경 등) 기존 스택 유지
  if (prevState.stack[prevState.index] === pathname && !isPopState && !isReplace) {
    return prevState;
  }

  if (isPopState) {
    // 1순위: history.state에 저장된 인덱스가 있고 해당 위치의 경로가 일치하면 정확히 복원
    if (
      typeof stateIndex === "number" &&
      stateIndex >= 0 &&
      stateIndex < prevState.stack.length &&
      prevState.stack[stateIndex] === pathname
    ) {
      return { index: stateIndex, stack: prevState.stack };
    }
    // 2순위: 직전/직후 항목과 일치하는 경우 (일반적인 1칸 뒤로/앞으로가기)
    if (prevState.index > 0 && prevState.stack[prevState.index - 1] === pathname) {
      return { index: prevState.index - 1, stack: prevState.stack };
    }
    if (
      prevState.index + 1 < prevState.stack.length &&
      prevState.stack[prevState.index + 1] === pathname
    ) {
      return { index: prevState.index + 1, stack: prevState.stack };
    }
    // 3순위: 스택 내 가장 가까운 이전 경로 탐색
    const matchedIndex = prevState.stack.lastIndexOf(pathname, prevState.index - 1);
    if (matchedIndex !== -1) {
      return { index: matchedIndex, stack: prevState.stack };
    }
    return { index: Math.max(0, prevState.index - 1), stack: prevState.stack };
  }

  if (isReplace) {
    const nextStack = [...prevState.stack];
    nextStack[prevState.index] = pathname;
    return { index: prevState.index, stack: nextStack };
  }

  const appended = [...prevState.stack.slice(0, prevState.index + 1), pathname];
  const nextStack =
    appended.length > maxStackSize ? appended.slice(appended.length - maxStackSize) : appended;
  return { index: nextStack.length - 1, stack: nextStack };
}

function readStoredHistory() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed.index === "number" &&
      parsed.index >= 0 &&
      Array.isArray(parsed.stack) &&
      parsed.stack.length > 0 &&
      parsed.index < parsed.stack.length
    ) {
      return parsed;
    }
  } catch {
    // sessionStorage 접근 제한 또는 파싱 오류 무시
  }
  return null;
}

function writeStoredHistory(state) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // sessionStorage 접근 제한 무시
  }
}

function clearStoredHistory() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // sessionStorage 접근 제한 무시
  }
}

function readHistoryStateIndex() {
  if (typeof window === "undefined") return undefined;
  const value = window.history.state?.[HISTORY_STATE_KEY];
  return typeof value === "number" && value >= 0 ? value : undefined;
}

function writeHistoryStateIndex(index) {
  if (typeof window === "undefined") return;
  if (window.history.state?.[HISTORY_STATE_KEY] === index) return;
  window.history.replaceState({ ...window.history.state, [HISTORY_STATE_KEY]: index }, "");
}

function getNavigationType() {
  if (typeof window === "undefined") return "navigate";
  const entry = window.performance?.getEntriesByType?.("navigation")?.[0];
  return entry?.type ?? "navigate";
}

/**
 * 공통 헤더(AppHeader)에서 앱 내 페이지 이동 스택을 추적하는 훅
 * - 동일 pathname 내의 쿼리만 바뀌는 경우(필터/검색 등)는 페이지 단위 뒤로가기를 위해 집계하지 않음
 *
 * @param {string} pathname - 현재 경로 (usePathname)
 */
export function useInAppHistory(pathname) {
  const historyRef = useRef({ index: 0, stack: [pathname] });
  const prevPathnameRef = useRef(null);
  const prevHistoryLengthRef = useRef(0);
  const lastNavTypeRef = useRef(null);
  const hasPoppedRef = useRef(false);
  const isPopStateRef = useRef(false);
  const isReplacingRef = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      hasPoppedRef.current = true;
      // 동일 pathname 내 쿼리/해시 popstate인 경우 pathname effect가 실행되지 않으므로 플래그를 남기지 않음
      if (window.location.pathname === prevPathnameRef.current) {
        isPopStateRef.current = false;
        return;
      }
      isPopStateRef.current = true;
    };

    const handleNavigate = (event) => {
      if (typeof event?.navigationType === "string") {
        lastNavTypeRef.current = event.navigationType;
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.navigation?.addEventListener?.("navigate", handleNavigate);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.navigation?.removeEventListener?.("navigate", handleNavigate);
      // (main) 레이아웃 언마운트(예: /login 이동) 시 스토리지 정리
      // StrictMode 재마운트 시에는 아래 [pathname] effect에서 즉시 다시 기록됨
      clearStoredHistory();
    };
  }, []);

  useEffect(() => {
    // early return 전에 플래그를 먼저 소비·초기화하여 동일 경로에서 플래그가 잔류하는 버그 방지
    const isPopState = isPopStateRef.current;
    const isExplicitReplace = isReplacingRef.current;
    const navigationType = lastNavTypeRef.current;
    isPopStateRef.current = false;
    isReplacingRef.current = false;
    lastNavTypeRef.current = null;

    if (prevPathnameRef.current === pathname) {
      prevHistoryLengthRef.current = window.history.length;
      // StrictMode에서 cleanup -> 재마운트 시 지워진 sessionStorage를 현재 상태로 다시 동기화
      writeStoredHistory(historyRef.current);
      writeHistoryStateIndex(historyRef.current.index);
      return;
    }

    const isInitialMount = prevPathnameRef.current === null;
    prevPathnameRef.current = pathname;

    const currentHistoryLength = window.history.length;
    const stateIndex = readHistoryStateIndex();

    if (isInitialMount) {
      const navType = getNavigationType();
      const stored = readStoredHistory();

      if (
        shouldRestoreStoredHistory({
          browserHistoryLength: currentHistoryLength,
          navType,
          pathname,
          stateIndex,
          stored,
        })
      ) {
        const restoredState = resolveRestoredHistoryState(stored, pathname, stateIndex);
        historyRef.current = restoredState;
        prevHistoryLengthRef.current = currentHistoryLength;
        writeStoredHistory(restoredState);
        writeHistoryStateIndex(restoredState.index);
        return;
      }

      // 새 탭 직접 진입, 외부 사이트 진입, 또는 로그인 리다이렉트 직후에는 0부터 시작
      const initialState = { index: 0, stack: [pathname] };
      historyRef.current = initialState;
      prevHistoryLengthRef.current = currentHistoryLength;
      writeStoredHistory(initialState);
      writeHistoryStateIndex(0);
      return;
    }

    const isReplace = detectReplaceNavigation({
      currentHistoryLength,
      hasPopped: hasPoppedRef.current,
      isExplicitReplace,
      isPopState,
      navigationType,
      prevHistoryLength: prevHistoryLengthRef.current,
    });

    const nextState = resolveNextHistoryState(historyRef.current, pathname, {
      isPopState,
      isReplace,
      stateIndex,
    });

    historyRef.current = nextState;
    prevHistoryLengthRef.current = currentHistoryLength;
    writeStoredHistory(nextState);
    writeHistoryStateIndex(nextState.index);
  }, [pathname]);

  const checkCanGoBack = useCallback(() => {
    if (typeof window === "undefined") return false;
    return canNavigateBackInApp(historyRef.current, window.history.length);
  }, []);

  const markFallbackReplace = useCallback(() => {
    isReplacingRef.current = true;
  }, []);

  return useMemo(
    () => ({ checkCanGoBack, markFallbackReplace }),
    [checkCanGoBack, markFallbackReplace],
  );
}

/**
 * 하위 헤더 컴포넌트(BackButton 등)에 앱 내 히스토리 제어 함수를 제공하는 Provider
 */
export function InAppHistoryProvider({ children, value }) {
  return createElement(InAppHistoryContext.Provider, { value }, children);
}

/**
 * BackButton에서 앱 내 히스토리 컨텍스트를 조회하는 훅
 */
export function useInAppHistoryContext() {
  return useContext(InAppHistoryContext);
}
