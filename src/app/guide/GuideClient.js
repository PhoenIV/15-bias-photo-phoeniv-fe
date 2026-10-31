"use client";

import { useEffect, useRef, useState } from "react";

import clsx from "clsx";

import { gradeTextRecipe } from "@/styles/grade.css.js";
import { vars } from "@/styles/theme.css.js";

import { ExchangePhotoCard, PhotoCard } from "@/components/common/PhotoCard";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Dropdown } from "@/components/ui/Dropdown";
import { FileInput } from "@/components/ui/FileInput";
import { Input } from "@/components/ui/Input";
import { AlertModal, Modal } from "@/components/ui/Modal";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { SearchInput } from "@/components/ui/SearchInput";
import { Textarea } from "@/components/ui/Textarea";

import * as styles from "./page.css.js";

/* =========================================================
  데이터 / 코드 예시 상수
  ========================================================= */

const TABS = [
  { id: "colors", label: "🎨 Colors" },
  { id: "chip", label: "🏷️ Chip & Grade" },
  { id: "button", label: "🔘 Button" },
  { id: "photoCard", label: "🖼️ PhotoCard" },
  { id: "form", label: "⌨️ Input & Select" },
  { id: "modal", label: "🪟 Modal" },
];

// hex 값은 vanilla-extract 변수(var(--...))라 읽을 수 없습니다.
// theme.css.js의 컬러를 바꾸면 여기 hex 값도 같이 수정이 필요합니다.
const COLOR_LIST = [
  { hex: "#EFFF04", name: "main" },
  { hex: "#29C9F9", name: "blue" },
  { hex: "#A77EFF", name: "purple" },
  { hex: "#FF2A6A", name: "pink" },
  { hex: "#FF483D", name: "red" },
  { hex: "#FFFFFF", name: "white" },
  { hex: "#EEEEEE", name: "gray100" },
  { hex: "#DDDDDD", name: "gray200" },
  { hex: "#A4A4A4", name: "gray300" },
  { hex: "#5A5A5A", name: "gray400" },
  { hex: "#161616", name: "gray500" },
  { hex: "#0F0F0F", name: "black" },
];

// 클릭하면 복사되는 코드 예시
// 컴포넌트 API가 바뀌면 아래 미리보기 JSX와 이 SNIPPETS를 수정해야 합니다.
const SNIPPETS = {
  colors: `import { vars } from "@/styles/theme.css.js";

color: vars.colors.main`,

  grade: `import { gradeTextRecipe } from "@/styles/grade.css.js";

<span className={gradeTextRecipe({ grade: "RARE" })}>RARE</span>`,

  chipOutlined: `<Chip variant="outlined" size="md" color="blue">
  <span>RARE</span>
  <span>8장</span>
</Chip>`,

  chipGhost: `<Chip variant="ghost" size="md" color="main">
  교환 제시 대기 중
</Chip>`,

  chipResponsive: `// 화면 크기에 따라 자동 전환 (모바일 → 태블릿 → PC)
<Chip variant="outlined" size="responsive" color="blue">
  <span>RARE</span>
  <span>8장</span>
</Chip>`,

  buttonVariant: `<Button variant="primary">포토카드 구매하기</Button>
<Button variant="secondary">판매 내리기</Button>
<Button disabled>비활성화</Button>`,

  buttonThickness: `<Button thickness="thick">Thick 버튼</Button>
<Button thickness="thin">Thin 버튼</Button>`,

  buttonSize: `<Button size="lg" thickness="thick">lg</Button>
<Button size="md" thickness="thick">md</Button>
<Button size="sm" thickness="thin">sm</Button>
<Button size="xs" thickness="thin">xs (thin 전용)</Button>`,

  buttonResponsive: `// 화면 크기에 따라 자동 전환 (모바일 → 태블릿 → PC)
<Button size="responsive" thickness="thin" variant="secondary">
  거절하기
</Button>`,

  photoCard: `<PhotoCard
  imageId="cld-sample-5"
  title="포토카드"
  grade="SUPER_RARE"
  category="MD"
  nickname="구름짱"
  price={4}
  remainCount={2}
  totalCount={5}
  status="selling" // "selling" | "exchangePending"
/>`,

  soldOut: `<PhotoCard
  imageId="main-sample"
  title="How Far I’ll Go"
  grade="LEGENDARY"
  category="MD"
  nickname="cloud"
  price={4}
  remainCount={0}
  isSoldOut
/>`,

  exchangeReceived: `<ExchangePhotoCard
  imageId=""samples/dessert-on-a-plate""
  title="스페인 여행"
  grade="COMMON"
  category="MD"
  nickname="구름짱"
  price={4}
  message="교환하고 싶습니다!"
  requestType="received"
  onApprove={handleApprove}
  onReject={handleReject}
/>`,

  exchangeSent: `<ExchangePhotoCard
  imageId="samples/breakfast"
  title="스페인 여행"
  grade="COMMON"
  category="MD"
  nickname="유디"
  price={4}
  message="교환하고 싶습니다!"
  requestType="sent"
  onCancel={handleCancel}
/>`,

  input: `<Input label="이메일" placeholder="이메일을 입력해 주세요" />

// 에러 상태
<Input label="이메일" error="이메일 형식이 아닙니다." />

// 비활성화
<Input label="이메일" disabled />`,

  password: `<PasswordInput label="비밀번호" placeholder="비밀번호를 입력해 주세요" />`,

  search: `<SearchInput placeholder="검색" onSearch={handleSearch} />`,

  textarea: `<Textarea label="카드 설명" placeholder="카드 설명을 입력해 주세요" />`,

  dropdown: `<Dropdown
  label="등급"
  placeholder="등급을 선택해 주세요"
  options={[
    { label: "COMMON", value: "COMMON" },
    { label: "SUPER RARE", value: "SUPER_RARE" },
  ]}
  onChange={handleChange}
/>`,

  fileInput: `<FileInput
  label="사진 업로드"
  placeholder="사진 업로드"
  onChange={handleFileChange}
/>`,

  alertModal: `<AlertModal
  isOpen={isAlertOpen}
  title="로그인이 필요합니다."
  description={"로그인 하시겠습니까?\\n다양한 서비스를 편리하게 이용하실 수 있습니다."}
  onClose={() => setIsAlertOpen(false)}
  onConfirm={() => setIsAlertOpen(false)}
/>`,

  customModal: `// 랜덤 포인트 모달 등 커스텀 화면을 만들 때 사용하세요.
<Modal isOpen={isCustomOpen} variant="default" onClose={() => setIsCustomOpen(false)}>
  <h2>커스텀 모달 타이틀</h2>
  <p>랜덤 포인트 모달 등으로 사용하세요</p>
</Modal>`,
};

