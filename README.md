# 📸 최애의 포토 - Frontend

> **"최애의 포토카드를 사고, 팔고, 교환하는 디지털 컬렉션 마켓플레이스"**

"최애의 포토"는 좋아하는 아이돌·스포츠 스타·그림의 디지털 포토카드를 사고팔고 교환하며 나만의 컬렉션을 완성하는 팬덤 수집 커뮤니티 플랫폼입니다.

본 저장소는 "최애의 포토" 서비스의 사용자 인터페이스(UI/UX), 포토카드 탐색 및 거래 인터랙션을 제공하는 프론트엔드 웹 애플리케이션입니다.

- **팀명**: PhoenIV
- **프로젝트 기간**: 2026.10.23 ~ 2026.11.12 (3주)
- **웹 서비스 (FE)**: [🌐 최애의 포토 바로가기](https://15-bias-photo-phoeniv-fe.vercel.app/)
- **백엔드 API 서버**: [🚀 Render API 서버 바로가기](https://one5-bias-photo-phoeniv-be.onrender.com/) _(무료 플랜 특성상 첫 접속 시 50초 내외 Cold Start 발생 가능)_
- **백엔드 저장소**: [📦 백엔드 저장소 바로가기](https://github.com/PhoenIV/15-bias-photo-phoeniv-be)
- **팀 협업 문서**: [📄 Notion 작업 문서 바로가기](https://app.notion.com/p/b0c8c54986818390ad5d018ef529bd16?v=9998c5498681829b87858877c6f5c7b8)

> ⚠️ **저작권 안내**: 본 프로젝트는 비상업적 학습 및 포트폴리오 용도로 제작되었으며, 서비스 내에 활용된 이미지 및 콘텐츠의 모든 권리는 원저작권자에게 있습니다.

### ✨ 핵심 기능 (Key Features)

- 🃏 **포토카드 생성 및 수집**: 나만의 한정판 디지털 포토카드를 직접 발급하고 등급별로 수집
- 🛒 **마켓플레이스 거래**: 포인트로 다른 유저의 포토카드를 실시간 구매하거나 내 카드 판매 등록
- 🔄 **1:1 맞교환 제안**: 원하는 카드 조건을 탐색하고 내 카드를 제시하여 안전하게 맞교환
- 🎁 **랜덤 포인트 뽑기**: 1시간 쿨다운 타이머 기반의 무료 포인트 충전 시스템
- 🔔 **실시간 알림 (SSE)**: 판매 체결, 구매 완료, 교환 제안 상태를 Server-Sent Events로 실시간 수신

## 👥 팀원 구성

임의균(팀장) [개인 Github 링크](https://github.com/Limug-g)

김수지 [개인 Github 링크](https://github.com/cloud2-k)

박수환 [개인 Github 링크](https://github.com/Suhwan-P)

이승현 [개인 Github 링크](https://github.com/MonsteraforCoding)

## 🛠️ 기술 스택

| 구분                 | 사용 기술 및 도구                                                 | 선정 및 활용 이유                                                                |
| :------------------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| **Framework**        | Next.js 16.4 (App Router), React 19.3                             | 최신 App Router 아키텍처 및 React Compiler를 통한 자동 렌더링 최적화             |
| **State Management** | TanStack Query v5 (`@tanstack/react-query`)                       | 서버 상태(Server State) 캐싱, 자동 동기화, 백그라운드 리페치 및 쿼리 무효화 관리 |
| **Styling**          | Vanilla Extract (`@vanilla-extract/css`, `recipes`)               | 빌드 타임에 CSS 파일로 추출되는 제로 런타임 CSS-in-JS, 타입 세이프 테마 시스템   |
| **UI Primitive**     | Radix UI (`Dialog`, `DropdownMenu`, `Popover`)                    | WAI-ARIA 접근성 가이드라인을 준수하는 Headless UI 컴포넌트 활용                  |
| **Form Management**  | React Hook Form                                                   | 비제어 컴포넌트 기반의 가벼운 폼 상태 관리 및 직관적인 입력 유효성 검증          |
| **Media Storage**    | Cloudinary (`cloudinaryLoader`)                                   | Next.js Image 커스텀 로더 기반 반응형 WebP/AVIF 자동 변환 및 이미지 최적화 서빙  |
| **Code Quality**     | ESLint 9, Prettier, Perfectionist, Husky, lint-staged, Commitlint | 일관된 코드 포맷팅 및 컨벤셔널 커밋 규칙 자동화                                  |
| **Tool & Infra**     | GitHub, Discord, Notion, Swagger, Vercel                          | 팀 협업, 실시간 커뮤니케이션, API 명세 합의 및 Vercel 기반 프론트엔드 CI/CD 배포 |

## 💻 팀원별 구현 기능 상세

### 임의균(팀장)

#### 로그인 페이지 구현

- **이메일/비밀번호 로그인**
  - validators.js로 FE에서 먼저 입력값을 검증하고 불필요한 서버 요청 최소화
  - 다시 입력하면 해당 칸의 에러 문구가 바로 사라지도록 처리
  - 요청 중 버튼은 비활성화, 로딩 시 스피너 추가
- **로그인 상태 관리**
  - 로그인에 성공하면 TanStack Query의 `setQueryData`로 유저 정보를 캐시에 바로 저장해, 다시 조회하지 않아도 헤더가 로그인 상태로 바뀌게 구현
  - 로그인 후 `/marketplace`로 이동
- **에러 처리**
  - 서버 에러 코드(`VALIDATION_FAILED`, `INVALID_CREDENTIALS`)에 따라 입력칸 에러와 알림 모달(`AlertModal`)을 구분해 표시
  - 네트워크 오류는 별도 문구로 안내
- **Google 소셜 로그인**
  - 구글 로그인 버튼과 BE의 `/auth/google/login` 와 연결, 구글 OAuth 페이지로 이동
  - 실패하면 `/login?error=코드`로 돌아오며, `useSearchParams`로 에러 코드를 읽어 상황별 안내 문구를 모달로 표시하고 `Suspense`로 감쌈
- **스타일**
  - vanilla-extract를 사용, 모바일 우선 반응형 CSS 적용
  - 공통 `Button` 스타일보다 우선 적용되도록 `selectors`의 `"&&"`로 우선순위를 높여 Google 버튼 배경색을 고정하고, 클릭 시 살짝 눌리는 효과 구현

#### 회원가입 페이지 구현

- **입력값 검증**
  - validators.js로 FE에서 먼저 입력값을 검증하고 불필요한 서버 요청 최소화
  - 재입력 시 비밀번호, 비밀번호 확인 칸의 에러를 함께 지우는 `handleChange` 헬퍼 구현
- **서버 에러 처리**
  - 이메일·닉네임 중복(`EMAIL_DUPLICATE`, `NICKNAME_DUPLICATE`)과 검증 실패(`VALIDATION_FAILED`)는 서버가 내려 준 `fieldErrors`를 해당 입력칸 아래에 표시
- **가입 후 처리**
  - 가입 성공 시 유저 정보를 쿼리 캐시에 저장, `/marketplace`로 이동
- **Google로 시작하기**
  - 로그인 페이지와 동일함
- **스타일**
  - 화면 높이가 작을 때 스크롤은 유지하면서 스크롤바만 숨기도록 `globalStyle`(`html:has(...)`)로 이 페이지에만 적용

#### 랜덤 포인트 뽑기 팝업 모달 구현

- **전역 모달**
  - `GlobalLayout`에 모달을 배치해 페이지 전역에서 뽑기 모달 자동 표시
- **뽑기 가능 여부 조회** (`usePointDrawStatus`)
  - `refetchInterval`로 1분마다 서버 상태를 다시 확인해 쿨타임(1시간)이 끝나면 모달이 열리도록 구현
- **박스 선택과 뽑기** (`useMutation`)
  - 박스 3개 중 하나를 고르면 나머지는 흑백 처리하고, 선택해야만 "선택완료" 버튼이 활성화됨
  - 성공하면 뽑기 상태 캐시를 즉시 쿨다운 상태로 갱신한 뒤 유저 정보(보유 포인트)와 뽑기 상태를 다시 조회
- **에러 처리**
  - 다른 탭이나 기기에서 이미 뽑은 경우(`BOX_COOLDOWN`), 로그인이 끊긴 경우(401), 서버·네트워크 오류를 구분해 알림 모달로 안내
- **결과 모달과 남은 시간 표시**
  - 획득 포인트와 다음 기회까지 남은 시간 표시

#### 비공개 페이지 접근 제어 (Private Layout)

- `(private)` 라우트 그룹의 `layout.js`에서 마이갤러리, 판매 포토카드, 판매 등록 페이지 진입 시 로그인 여부를 확인하는 화면 가드 구현
- `useMe` 훅에 `refetchOnMount: "always"` 옵션을 넘겨, 캐시가 남아 있어도 비공개 페이지에 진입할 때마다 `/users/me`로 최신 로그인 상태를 다시 조회
- 비로그인 유저는 `router.replace`로 로그인 페이지로 이동시켜, 뒤로가기로도 비공개 페이지에 다시 접근하지 못하게 처리

### 김수지

#### 초기 환경 세팅 및 프로젝트 아키텍처 구축

- Next.js 16 (App Router), React 19 기반의 FSD(Feature-Sliced Design) 폴더 아키텍처 설계
- ESLint, Prettier, Husky(Git Hook), CodeRabbit(AI 코드 리뷰)을 도입하여 팀 코드 컨벤션 및 품질 자동화 파이프라인 구축
- 원활한 팀 협업을 위한 GitHub Issue 및 PR(Pull Request) 템플릿 작성
- Vanilla Extract를 활용한 전역 테마, 폰트 및 공통 스타일 토큰 시스템 구축
- 공통 API 통신을 위한 `apiFetch` 래퍼 함수 구현 및 TanStack Query 전역 Provider 인프라 세팅
- 이미지 최적화 서빙을 위한 Cloudinary 커스텀 로더(`cloudinaryLoader`) 환경 설정

#### 공통 UI 컴포넌트 및 디자인 시스템

![공통 UI 컴포넌트 디자인 가이드](https://github.com/user-attachments/assets/eb7c7039-4764-4761-84bb-1f5a0e33738d)

- 서비스 전역에서 재사용되는 버튼, 인풋, 토스트 등 원자(Atomic) UI 컴포넌트 구축
- Radix UI(Dialog) 기반으로 WAI-ARIA 접근성(a11y)과 키보드 인터랙션을 준수한 공통 Modal 및 핵심 포토카드(`PhotoCard`) 구현
- 팀원들의 컴포넌트 재사용성과 일관된 UI 개발을 위한 공통 디자인 가이드 페이지(`/guide`) 구현
- 앱 내부 브라우징 경로를 추적하여 안전한 뒤로가기를 보장하는 헤더 히스토리 폴백 훅(`useInAppHistory`) 구현

#### 마이갤러리

![마이갤러리](https://github.com/user-attachments/assets/b8662637-bb4e-47d6-bf5c-a25444c8cd31)

- TanStack Query를 활용하여 보유 포토카드 목록 조회, 캐싱 및 무한 스크롤 구현
- 등급, 장르, 검색어를 조합한 다중 조건 필터링 및 상단 등급별 통계 실시간 집계
- 보유 카드별 총 수량과 판매/교환 진행 중인 수량을 직관적으로 분리 표시

#### 나의 판매 포토카드

![나의 판매 포토카드](https://github.com/user-attachments/assets/a474958b-3328-4944-8fea-420b01484e0e)

- 내가 등록한 판매 카드 및 교환 제안 목록 조회, 진행 상태(판매 중 / 판매 완료) 뱃지 시각화
- 판매 카드 아이템 클릭 시 해당 판매 상세 페이지로 바로 이동하는 내비게이션 연동
- 상단 등급별 통계 데이터 연동을 통한 판매/교환 현황 관리

#### 포토카드 생성하기

- React Hook Form을 도입하여 비제어 기반의 폼 상태 관리 및 불필요한 리렌더링 방지
- Cloudinary 이미지 업로드 연동 및 카드 생성 필수 정보(이름, 등급, 장르, 총 발행량, 설명) 유효성 실시간 검증
- 신규 카드 발급 완료 시 TanStack Query 캐시 무효화(`invalidateQueries`)를 통한 마이갤러리 목록 즉각 동기화

#### 메인 랜딩 페이지

![메인 랜딩 페이지 인터랙션 포토카드](https://github.com/user-attachments/assets/6a5f1705-844a-4984-be2a-24712021791a)

- 디바이스별 반응형 레이아웃 및 마우스 움직임에 반응하는 3D 틸트/홀로그램 인터랙션 포토카드(`HoloPhotoCard`) 구현
- 로그인 유저의 불필요한 랜딩 노출을 방지하기 위한 마켓플레이스 자동 리다이렉트 라우트 가드 처리

#### 알림 및 프로필 메뉴

- SSE(Server-Sent Events)를 연동하여 실시간 알림 수신 및 TanStack Query 캐시 자동 동기화
- Radix UI(Popover)를 활용하여 키보드 접근성을 지원하는 헤더 알림 패널 및 프로필 드롭다운 메뉴 구현
- 알림 메시지 클릭 시 해당 판매 상세 페이지로 연결되는 딥링크 처리 및 프로필 포인트 정보 실시간 조회(`useMe`)

#### 사용자 경험(UX) 최적화 (스켈레톤 UI)

- 데이터 페칭 중 레이아웃 시프트(CLS)를 방지하고 체감 대기 시간을 줄이는 포토카드 스켈레톤 UI(`PhotoCardSkeleton`) 구현
- 마이갤러리, 나의 판매 포토카드, 마켓플레이스 등 카드 목록 전반에 스켈레톤 적용 및 스크린 리더 안내 추가

### 박수환

#### 포토카드 교환하기 모달

![포토카드 교환하기 모달](https://github.com/user-attachments/assets/94ee5bc4-7df7-432f-9a39-05d195ba0799)

- 구매자가 자신의 포토카드로 교환을 제안하는 2단계 모달(교환할 카드 선택 → 교환 제시 입력) 구현
- 판매자의 교환 희망 조건(등급·장르)에 맞는 카드만 조회되도록 필터를 고정하고, 무한 스크롤 기반 보유 카드 목록 제공
- TanStack Query를 활용한 교환 제시 및 성공 시 관련 데이터 캐시 무효화로 내 카드·교환 목록 실시간 동기화

#### 판매하기 · 판매글 수정하기 모달

![판매하기·수정하기 모달](https://github.com/user-attachments/assets/aa8186b5-7cb8-4f1b-97a6-03383ccc7954)

- 총 판매 수량·장당 가격·교환 희망 정보를 입력하는 판매 등록 모달 및 기존 값이 채워진 판매글 수정 모달 구현
- 마켓플레이스의 판매할 카드 선택 모달과 연동하여 카드 선택 → 판매 등록으로 이어지는 전체 판매 흐름 완성
- 성공 시 토스트 안내와 캐시 동기화, 실패 시 입력값을 유지하는 상태 처리

### 이승현

#### 마켓플레이스 페이지

![마켓플레이스](https://github.com/user-attachments/assets/92971eb1-4ee3-4ce7-b3f6-638e75e8bcbf)

- TanStack Query를 활용한 판매 포토카드 목록 조회 및 캐싱
- 검색, 중첩 적용 가능한 3종 필터, 정렬 기능 도입
- 포토카드 판매 화면으로 이동시 인증 상태에 따른 응답 분기

#### 판매글 상세 페이지

![판매글 상세](https://github.com/user-attachments/assets/b909b46a-6bce-4076-9215-d2ed2289b4b1)

- 판매글 작성 여부에 따른 화면 분기 (판매자 - 판매글 수정, 내리기, 교환 승인 또는 거절 / 구매자 - 포토카드 구매, 교환 신청)
- api 호출이 즉시 발생하는 버튼의 경우 알럿 모달을 띄워 유저 의사 재확인
- 구매 또는 교환 관련 api 호출 후 데이터 동기화

#### 판매 카드 선택 모달

![나의 포토카드 판매하기](https://github.com/user-attachments/assets/23be6392-5989-47db-8e4e-ce18209004da)

- 검색 및 중첩 2종 필터 기능이 적용된 보유 포토카드 목록 조회
- 대기 및 오류 상태에 따른 화면 분기

#### 모바일 필터 공용 컴포넌트

![모바일 필터](https://github.com/user-attachments/assets/c624c7c6-3f64-4785-b488-d78b58210c14)

- 중첩 적용 가능한 등급, 장르, 품절 여부에 따른 필터링 구현
- 키보드 접근성 준수

## 📂 프로젝트 구조

```
📦src
 ┣ 📂app                                 # Next.js App Router (라우팅 및 레이아웃)
 ┃ ┣ 📂(auth)                            # 비인증/인증 전용 라우트 (login, signup)
 ┃ ┣ 📂(main)                            # 서비스 메인 라우트
 ┃ ┃ ┣ 📂(private)                       # 로그인 회원 전용 라우트 (my-gallery, my-listings, sales)
 ┃ ┃ ┗ 📂marketplace                     # 마켓플레이스 탐색 라우트
 ┃ ┗ 📂guide                             # 공통 컴포넌트 디자인 가이드 페이지
 ┣ 📂components                          # 전역 공통 UI 컴포넌트
 ┃ ┣ 📂common                            # 비즈니스 공통 컴포넌트 (PhotoCard, MobileFilterModal 등)
 ┃ ┣ 📂Header                            # 글로벌 반응형 헤더 및 네비게이션
 ┃ ┣ 📂guards                            # 라우트 접근 제어 가드 (GuestGuard)
 ┃ ┣ 📂layouts                           # 전역 레이아웃 래퍼 (GlobalLayout)
 ┃ ┗ 📂ui                                # 기본 UI 원자 컴포넌트 (Button, Modal, Input, Toast 등)
 ┣ 📂constants                           # 전역 상수 (라우트, 카드 등급 및 장르 등)
 ┣ 📂features                            # 도메인/기능별 독립 모듈 (FSD 패턴)
 ┃ ┣ 📂auth                              # 로그인 / 회원가입 기능 모듈
 ┃ ┣ 📂exchange                          # 교환 제안 모달 기능 모듈
 ┃ ┣ 📂gallery                           # 마이갤러리, 판매 포토카드, 신규 생성 기능 모듈
 ┃ ┣ 📂landing                           # 랜딩 페이지 및 3D 홀로그램 인터랙션 모듈
 ┃ ┣ 📂marketplace                       # 마켓플레이스 및 판매 상세 기능 모듈
 ┃ ┣ 📂point-draw                        # 포인트 랜덤 뽑기 기능 모듈
 ┃ ┗ 📂sale                              # 판매 등록 / 수정 모달 기능 모듈
 ┣ 📂hooks                               # 전역 및 도메인 커스텀 React 훅
 ┣ 📂lib                                 # 공통 모듈 및 유틸 라이브러리 (apiFetch 등)
 ┣ 📂providers                           # 전역 Context & QueryClient Provider
 ┣ 📂services                            # REST API 통신 및 TanStack Query 키 팩토리
 ┣ 📂styles                              # Vanilla Extract 전역 스타일 및 테마 토큰
 ┗ 📂utils                               # 공통 헬퍼 함수 (Cloudinary 로더, 유효성 검증 등)
```

### 💡 폴더 구조 설계 원칙 & 패턴

- **FSD(Feature-Sliced Design) 기반 기능 모듈화 (`features/`)**:
  - 도메인별(인증, 교환, 갤러리, 마켓 등)로 관련된 UI 컴포넌트와 비즈니스 로직을 `features/` 아래에 독립적으로 응집시켜, 서비스 규모가 확장되어도 파일 탐색이 용이하고 협업 간 코드 충돌을 최소화했습니다.
- **배럴 패턴(Barrel Pattern) 적용 (`index.js`)**:
  - 각 컴포넌트 및 기능 디렉터리마다 `index.js`를 두어 외부에서는 폴더 경로만으로 깔끔하게 `import`할 수 있도록 진입점을 캡슐화했습니다. 내부 파일 구조가 변경되더라도 외부 참조 경로가 깨지지 않도록 결합도를 낮췄습니다.
- **관심사의 명확한 분리 (Separation of Concerns)**:
  - `app/`: Next.js App Router 규칙에 따른 순수 라우팅 및 중첩 레이아웃만 담당합니다.
  - `components/ui/` vs `features/`: 비즈니스 로직이 없는 순수 디자인 시스템 원자 컴포넌트와 도메인 의존성이 있는 비즈니스 컴포넌트를 엄격히 분리했습니다.
  - `services/` & `hooks/`: 순수 API fetch 함수(`services/`)와 React 상태/캐싱을 다루는 커스텀 훅(`hooks/`)을 분리하여 선언적인 데이터 패칭 아키텍처를 구축했습니다.

## 🚀 시작하기 (Quick Start)

### 1. 환경 변수 설정

`.env.example` 파일을 복사하여 로컬 환경 변수 파일(`.env.local`)을 생성하고 백엔드 API 주소 및 Cloudinary Cloud Name을 설정합니다.

```bash
cp .env.example .env.local
```

### 2. 패키지 설치 및 실행

```bash
# 의존성 패키지 설치 (pnpm 권장)
pnpm install

# 로컬 개발 서버 실행 (기본 포트: 3000)
pnpm dev
```

## 📝 프로젝트 회고록

(추후 첨부 예정)
