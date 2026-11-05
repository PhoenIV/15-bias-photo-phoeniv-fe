import Image from "next/image.js";
import { useState } from "react";

import { clsx } from "clsx";

import { Button } from "@/components/ui/Button/index.js";

import { excludeSoldOut, genre, grade } from "../../MarketplaceConfig.js";

import * as styles from "./MobileFilter.css.js";

const filters = [grade, genre, excludeSoldOut];

function FilterTabs({ activeTab, onTabChange }) {
  return (
    <div className={styles.filterTabs}>
      {filters.map((filter) => (
        <span
          key={filter.value}
          aria-selected={activeTab === filter.value}
          role="tab"
          type="button"
          value={filter.value}
          className={styles.tab}
          onClick={() => onTabChange(filter.value)}
        >
          {filter.label}
        </span>
      ))}
    </div>
  );
}

function GradeFilter({ value, onChange }) {
  return (
    <ul className={styles.wrapper}>
      {grade.options.map((opt) => (
        <li
          key={opt.value}
          className={clsx(
            styles[`${opt.color}`],
            styles.options,
            value === opt.value && styles.selectedOption,
          )}
          onClick={() => onChange(value === opt.value ? "" : opt.value)}
        >
          {opt.label}
        </li>
      ))}
    </ul>
  );
}

function GenreFilter({ value, onChange }) {
  return (
    <ul className={styles.wrapper}>
      {genre.options.map((opt) => (
        <li
          key={opt.value}
          className={clsx(styles.options, value === opt.value && styles.selectedOption)}
          onClick={() => onChange(value === opt.value ? "" : opt.value)}
        >
          {opt.label}
        </li>
      ))}
    </ul>
  );
}

function SoldOutFilter({ value, onChange }) {
  return (
    <ul className={styles.wrapper}>
      {excludeSoldOut.options.map((opt) => (
        <li
          key={opt.value}
          className={clsx(styles.options, value === opt.value && styles.selectedOption)}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </li>
      ))}
    </ul>
  );
}

function ApplyRow({ onApply, onInitialize }) {
  return (
    <div className={styles.applyRow}>
      <Image
        alt="필터 초기화"
        height={30}
        src="/images/ic-exchange.svg"
        width={30}
        onClick={onInitialize}
      />
      <Button thickness="thin" className={styles.applyButton} onClick={onApply}>
        필터 적용하기
      </Button>
    </div>
  );
}

export default function MobileFilter({ params, onApply, onClose }) {
  const [activeTab, setActiveTab] = useState("grade");
  const [grade, setGrade] = useState(params.grade ?? "");
  const [genre, setGenre] = useState(params.genre ?? "");
  const [excludeSoldOut, setExcludeSoldOut] = useState(params.excludeSoldOut ?? "include");

  const handleInitialize = () => {
    setGrade("");
    setGenre("");
    setExcludeSoldOut("include");
  };

  const handleApply = () => {
    onApply({ grade, genre, excludeSoldOut });
    onClose();
  };

  return (
    <div className={styles.modalChildren}>
      <div className={styles.titleRow}>
        <span>필터</span>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <Image alt="닫기" height={30} src="/images/ic-close.svg" width={30} />
        </button>
      </div>
      <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "grade" ? <GradeFilter value={grade} onChange={setGrade} /> : null}
      {activeTab === "genre" ? <GenreFilter value={genre} onChange={setGenre} /> : null}
      {activeTab === "excludeSoldOut" ? (
        <SoldOutFilter value={excludeSoldOut} onChange={setExcludeSoldOut} />
      ) : null}
      <ApplyRow onApply={handleApply} onInitialize={handleInitialize} />
    </div>
  );
}
