import {
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Backdrop, BackdropVariant } from "@/shared/ui/Backdrop";
import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";

interface ModalProps {
  className?: string;
  label?: string;
  children: ReactNode;
  isVisible: boolean;
  onClose?: () => void;
  backdropVariant?: BackdropVariant;
  parentRef?: RefObject<HTMLElement>;
}

export const Modal = (props: ModalProps) => {
  const {
    className,
    label = "Dialog",
    children,
    isVisible,
    onClose,
    backdropVariant = "dark",
    parentRef,
  } = props;

  const modalRef = useRef<HTMLDivElement | null>(null);
  const focusableElementsRef = useRef<HTMLElement[]>([]);
  const [isFocusFirstItem, setIsFocusFirstItem] = useState<boolean>(false);
  const [isFocusLastItem, setIsFocusLastItem] = useState<boolean>(false);

  const id = useId() + "modal-label";

  const firstItem = focusableElementsRef.current[0];
  const lastItem =
    focusableElementsRef.current[focusableElementsRef.current.length - 1];

  const handleSetFocusFirstItem = () => {
    setIsFocusFirstItem(true);
  };
  const handleClearFocusFirstItem = () => {
    setIsFocusFirstItem(false);
  };
  const handleSetFocusLastItem = () => {
    setIsFocusLastItem(true);
  };
  const handleClearFocusLastItem = () => {
    setIsFocusLastItem(false);
  };

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
      if (event.key === "Tab") {
        if (focusableElementsRef.current.length === 1) {
          event.preventDefault();
          firstItem?.focus();
          return;
        }
        if (isFocusLastItem && !event.shiftKey) {
          event.preventDefault();
          firstItem?.focus();
        } else if (isFocusFirstItem && event.shiftKey) {
          event.preventDefault();
          lastItem?.focus();
        }
      }
    },
    [firstItem, lastItem, isFocusFirstItem, isFocusLastItem, onClose]
  );

  // Get items
  useEffect(() => {
    if (!modalRef.current) return;

    const currentModalRef = modalRef.current;

    const updateFocusableElements = () => {
      const focusableElements = currentModalRef.querySelectorAll<HTMLElement>(
        "a, button, input, textarea, select, [tabindex]"
      );
      focusableElementsRef.current = Array.from(focusableElements);
    };

    const observer = new MutationObserver(updateFocusableElements);

    observer.observe(currentModalRef, {
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
      if (isVisible) {
        const originalTabIndex = el.getAttribute("data-tabindex");
        el.tabIndex =
          originalTabIndex !== null ? parseInt(originalTabIndex, 10) : 0;
      } else {
        el.tabIndex = -1;
      }
    });
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && firstItem && lastItem) {
      firstItem.addEventListener("focus", handleSetFocusFirstItem);
      firstItem.addEventListener("blur", handleClearFocusFirstItem);
      lastItem.addEventListener("focus", handleSetFocusLastItem);
      lastItem.addEventListener("blur", handleClearFocusLastItem);
    }
    return () => {
      if (firstItem && lastItem) {
        lastItem.removeEventListener("focus", handleSetFocusLastItem);
        lastItem.removeEventListener("blur", handleClearFocusLastItem);
        firstItem.removeEventListener("focus", handleSetFocusFirstItem);
        firstItem.removeEventListener("blur", handleClearFocusFirstItem);
      }
    };
  }, [isVisible, firstItem, lastItem]);

  useEffect(() => {
    if (isVisible) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, handleKeyDown]);

  useEffect(() => {
    const currentParent = parentRef?.current;
    if (isVisible) {
      firstItem?.focus();
      handleSetFocusFirstItem();
    } else if (!isVisible) {
      currentParent?.focus();
    }
  }, [isVisible, parentRef, firstItem]);

  const mods: Record<string, boolean | undefined> = {
    [styles["visible"]]: isVisible,
  };
  const additionalClasses: Array<string | undefined> = [className];

  return (
    <Backdrop isVisible={isVisible} onClose={onClose} variant={backdropVariant}>
      <div
        className={classNames(styles["modal"], additionalClasses, mods)}
        onClick={handleContentClick}
        ref={modalRef}
        role="dialog"
        aria-labelledby={id}
        aria-hidden={!isVisible}
      >
        <span id={id} className="visually-hidden">
          {label}
        </span>
        {children}
      </div>
    </Backdrop>
  );
};
