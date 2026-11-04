"use client";
import Image from "next/image";

import { Dropdown } from "@/components/ui/Dropdown/index.js";
import { SearchInput } from "@/components/ui/SearchInput";

import * as styles from "./PageQueryRow.css.js";

export default function PageQueryRow({ onSearch, onFilterChange, onSortChange }) {
  // 필터에 사용할 상수들
  const grade = {
    value: "grade",
    options: [
      { label: "COMMON", value: "COMMON" },
      { label: "RARE", value: "RARE" },
      { label: "SUPER RARE", value: "SUPER_RARE" },
      { label: "LEGENDARY", value: "LEGENDARY" },
    ],
    placeholder: "등급",
  };
  const genre = {
    value: "genre",
    options: [
      { label: "앨범", value: "ALBUM" },
      { label: "특전", value: "SPECIAL" },
      { label: "팬싸", value: "FAN_SIGN" },
      { label: "시즌그리팅", value: "SEASONS_GREETINGS" },
      { label: "팬미팅", value: "FAN_MEETING" },
      { label: "콘서트", value: "CONCERT" },
      { label: "엠디", value: "MD" },
      { label: "콜라보", value: "COLLAB" },
      { label: "팬클럽", value: "FAN_CLUB" },
      { label: "기타", value: "OTHERS" },
    ],
    placeholder: "장르",
  };
  const excludeSoldOut = {
    value: "excludeSoldOut",
    defaultValue: "include",
    options: [
      { label: "품절 포함", value: "include" },
      { label: "품절 제외", value: "exclude" },
    ],
    placeholder: "매진여부",
  };
  const filters = [grade, genre, excludeSoldOut];

  //정렬에 사용할 상수
  const sort = {
    defaultValue: "latest",
    options: [
      { label: "최신순", value: "latest" },
      { label: "오래된 순", value: "oldest" },
      { label: "낮은 가격 순", value: "priceAsc" },
      { label: "높은 가격 순", value: "priceDesc" },
    ],
  };

  return (
    <div className={styles.pageQueryRow}>
      <SearchInput className={styles.search} onSearch={onSearch} />
      <div className={styles.filters}>
        {filters.map((filter) => (
          <Dropdown
            key={filter.value}
            defaultValue={filter.defaultValue ?? ""}
            options={filter.options}
            placeholder={filter.placeholder}
            className={styles.filter}
            onChange={(value) => {
              onFilterChange(filter.value, value);
            }}
          />
        ))}
      </div>
      <button aria-label="필터 열기" className={styles.mobileFilter}>
        <Image alt="검색 필터" height={25} src="/images/ic-filter.svg" width={25} />
      </button>
      <div className={styles.blankSpace}></div>
      <Dropdown
        defaultValue={sort.defaultValue}
        options={sort.options}
        className={styles.sort}
        onChange={onSortChange}
      />
    </div>
  );
}
