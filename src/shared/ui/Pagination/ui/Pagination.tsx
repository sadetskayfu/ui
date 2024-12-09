import { memo, useEffect, useRef } from "react";
import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";
import { IconButton, IconButtonBorderRadius } from "@/shared/ui/IconButton";
import { Icon } from "@/shared/ui/Icon";

export type PaginationVariant = "filled" | "outlined";
export type PaginationSize = "small-l" | "medium";

interface PaginationProps {
  className?: string;
  borderRadius?: IconButtonBorderRadius;
  size?: PaginationSize;
  variant?: PaginationVariant;
  infinity?: boolean;
  totalItems: number;
  totalItemsOnPage: number;
  currentPage: number;
  maxDisplayedPages: number;
  onChangePage: (page: number) => void;
}

export const Pagination = memo(
  ({
    className,
    size = "small-l",
    variant = "outlined",
    borderRadius,
    infinity,
    totalItems,
    totalItemsOnPage,
    currentPage,
    maxDisplayedPages,
    onChangePage,
  }: PaginationProps) => {
    const totalPages = Math.ceil(totalItems / totalItemsOnPage);

    const handlePageChange = (page: number) => {
      if (infinity) {
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

    const renderButtons = () => {
      return getPageNumbers().map((page, index) => {
        if (typeof page === "string") {
          return (
            <li key={index}>
              <IconButton
                variant="clear"
                color="secondary"
                disabled
                size={size}
              >
                ...
              </IconButton>
            </li>
          );
        }

        const isCurrentPage = currentPage === page;

        return (
          <li key={index}>
            <IconButton
              className={styles["button"]}
              variant={isCurrentPage ? "filled" : "clear"}
              borderRadius={borderRadius}
              color="secondary"
              size={size}
              onClick={() => handlePageChange(page)}
              readonly={isCurrentPage}
              buttonProps={{
                "aria-label": isCurrentPage
                  ? `Page ${page}`
                  : `Go to page ${page}`,
                "aria-current": isCurrentPage ? "true" : undefined,
              }}
            >
              {page.toString()}
            </IconButton>
          </li>
        );
      });
    };

    const additionalClasses: Array<string | undefined> = [className];

    return (
      <nav
        aria-label="pagination navigation"
        className={classNames(styles["pagination"], additionalClasses)}
      >
        <ul className={styles['list']}>
          <li>
            <IconButton
              size={size}
              variant="clear"
              color="secondary"
              borderRadius={borderRadius}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 && !infinity}
              buttonProps={{ "aria-label": "Preview page" }}
            >
              <Icon
                variant="arrow"
                size={size === "small-l" ? "small-s" : "small-l"}
              />
            </IconButton>
          </li>
          {renderButtons()}
          <li>
            <IconButton
              className={styles["button-next-page"]}
              size={size}
              variant="clear"
              color="secondary"
              borderRadius={borderRadius}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages && !infinity}
              buttonProps={{ "aria-label": "Next page" }}
            >
              <Icon
                variant="arrow"
                size={size === "small-l" ? "small-s" : "small-l"}
              />
            </IconButton>
          </li>
        </ul>
      </nav>
    );
  }
);