// 드롭다운 옵션(등급)
const GRADE_OPTIONS = [
  { label: "COMMON", value: "COMMON" },
  { label: "RARE", value: "RARE" },
  { label: "SUPER RARE", value: "SUPER_RARE" },
  { label: "LEGENDARY", value: "LEGENDARY" },
];

/* =========================================================
  가이드 페이지 전용 헬퍼 컴포넌트
  ========================================================= */

/**
 * 클릭하면 코드가 클립보드에 복사되는 코드 박스
 *
 * @param {Object} props
 * @param {string} props.code - 보여주고 복사할 코드 문자열
 */
function CodeSnippet({ code }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  // 화면에서 사라질 때 남아있는 타이머 정리
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // https가 아니거나 권한이 없으면 실패 (localhost는 정상 동작)
    }
  };

  return (
    <button type="button" className={styles.snippetButton} onClick={handleCopy}>
      <code className={styles.snippetCode}>{code}</code>
      <span className={clsx(styles.copyBadge, copied && styles.copyBadgeDone)}>
        {copied ? "복사됨 ✓" : "클릭해서 복사"}
      </span>
    </button>
  );
}

/**
 * 제목 + 미리보기 + 복사 가능한 코드를 한 세트로 묶는 예시 블록
 *
 * @param {Object} props
 * @param {string} props.title - 예시 제목
 * @param {string} [props.code] - 복사할 코드 (없으면 코드 박스를 숨김)
 * @param {React.ReactNode} props.children - 미리보기 영역에 렌더링할 내용
 */
function Example({ title, code, children }) {
  return (
    <div className={styles.example}>
      <h3 className={styles.subTitle}>{title}</h3>
      <div className={styles.exampleBox}>{children}</div>
      {code && <CodeSnippet code={code} />}
    </div>
  );
}

/**
 * 탭 하나의 큰 틀 (제목 + 설명 + 미리보기 박스)
 *
 * @param {Object} props
 * @param {string} props.title - 섹션 제목
 * @param {string} [props.description] - 섹션 설명
 * @param {React.ReactNode} props.children - 섹션 안에 렌더링할 내용
 */
function GuideSection({ description, title, children }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {description && <p className={styles.sectionDesc}>{description}</p>}
      <div className={styles.previewBox}>{children}</div>
    </section>
  );
}

