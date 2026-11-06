"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { MobileFilterModal } from "@/components/common/MobileFilterModal";
import { Dropdown } from "@/components/ui/Dropdown";
import { Modal } from "@/components/ui/Modal";
import { SearchInput } from "@/components/ui/SearchInput";

import { excludeSoldOut, genre, grade, sort } from "../../MarketplaceConfig";

import * as styles from "./PageQueryRow.css.js";

export default function PageQueryRow({
  params,
  onSearch,
  onFilterChange,
  onMultipleFilterChange,
  onSortChange,
}) {
  const filters = [grade, genre, excludeSoldOut];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filterButtonRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 743) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className={styles.pageQueryRow}>
        <SearchInput className={styles.search} onSearch={onSearch} />
        <div className={styles.filters}>
          {filters.map((filter) => (
            <Dropdown
              key={filter.value}
              options={filter.options}
              placeholder={filter.placeholder}
              value={params[filter.value] ?? filter.defaultValue ?? ""}
              className={styles.filter}
              onChange={(value) => {
                onFilterChange(filter.value, value);
              }}
            />
          ))}
        </div>
        <button
          ref={filterButtonRef}
          aria-label="필터 열기"
          className={styles.mobileFilter}
          onClick={() => setIsModalOpen(true)}
        >
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
      <Modal
        isOpen={isModalOpen}
        className={styles.mobileFilterModal}
        onClose={() => setIsModalOpen(false)}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          filterButtonRef.current?.focus();
        }}
      >
        <MobileFilterModal
          filters={filters}
          params={params}
          onApply={onMultipleFilterChange}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}
