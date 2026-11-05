import Image from "next/image.js";
import { useState } from "react";

import { clsx } from "clsx";

import { Button } from "@/components/ui/Button/index.js";

import { excludeSoldOut, genre, grade } from "../../MarketplaceConfig.js";

import * as styles from "./MobileFilter.css.js";

const filters = [grade, genre, excludeSoldOut];

function FilterTabs({ activeTab, onTabChange }) {
  return (
    <div role="tablist" className={styles.filterTabs}>
      {filters.map((filter) => (
        <button
          id={`tab-${filter.value}`}
          key={filter.value}
          aria-controls={`panel-${filter.value}`}
          aria-selected={activeTab === filter.value}
          role="tab"
          type="button"
          value={filter.value}
          className={styles.tab}
          onClick={() => onTabChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

function GradeFilter({ activeTab, value, onChange }) {
  return (
    <div
      id="panel-grade"
      aria-labelledby="tab-grade"
      hidden={activeTab !== "grade"}
      role="tabpanel"
      className={styles.wrapper}
    >
      <ul>
        {grade.options.map((opt) => (
          <li
            key={opt.value}
            className={clsx(
              styles[`${opt.color}`],
              styles.options,
              value === opt.value && styles.selectedOption,
            )}
          >
            <button
              aria-pressed={value === opt.value}
              type="button"
              className={styles.optionButton}
              onClick={() => onChange(value === opt.value ? "" : opt.value)}
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GenreFilter({ activeTab, value, onChange }) {
  return (
    <div
      id="panel-genre"
      aria-labelledby="tab-genre"
      hidden={activeTab !== "genre"}
      role="tabpanel"
      className={styles.wrapper}
    >
      <ul>
        {genre.options.map((opt) => (
          <li
            key={opt.value}
            className={clsx(styles.options, value === opt.value && styles.selectedOption)}
          >
            <button
              aria-pressed={value === opt.value}
              type="button"
              className={styles.optionButton}
              onClick={() => onChange(value === opt.value ? "" : opt.value)}
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SoldOutFilter({ activeTab, value, onChange }) {
  return (
    <div
      id="panel-excludeSoldOut"
      aria-labelledby="tab-excludeSoldOut"
      hidden={activeTab !== "excludeSoldOut"}
      role="tabpanel"
      className={styles.wrapper}
    >
      <ul>
        {excludeSoldOut.options.map((opt) => (
          <li
            key={opt.value}
            className={clsx(styles.options, value === opt.value && styles.selectedOption)}
          >
            <button
              aria-pressed={value === opt.value}
              type="button"
              className={styles.optionButton}
              onClick={() => onChange(opt.value)}
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ApplyRow({ onApply, onInitialize }) {
  return (
    <div className={styles.applyRow}>
      <button
        aria-label="필터 초기화"
        type="button"
        className={styles.initializeButton}
        onClick={onInitialize}
      >
        <Image alt="" height={30} src="/images/ic-exchange.svg" width={30} />
      </button>
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
      {/* {activeTab === "grade" ? ( */}
      <GradeFilter activeTab={activeTab} value={grade} onChange={setGrade} />
      {/* ) : null} */}
      {/* {activeTab === "genre" ? ( */}
      <GenreFilter activeTab={activeTab} value={genre} onChange={setGenre} />
      {/* ) : null}
      {activeTab === "excludeSoldOut" ? ( */}
      <SoldOutFilter activeTab={activeTab} value={excludeSoldOut} onChange={setExcludeSoldOut} />
      {/* ) : null} */}
      <ApplyRow onApply={handleApply} onInitialize={handleInitialize} />
    </div>
  );
}
