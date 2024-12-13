import {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { classNames, rippleId } from "@/shared/lib";
import { Backdrop, BackdropVariant } from "@/shared/ui/Backdrop";
import styles from "./style.module.scss";

type AsideMenuPositionVariant = "left" | "right" | "top" | "bottom";

interface AsideMenuProps {
  className?: string;
  labelId: string;
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
  positionVariant?: AsideMenuPositionVariant;
  backdropVariant?: BackdropVariant;
  zIndex?: number;
}

export const AsideMenu = (props: AsideMenuProps) => {
  const {
    className,
    labelId,
    children,
    isVisible: externalIsVisible,
    onClose,
    positionVariant = "left",
    backdropVariant,
    zIndex = 1000,
  } = props;

  const [isVisible, setIsVisible] = useState<boolean>(externalIsVisible);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isUnmountingAnimation, setIsUnmountingAnimation] =
    useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const focusableElementsRef = useRef<HTMLElement[]>([]);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  // Get items
  useEffect(() => {
    const menu = menuRef.current;

    if (!menu || !isVisible) return;

    const updateFocusableElements = () => {
      const focusableElements = Array.from(
        menu.querySelectorAll<HTMLElement>(
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

    observer.observe(menu, {
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
      menuRef.current?.focus();
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
  const additionalClasses: Array<string | undefined> = [className, styles[positionVariant]];

  if (!isVisible) return;

  return (
    <Backdrop
      isVisible={isVisible}
      onClose={onClose}
      variant={backdropVariant}
      zIndex={zIndex}
      isUnmountingAnimation={isUnmountingAnimation}
      isMountingAnimation
    >
      <div
        ref={menuRef}
        className={classNames(styles["aside-menu"], additionalClasses, mods)}
        role="menu"
        aria-modal="true"
        aria-labelledby={labelId}
        tabIndex={-1}
        style={{zIndex}}
      >
        {children}
      </div>
    </Backdrop>
  );
};
