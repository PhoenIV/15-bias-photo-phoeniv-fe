import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals, // Next.js 권장 설정 (core-web-vitals)
  prettier, // Prettier와 충돌하는 규칙 비활성화
  {
    plugins: {
      perfectionist,
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      // 1. JSX Props 정렬 규칙
      "perfectionist/sort-jsx-props": [
        "warn",
        {
          type: "natural",
          order: "asc",
          customGroups: [
            { groupName: "identifier", elementNamePattern: "^(id|key|name|ref)$" },
            { groupName: "styling", elementNamePattern: "^(className|style)$" },
            { groupName: "callback", elementNamePattern: "^on[A-Z].*" },
          ],
          groups: ["identifier", "unknown", "styling", "callback"],
        },
      ],

      // 2. Import 정렬 규칙 (Next.js 및 경로 별칭 기반)
      "perfectionist/sort-imports": [
        "warn",
        {
          type: "natural",
          order: "asc",
          customGroups: [
            {
              groupName: "next-and-react",
              elementNamePattern: ["^(react|react-dom)(/.*)?$", "^next(/.*)?$"],
            },
            {
              // 별칭(@)을 사용하는 내부 로직
              groupName: "internal-logic",
              elementNamePattern: ["^@/(hooks|utils|store|api|lib|constants)/.*"],
            },
            {
              // 별칭(@)을 사용하는 내부 컴포넌트
              groupName: "internal-component",
              elementNamePattern: ["^@/(components|app|layouts)/.*"],
            },
            {
              // 바닐라 익스트랙트 스타일 파일 (.css.js)
              groupName: "style",
              elementNamePattern: ["\\.css\\.js$"],
            },
            {
              // 정적 이미지/에셋 파일
              groupName: "assets",
              elementNamePattern: ["\\.(svg|png|jpg|jpeg|gif|webp)$"],
            },
          ],
          groups: [
            "next-and-react", // 1. React & Next.js 관련
            "builtin", // 2. Node 기본 모듈 (fs, path 등)
            "external", // 3. 외부 라이브러리 (clsx 등)
            "internal-logic", // 4. 프로젝트 내부 로직
            "internal-component", // 5. 프로젝트 내부 UI 컴포넌트
            ["internal", "parent", "sibling", "index"], // 6. 상대 경로
            "style", // 7. 바닐라 익스트랙트 스타일
            "assets", // 8. 이미지 등 에셋
            "side-effect-style",
          ],
          newlinesBetween: 1,
        },
      ],
      // 3. Named Import 내부 이름 정렬
      "perfectionist/sort-named-imports": [
        "warn",
        {
          type: "natural",
          order: "asc",
        },
      ],
    },
  },
  // eslint-config-next의 기본 무시 폴더 설정
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