/* =========================================================
  페이지
  ========================================================= */

export default function GuideClient() {
  const [activeTab, setActiveTab] = useState("colors");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>최애의 포토 디자인 시스템 쇼룸</h1>
        <p className={styles.subtitle}>
          theme.css.js의 디자인 토큰과 공통 UI 컴포넌트 사용법을 탭별로 확인하세요.
        </p>
      </header>

      <div role="tablist" className={styles.tabList}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            aria-selected={activeTab === tab.id}
            role="tab"
            type="button"
            className={clsx(styles.tabButton, activeTab === tab.id && styles.activeTabButton)}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. Colors 탭 */}
      {activeTab === "colors" && (
        <GuideSection
          description="theme.css.js에 정의된 프로젝트 공식 컬러 팔레트입니다."
          title="Colors (컬러 팔레트)"
        >
          <Example code={SNIPPETS.colors} title="컬러 토큰">
            <div className={styles.colorGrid}>
              {COLOR_LIST.map((item) => (
                <div key={item.name} className={styles.colorCard}>
                  <div
                    className={styles.colorSwatch}
                    style={{ backgroundColor: vars.colors[item.name] }}
                  />
                  <div className={styles.colorInfo}>
                    <span className={styles.colorName}>{item.name}</span>
                    <span className={styles.colorToken}>{item.hex}</span>
                    <span className={styles.colorToken}>{`vars.colors.${item.name}`}</span>
                  </div>
                </div>
              ))}
            </div>
          </Example>
        </GuideSection>
      )}

      {/* 2. Chip & Grade 탭 */}
      {activeTab === "chip" && (
        <GuideSection
          description="포토카드 등급 텍스트(recipe)와 상태/수량을 나타내는 Chip 컴포넌트입니다."
          title="Chip & Grade (등급 및 칩)"
        >
          <div className={styles.exampleList}>
            <Example code={SNIPPETS.grade} title="1. Grade Text (등급별 글자색 Recipe)">
              <div className={styles.flexRow}>
                <span className={gradeTextRecipe({ grade: "COMMON" })}>COMMON</span>
                <span className={gradeTextRecipe({ grade: "RARE" })}>RARE</span>
                <span className={gradeTextRecipe({ grade: "SUPER_RARE" })}>SUPER RARE</span>
                <span className={gradeTextRecipe({ grade: "LEGENDARY" })}>LEGENDARY</span>
              </div>
            </Example>

            <Example
              code={SNIPPETS.chipOutlined}
              title="2. Chip - Outlined (고정 크기: lg / md / sm)"
            >
              <div className={styles.flexColumn}>
                <div className={styles.flexRow}>
                  <Chip color="main" size="lg" variant="outlined">
                    <span>COMMON</span>
                    <span>20장</span>
                  </Chip>
                  <span className={styles.sizeLabel}>← lg</span>
                </div>
                <div className={styles.flexRow}>
                  <Chip color="blue" size="md" variant="outlined">
                    <span>RARE</span>
                    <span>8장</span>
                  </Chip>
                  <span className={styles.sizeLabel}>← md</span>
                </div>
                <div className={styles.flexRow}>
                  <Chip color="purple" size="sm" variant="outlined">
                    <span>SUPER RARE</span>
                    <span>3장</span>
                  </Chip>
                  <span className={styles.sizeLabel}>← sm</span>
                </div>
                <div className={styles.flexRow}>
                  <Chip color="pink" size="md" variant="outlined">
                    <span>LEGENDARY</span>
                    <span>5장</span>
                  </Chip>
                </div>
              </div>
            </Example>

            <Example
              code={SNIPPETS.chipGhost}
              title="3. Chip - Ghost (테두리 X) (고정 크기: lg / md / sm)"
            >
              <div className={styles.flexRowEnd}>
                <Chip color="main" size="lg" variant="ghost">
                  판매 중 (lg)
                </Chip>
                <Chip color="main" size="md" variant="ghost">
                  교환 제시 대기 중 (md)
                </Chip>
                <Chip color="main" size="sm" variant="ghost">
                  판매 중 (sm)
                </Chip>
              </div>
            </Example>

            <Example
              code={SNIPPETS.chipResponsive}
              title="4. Chip - Responsive (화면 크기에 따라 자동 전환)"
            >
              <div className={styles.flexRow}>
                <Chip color="main" size="responsive" variant="outlined">
                  <span>COMMON</span>
                  <span>20장</span>
                </Chip>
                <Chip color="purple" size="responsive" variant="outlined">
                  <span>SUPER RARE</span>
                  <span>3장</span>
                </Chip>
                <Chip color="main" size="responsive" variant="ghost">
                  판매 중
                </Chip>
              </div>
            </Example>
          </div>
        </GuideSection>
      )}

      {/* 3. Button 탭 */}
      {activeTab === "button" && (
        <GuideSection
          description="두께(thick, thin)와 사이즈를 조합하여 사용합니다. size=responsive는 화면 크기에 따라 자동으로 바뀌고, thick은 xs 사이즈를 지원하지 않습니다."
          title="Button (공통 버튼)"
        >
          <div className={styles.exampleList}>
            <Example
              code={SNIPPETS.buttonVariant}
              title="1. Variant & Disabled (기본값: thick, md)"
            >
              <div className={styles.flexRow}>
                <Button variant="primary">포토카드 구매하기 (Primary)</Button>
                <Button variant="secondary">판매 내리기 (Secondary)</Button>
                <Button disabled variant="primary">
                  비활성화 (Disabled)
                </Button>
              </div>
            </Example>

            <Example code={SNIPPETS.buttonThickness} title="2. Thickness (Thick vs Thin)">
              <div className={styles.flexRow}>
                <Button thickness="thick" variant="primary">
                  Thick 버튼
                </Button>
                <Button thickness="thin" variant="primary">
                  Thin 버튼
                </Button>
                <Button thickness="thin" variant="secondary">
                  Thin Secondary
                </Button>
                <Button disabled thickness="thin" variant="primary">
                  Thin Disabled
                </Button>
              </div>
            </Example>

            <Example code={SNIPPETS.buttonSize} title="3. Size (lg, md, sm, xs)">
              <div className={styles.flexColumn}>
                <div className={styles.flexRow}>
                  <Button size="xs" thickness="thin">
                    승인 (xs)
                  </Button>
                  <Button size="xs" thickness="thin" variant="secondary">
                    거절 (xs)
                  </Button>
                </div>
                <div className={styles.flexRow}>
                  <Button size="sm" thickness="thick">
                    구매하기 (Thick sm)
                  </Button>
                  <Button size="sm" thickness="thin" variant="secondary">
                    거절하기 (Thin sm)
                  </Button>
                </div>
                <div>
                  <Button size="md" thickness="thick">
                    포토카드 구매하기 (md)
                  </Button>
                </div>
                <div>
                  <Button size="lg" thickness="thick">
                    포토카드 교환하기 (lg)
                  </Button>
                </div>
              </div>
            </Example>

            <Example
              code={SNIPPETS.buttonResponsive}
              title="4. Responsive (화면 크기에 따라 자동 전환)"
            >
              <div className={styles.flexRow}>
                <Button size="responsive" thickness="thin" variant="secondary">
                  거절하기
                </Button>
                <Button size="responsive" thickness="thin" variant="primary">
                  승인하기
                </Button>
              </div>
            </Example>
          </div>
        </GuideSection>
      )}

      {/* 4. PhotoCard 탭 */}
      {activeTab === "photoCard" && (
        <GuideSection
          description="일반 카드(PhotoCard)와 교환 요청 카드(ExchangePhotoCard)로 나뉘어 있어요. 높이가 다른 카드가 섞여 늘어나는 것을 막기 위해 종류별로 그리드를 분리해서 보여줍니다."
          title="PhotoCard (포토카드)"
        >
          <div className={styles.exampleList}>
            {/* 1. 기본 카드 */}
            <Example code={SNIPPETS.photoCard} title="1. 기본 카드 (상태 배지 & 하단 로고)">
              <div className={styles.cardGrid}>
                <PhotoCard
                  category="MD"
                  grade="COMMON"
                  imageId="cld-sample-5"
                  nickname="구름짱"
                  price={4}
                  remainCount={2}
                  status="selling"
                  title="포토카드"
                  totalCount={5}
                />
                <PhotoCard
                  category="MD"
                  grade="SUPER_RARE"
                  imageId="cld-sample-4"
                  nickname="구름짱"
                  price={4}
                  remainCount={1}
                  status="exchangePending"
                  title="포토카드"
                />
                <PhotoCard
                  category="MD"
                  grade="LEGENDARY"
                  imageId="cld-sample-3"
                  nickname="구름짱"
                  price={4}
                  remainCount={1}
                  title="포토카드"
                />
              </div>
            </Example>

            {/* 2. 품절 카드 */}
            <Example code={SNIPPETS.soldOut} title="2. 품절 카드 (Sold Out 오버레이)">
              <div className={styles.cardGrid}>
                <PhotoCard
                  category="MD"
                  grade="LEGENDARY"
                  imageId="main-sample"
                  isSoldOut
                  nickname="cloud"
                  price={4}
                  remainCount={0}
                  title="How Far I’ll Go"
                />
                <PhotoCard
                  category="MD"
                  grade="RARE"
                  imageId="main-sample"
                  isSoldOut
                  nickname="cloud"
                  price={4}
                  remainCount={0}
                  title="How Far I’ll Go"
                />
                <PhotoCard
                  category="MD"
                  grade="COMMON"
                  imageId="main-sample"
                  isSoldOut
                  nickname="cloud"
                  price={4}
                  remainCount={0}
                  title="How Far I’ll Go"
                />
              </div>
            </Example>

            {/* 3-1. 받은 교환 요청 (버튼 2개) */}
            <Example
              code={SNIPPETS.exchangeReceived}
              title="3-1. 받은 교환 요청 (requestType=received, 거절하기 / 승인하기)"
            >
              <div className={styles.cardGrid}>
                <ExchangePhotoCard
                  category="MD"
                  grade="COMMON"
                  imageId="samples/dessert-on-a-plate"
                  message="스페인 여행 사진도 좋은데.. 우리집 앞마당 포토카드와 교환하고 싶습니다!"
                  nickname="구름짱"
                  price={4}
                  requestType="received"
                  title="스페인 여행"
                  onApprove={() => alert("승인하기 클릭됨!")}
                  onReject={() => alert("거절하기 클릭됨!")}
                />
                <ExchangePhotoCard
                  category="MD"
                  grade="SUPER_RARE"
                  imageId="samples/dessert-on-a-plate"
                  message="스페인 여행 사진도 좋은데.. 우리집 앞마당 포토카드와 교환하고 싶습니다! 텍스트가 넘치면 여기서 말줄임 처리가 됩니다."
                  nickname="구름짱"
                  price={4}
                  requestType="received"
                  title="스페인 여행"
                  onApprove={() => alert("승인하기 클릭됨!")}
                  onReject={() => alert("거절하기 클릭됨!")}
                />
                <ExchangePhotoCard
                  category="MD"
                  grade="LEGENDARY"
                  imageId="samples/dessert-on-a-plate"
                  message="스페인 여행 사진도 좋은데.. 우리집 앞마당 포토카드와 교환하고 싶습니다!"
                  nickname="구름짱"
                  price={4}
                  requestType="received"
                  title="스페인 여행"
                  onApprove={() => alert("승인하기 클릭됨!")}
                  onReject={() => alert("거절하기 클릭됨!")}
                />
              </div>
            </Example>

            {/* 3-2. 보낸 교환 요청 (버튼 1개) */}
            <Example
              code={SNIPPETS.exchangeSent}
              title="3-2. 보낸 교환 요청 (requestType=sent, 취소하기)"
            >
              <div className={styles.cardGrid}>
                <ExchangePhotoCard
                  category="MD"
                  grade="COMMON"
                  imageId="samples/breakfast"
                  message="스페인 여행 사진도 좋은데 우리집 텍스트 넘치면 여기서 말줄임 처리됩니다. 두 줄을 넘기는 긴 메시지예요."
                  nickname="유디"
                  price={4}
                  requestType="sent"
                  title="스페인 여행"
                  onCancel={() => alert("취소하기 클릭됨!")}
                />
                <ExchangePhotoCard
                  category="MD"
                  grade="RARE"
                  imageId="samples/breakfast"
                  message="짧은 메시지입니다."
                  nickname="유디"
                  price={4}
                  requestType="sent"
                  title="스페인 여행"
                  onCancel={() => alert("취소하기 클릭됨!")}
                />
                <ExchangePhotoCard
                  category="MD"
                  grade="SUPER_RARE"
                  imageId="samples/breakfast"
                  message="스페인 여행 사진도 좋은데.. 우리집 앞마당 포토카드와 교환하고 싶습니다!"
                  nickname="아주아주긴닉네임테스트"
                  price={4}
                  requestType="sent"
                  title="스페인 여행"
                  onCancel={() => alert("취소하기 클릭됨!")}
                />
              </div>
            </Example>
          </div>
        </GuideSection>
      )}

      {/* 5. Input & Form 탭 */}
      {activeTab === "form" && (
        <GuideSection
          description="일반 텍스트/이메일(Input), 비밀번호(PasswordInput), 검색(SearchInput), 여러 줄 설명(Textarea), 선택(Dropdown), 파일(FileInput) 컴포넌트입니다."
          title="Input & Form (입력 폼 컴포넌트)"
        >
          <div className={styles.formList}>
            <Example code={SNIPPETS.input} title="1. Input (일반 텍스트 & 이메일 & 에러/비활성화)">
              <div className={styles.flexColumn}>
                <Input placeholder="포토카드 이름을 입력해 주세요" />
                <Input
                  defaultValue="euzphoto"
                  error="이메일 형식이 아닙니다."
                  label="이메일 (에러 상태)"
                  placeholder="이메일을 입력해 주세요"
                />
                <Input disabled label="이메일 (비활성화)" placeholder="이메일을 입력해 주세요" />
              </div>
            </Example>

            <Example code={SNIPPETS.password} title="2. PasswordInput (비밀번호 토글)">
              <div className={styles.flexColumn}>
                <PasswordInput label="비밀번호" placeholder="비밀번호를 입력해 주세요" />
                <PasswordInput
                  defaultValue="choco"
                  error="비밀번호가 일치하지 않습니다."
                  label="비밀번호 확인 (에러 상태)"
                />
              </div>
            </Example>

            <Example code={SNIPPETS.search} title="3. SearchInput (검색창)">
              <SearchInput placeholder="검색" onSearch={(val) => alert(`검색어: ${val}`)} />
            </Example>

            <Example code={SNIPPETS.textarea} title="4. Textarea (멀티라인 고정 박스 & 스크롤)">
              <div className={styles.flexColumn}>
                <Textarea label="카드 설명" placeholder="카드 설명을 입력해 주세요" />
                <Textarea defaultValue="푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다. 푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다. 텍스트가 넘칠 때 박스는 고정하고 스크롤로 처리됩니다." />
              </div>
            </Example>

            <Example code={SNIPPETS.dropdown} title="5. Dropdown (드롭다운 선택창)">
              <div className={styles.flexColumn}>
                <Dropdown label="등급" options={GRADE_OPTIONS} placeholder="등급을 선택해 주세요" />
                <Dropdown defaultValue="COMMON" options={GRADE_OPTIONS} />
              </div>
            </Example>

            <Example code={SNIPPETS.fileInput} title="6. FileInput (파일 업로드)">
              <FileInput
                label="사진 업로드"
                placeholder="사진 업로드"
                onChange={(file) => console.log("선택된 파일:", file)}
              />
            </Example>
          </div>
        </GuideSection>
      )}

      {/* 6. Modal 탭 */}
      {activeTab === "modal" && (
        <GuideSection
          description="안내용 AlertModal과, 내부에 원하는 UI를 자유롭게 넣을 수 있는 기본 빈 창(Modal) 컴포넌트입니다."
          title="Modal (공통 모달 레이아웃)"
        >
          <div className={styles.exampleList}>
            <Example code={SNIPPETS.alertModal} title="1. AlertModal (안내용 알럿 모달)">
              <div className={styles.alertTrigger}>
                <Button size="sm" thickness="thin" onClick={() => setIsAlertOpen(true)}>
                  알럿 모달 열기
                </Button>
              </div>
              <AlertModal
                description={"로그인 하시겠습니까?\n다양한 서비스를 편리하게 이용하실 수 있습니다."}
                isOpen={isAlertOpen}
                title="로그인이 필요합니다."
                onClose={() => setIsAlertOpen(false)}
                onConfirm={() => {
                  console.log("확인 클릭됨");
                  setIsAlertOpen(false);
                }}
              />
            </Example>

            <Example code={SNIPPETS.customModal} title="2. Base Modal (커스텀용 빈 모달)">
              <div className={styles.customTrigger}>
                <Button
                  size="sm"
                  thickness="thin"
                  variant="secondary"
                  onClick={() => setIsCustomOpen(true)}
                >
                  커스텀용 빈 모달 열기
                </Button>
              </div>
              <Modal isOpen={isCustomOpen} variant="default" onClose={() => setIsCustomOpen(false)}>
                <div className={styles.customModalBody}>
                  <h3 className={styles.customModalTitle}>비어있는 커스텀 모달 영역</h3>
                  <p>랜덤 포인트 뽑기 등 자유롭게 children을 채워서 사용합니다.</p>
                </div>
              </Modal>
            </Example>
          </div>
        </GuideSection>
      )}
    </div>
  );
}
