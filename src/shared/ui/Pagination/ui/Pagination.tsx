import { memo } from "react";
import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";
import { IconButton } from "@/shared/ui/IconButton";
import { Icon } from "@/shared/ui/Icon";

export type PaginationVariant = 'filled' | 'outlined'
export type PaginationForm = "square" | "round";
export type PaginationSize = "small-l" | "medium" | "large";

interface PaginationProps {
  className?: string;
  form?: PaginationForm;
  size?: PaginationSize;
  variant?: PaginationVariant
  isInfinity?: boolean;
  totalItems: number;
  totalItemsOnPage: number;
  currentPage: number;
  maxDisplayedPages: number;
  onChangePage: (page: number) => void;
}

export const Pagination = memo(
  ({
    className,
    form,
    size = "small-l",
    variant = 'outlined',
    isInfinity,
    totalItems,
    totalItemsOnPage,
    currentPage,
    maxDisplayedPages,
    onChangePage,
  }: PaginationProps) => {
    const totalPages = Math.ceil(totalItems / totalItemsOnPage);

    const handlePageChange = (page: number) => {
      if (isInfinity) {
        if (page > totalPages) {
          onChangePage(1);
        } else if (page < 1) {
          onChangePage(totalPages);
        } else {
          onChangePage(page);
        }
      } else {
        if (page > 0 && page !== totalPages + 1) {
          onChangePage(page);
        }
      }
    };

    const getPageNumbers = () => {
      const halfDisplayed = Math.floor(maxDisplayedPages / 2);
      let startPage: number;
      let endPage: number;

      // Range visible page
      if (currentPage < halfDisplayed + 3) {
        startPage = 1;
        endPage = Math.min(maxDisplayedPages, totalPages);
      } else if (currentPage > totalPages - halfDisplayed - 2) {
        startPage = Math.max(totalPages - maxDisplayedPages + 1, 1);
        endPage = totalPages;
      } else {
        startPage = currentPage - halfDisplayed + 1;
        endPage = currentPage + halfDisplayed - 1;
      }

      let pageNumbers: Array<string | number> = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );

      if (startPage > 1) {
        pageNumbers = [1, "..."].concat(pageNumbers);
      }
      if (endPage < totalPages) {
        pageNumbers = pageNumbers.concat(["...", totalPages]);
      }

      return pageNumbers;
    };

    const additionalClasses: Array<string | undefined> = [className];

    return (
      <div className={classNames(styles["pagination"], additionalClasses)}>
        <IconButton
          size={size}
          variant="clear"
          color="primary"
          form={form}
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1 && !isInfinity}
          aria-label="Preview page"
        >
          <Icon variant="arrow" color="custom-color" size="custom-size" />
        </IconButton>
        {getPageNumbers().map((page, index) => {
          return (
            <IconButton
              className={styles["button"]}
              variant={currentPage === page ? (variant === 'filled' ? 'filled' : 'outlined') : "clear"}
              form={form}
              color={currentPage === page ? 'primary' : 'secondary'}
              size={size}
              key={index}
              onClick={() => typeof page === "number" && handlePageChange(page)}
              isReadonly={typeof page === "string" || currentPage === page}
              aria-current={currentPage === page ? 'page' : undefined}
              aria-label={`Page ${page}`}
            >
              {page.toString()}
            </IconButton>
          );
        })}
        <IconButton
          className={styles["button-next-page"]}
          size={size}
          variant="clear"
          color="primary"
          form={form}
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages && !isInfinity}
          aria-label="Next page"
        >
          <Icon variant="arrow" color="custom-color" size="custom-size" />
        </IconButton>
      </div>
    );
  }
);
