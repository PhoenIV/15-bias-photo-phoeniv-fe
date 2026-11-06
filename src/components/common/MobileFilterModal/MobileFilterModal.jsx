import Image from "next/image";
import { useState } from "react";

import { clsx } from "clsx";

import { Button } from "@/components/ui/Button";

import * as styles from "./MobileFilterModal.css";

function FilterTabs({ activeTab, filters, onTabChange }) {
  if (filters.length <= 1) return null;

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

function FilterPanel({ activeTab, filter, onChange, value }) {
  return (
    <div
      id={`panel-${filter.value}`}
      aria-labelledby={`tab-${filter.value}`}
      hidden={activeTab !== filter.value}
      role="tabpanel"
      className={styles.wrapper}
    >
      <ul>
        {filter.options.map((opt) => (
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
              onClick={() => {
                if (filter.defaultValue !== undefined) {
                  onChange(opt.value);
                } else {
                  onChange(value === opt.value ? "" : opt.value);
                }
              }}
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

export default function MobileFilterModal({
  filters = [],
  onApply,
  onClose,
  params = {},
  title = "필터",
}) {
  const [selectedTab, setSelectedTab] = useState(null);
  const activeTab = filters.some((f) => f.value === selectedTab)
    ? selectedTab
    : (filters[0]?.value ?? "");

  const [filterValues, setFilterValues] = useState(() => {
    const initial = {};
    filters.forEach((f) => {
      initial[f.value] = params[f.value] ?? f.defaultValue ?? "";
    });
    return initial;
  });

  const handleValueChange = (filterKey, nextValue) => {
    setFilterValues((prev) => ({
      ...prev,
      [filterKey]: nextValue,
    }));
  };

  const handleInitialize = () => {
    const reset = {};
    filters.forEach((f) => {
      reset[f.value] = f.defaultValue ?? "";
    });
    setFilterValues(reset);
  };

  const handleApply = () => {
    onApply(filterValues);
    onClose();
  };

  return (
    <div className={styles.modalChildren}>
      <div className={styles.titleRow}>
        <span>{title}</span>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <Image alt="닫기" height={30} src="/images/ic-close.svg" width={30} />
        </button>
      </div>

      <FilterTabs activeTab={activeTab} filters={filters} onTabChange={setSelectedTab} />

      {filters.map((filter) => (
        <FilterPanel
          key={filter.value}
          activeTab={activeTab}
          filter={filter}
          value={filterValues[filter.value]}
          onChange={(val) => handleValueChange(filter.value, val)}
        />
      ))}

      <ApplyRow onApply={handleApply} onInitialize={handleInitialize} />
    </div>
  );
}
