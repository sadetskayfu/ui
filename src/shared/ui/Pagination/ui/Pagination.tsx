import { Button } from "../../Button";
import Arrow from "@/shared/assets/icons/arrow.svg?react";
import PaginationIcon from "@/shared/assets/icons/pagination.svg?react";
import { memo } from "react";
import { classNames } from "@/shared/lib";
import { IconButton } from "../../IconButton";
import styles from "./style.module.scss";

export type PaginationVariant = "square" | "round";
export type PaginationSize = "small" | "medium" | "large";

interface PaginationProps {
  className?: string;
  variant?: PaginationVariant;
  size?: PaginationSize;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  ArrowIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
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
    variant,
    Icon,
    ArrowIcon,
    size = "small",
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

      // Определяем диапазон отображаемых страниц
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

      // Создаем массив страниц
      let pageNumbers: Array<string | number> = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );

      // Добавляем "..."
      if (startPage > 1) {
        pageNumbers = [1, "..."].concat(pageNumbers);
      }
      if (endPage < totalPages) {
        pageNumbers = pageNumbers.concat(["...", totalPages]);
      }

      return pageNumbers;
    };

    const additionalClasses: Array<string | undefined> = [
      className,
      styles[size],
    ];

    return (
      <div className={classNames(styles["pagination"], additionalClasses)}>
        {variant ? (
          <Button
            className={styles["button-pref-slide"]}
            size={size}
            minimalism={variant}
            variant="clear"
            isHiddenLabel
            Icon={ArrowIcon ? ArrowIcon : Arrow}
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={currentPage === 1 && !isInfinity}
            animateDirection="left"
          >
            Prev
          </Button>
        ) : (
          <IconButton
            className={styles["button-pref-slide"]}
            size={size}
            Icon={ArrowIcon ? ArrowIcon : Arrow}
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={currentPage === 1 && !isInfinity}
            animateDirection="left"
          >
            Prev
          </IconButton>
        )}

        {getPageNumbers().map((page, index) => {
          return variant? (
            <Button
              variant={currentPage === page ? "transparent" : "clear"}
              minimalism={variant}
              animateDirection="left"
              size={size}
              key={index}
              onClick={() => typeof page === "number" && handlePageChange(page)}
              isReadonly={typeof page === "string" || currentPage === page}
            >
              {page.toString()}
            </Button>
          ) : (
            <IconButton
              variant={typeof page === "number" ? "pagination" : "clear"}
              isActive={currentPage === page}
              Icon={Icon ? Icon : PaginationIcon}
              size={size}
              key={index}
              onClick={() => typeof page === "number" && handlePageChange(page)}
              isReadonly={typeof page === "string" || currentPage === page}
            >
              {page.toString()}
            </IconButton>
          );
        })}

        {variant ? (
          <Button
            size={size}
            minimalism={variant}
            variant="clear"
            isHiddenLabel
            Icon={ArrowIcon ? ArrowIcon : Arrow}
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages && !isInfinity}
            animateDirection="left"
          >
            Prev
          </Button>
        ) : (
          <IconButton
            size={size}
            Icon={ArrowIcon ? ArrowIcon : Arrow}
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages && !isInfinity}
            animateDirection="left"
          >
            Next
          </IconButton>
        )}
      </div>
    );
  }
);
