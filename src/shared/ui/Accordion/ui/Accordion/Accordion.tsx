import { classNames } from "@/shared/lib";
import React, {
  memo,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Icon as ArrowIcon } from "@/shared/ui/Icon";
import styles from "./style.module.scss";

type AccordionVariant = "filled" | "outlined" | "clear";
type AccordionTitleVariant = "h3" | "h4";

export interface AccordionProps {
  className?: string;
  children: ReactNode;
  title: string;
  titleVariant?: AccordionTitleVariant;
  Icon?: ReactNode;
  variant?: AccordionVariant;
  index?: number;
  selectedIndex?: number | null;
  isBorderRadius?: boolean;
  isDisabled?: boolean;
  tabIndex?: number;
  onChangeSelectedIndex?: (index: number | null) => void;
}

export const Accordion = memo((props: AccordionProps) => {
  const {
    className,
    children,
    title,
    titleVariant = "h3",
    Icon,
    variant = "filled",
    index,
    selectedIndex,
    isBorderRadius,
    isDisabled,
    tabIndex = 0,
    onChangeSelectedIndex,
  } = props;

  const isOpenInGroup = Boolean(
    index && onChangeSelectedIndex && selectedIndex === index
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const bodyRef = useRef<HTMLDivElement>(null);
  const focusableElementsRef = useRef<HTMLElement[]>([]);

  const bodyId = useId();

  const handleToggleOpenMenu = () => {
    if (index && onChangeSelectedIndex) {
      if (index === selectedIndex) {
        onChangeSelectedIndex(null);
      } else {
        onChangeSelectedIndex(index);
      }
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleToggleOpenMenu();
    }
  };

  // Get items
  useEffect(() => {
    if (!bodyRef.current) return;

    const currentBodyRef = bodyRef.current;

    const updateFocusableElements = () => {
      const focusableElements = currentBodyRef.querySelectorAll<HTMLElement>(
        "a, button, input, textarea, select, [tabindex]"
      );
      focusableElementsRef.current = Array.from(focusableElements);
    };

    const observer = new MutationObserver(updateFocusableElements);

    observer.observe(currentBodyRef, {
      childList: true,
      subtree: true,
    });

    updateFocusableElements();

    return () => {
      observer.disconnect();
    };
  }, []);

  // Update tab index
  useEffect(() => {
    focusableElementsRef.current.forEach((el) => {
      if (!el.hasAttribute("data-tabindex")) {
        el.setAttribute("data-tabindex", el.getAttribute("tabindex") ?? "0");
      }
      if (isOpen || isOpenInGroup) {
        const originalTabIndex = el.getAttribute("data-tabindex");
        el.tabIndex =
          originalTabIndex !== null ? parseInt(originalTabIndex, 10) : 0;
      } else {
        el.tabIndex = -1;
      }
    });
  }, [isOpen, isOpenInGroup]);

  // Set body height
  useEffect(() => {
    if (!bodyRef.current) return;

    const currentBody = bodyRef.current;
    const computedStyle = getComputedStyle(currentBody);
    const paddingBlock =
      parseInt(computedStyle.getPropertyValue("--padding-medium")) * 2;
    const contentHeight = currentBody.scrollHeight;

    if (isOpen || isOpenInGroup) {
      currentBody.style.height = contentHeight + paddingBlock + "px";
      setTimeout(() => {
        currentBody.style.height = "auto";
      }, 100);
    } else {
      currentBody.style.height = contentHeight + "px";
      setTimeout(() => {
        currentBody.style.height = "0px";
      }, 0);
    }
  }, [isOpen, isOpenInGroup]);

  const mods: Record<string, boolean | undefined> = {
    [styles["open"]]: isOpen || isOpenInGroup,
    [styles["border-radius"]]: isBorderRadius,
    [styles["disabled"]]: isDisabled,
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[variant],
  ];

  return (
    <div className={classNames(styles["accordion"], additionalClasses, mods)}>
      <div
        className={styles["header"]}
        tabIndex={isDisabled ? -1 : tabIndex}
        onClick={handleToggleOpenMenu}
        onKeyDown={handleKeyDown}
        role="button"
        aria-expanded={isOpen || isOpenInGroup ? "true" : "false"}
        aria-controls={bodyId}
      >
        {titleVariant === "h3" && <h3 className={styles["title"]}>{title}</h3>}
        {titleVariant === "h4" && <h4 className={styles["title"]}>{title}</h4>}
        <div className={styles["opening-icon"]}>
          {Icon ? Icon : <ArrowIcon variant="arrow" size="small-m" color="custom-color"/>}
        </div>
      </div>
      <div
        className={styles["body"]}
        ref={bodyRef}
        aria-hidden={isOpen || isOpenInGroup ? "false" : "true"}
        id={bodyId}
      >
        <div className={styles["content"]}>{children}</div>
      </div>
    </div>
  );
});
