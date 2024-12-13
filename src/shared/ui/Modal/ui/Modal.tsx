import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { Backdrop, BackdropVariant } from "@/shared/ui/Backdrop";
import { classNames, rippleId } from "@/shared/lib";
import styles from "./style.module.scss";

interface ModalProps {
  className?: string;
  labelId: string;
  children: ReactElement;
  isVisible: boolean;
  onClose: () => void;
  backdropVariant?: BackdropVariant;
  zIndex?: number;
}

export const Modal = (props: ModalProps) => {
  const {
    className,
    labelId,
    children,
    isVisible: externalIsVisible,
    onClose,
    backdropVariant = "dark",
    zIndex = 1000,
  } = props;

  const [isVisible, setIsVisible] = useState<boolean>(externalIsVisible);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isUnmountingAnimation, setIsUnmountingAnimation] =
    useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const focusableElementsRef = useRef<HTMLElement[]>([]);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  // Get items
  useEffect(() => {
    const modal = modalRef.current;

    if (!modal || !isVisible) return;

    const updateFocusableElements = () => {
      const focusableElements = Array.from(
        modal.querySelectorAll<HTMLElement>(
          "a, button, input, textarea, select, [tabindex]"
        )
      ).filter((el) => el.tabIndex !== -1);

      focusableElementsRef.current = focusableElements;
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          // Ignoring non HTML elements and add ripple <span>
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement && node.id !== rippleId) {
              updateFocusableElements();
            }
          });
          // Ignoring non HTML elements and remove ripple <span>
          mutation.removedNodes.forEach((node) => {
            if (node instanceof HTMLElement && node.id !== rippleId) {
              updateFocusableElements();
            }
          });
        }
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "tabindex"
        ) {
          updateFocusableElements();
        }
      });
    });

    observer.observe(modal, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    updateFocusableElements();

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      let newIndex = activeIndex;
      const currentFocusableElements = focusableElementsRef.current;

      switch (event.key) {
        case "Tab":
          event.preventDefault();
          const direction = event.shiftKey ? -1 : 1;
          newIndex =
            newIndex === -1 && direction === -1
              ? currentFocusableElements.length - 1
              : (activeIndex + direction + currentFocusableElements.length) %
                currentFocusableElements.length;
          currentFocusableElements[newIndex].focus();
          break;
        case "Escape":
          event.preventDefault();
          onClose();
          break;
        default:
          break;
      }

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    },
    [activeIndex, onClose]
  );

  useEffect(() => {
    if (isVisible) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isVisible, activeIndex]);

  // Delay close modal for animation
  useEffect(() => {
    if (externalIsVisible) {
      setIsVisible(true);
      setIsUnmountingAnimation(false);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    }
    if (!externalIsVisible && isVisible) {
      setIsUnmountingAnimation(true);
      timeoutIdRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 200);
    }
  }, [externalIsVisible]);

  // Focus on modal after open
  useEffect(() => {
    if (isVisible && activeIndex === -1) {
      modalRef.current?.focus();
    }
  }, [activeIndex, isVisible]);

  // Reset active index
  useEffect(() => {
    if (!isVisible && activeIndex !== -1) {
      setActiveIndex(-1);
    }
  }, [isVisible, activeIndex]);

  const mods: Record<string, boolean | undefined> = {
    [styles["unmounting"]]: isUnmountingAnimation,
  };
  const additionalClasses: Array<string | undefined> = [className];

  if (!isVisible) return;

  return (
    <Backdrop
      isVisible={isVisible}
      isUnmountingAnimation={isUnmountingAnimation}
      isMountingAnimation
      onClose={onClose}
      variant={backdropVariant}
      zIndex={zIndex}
    >
      <div
        className={classNames(styles["modal"], additionalClasses, mods)}
        ref={modalRef}
        role="dialog"
        aria-labelledby={labelId}
        aria-modal="true"
        tabIndex={-1}
        style={{zIndex}}
      >
        {children}
      </div>
    </Backdrop>
  );
};
