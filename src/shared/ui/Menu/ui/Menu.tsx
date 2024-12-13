import { classNames, rippleId } from "@/shared/lib";
import {
  DropdownClosingVariant,
  DropdownPortal,
  DropdownPositionVariant,
} from "@/shared/ui/Dropdown";
import {
  ReactElement,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./style.module.scss";

interface MenuProps {
  className?: string;
  children: ReactElement[];
  isVisible: boolean;
  onClose: () => void;
  parentRef: RefObject<HTMLElement>;
  id: string;
  labelId: string;
  positionVariant?: DropdownPositionVariant;
  closingVariant?: DropdownClosingVariant;
  height?: 'full-screen' | string
  width?: string
  zIndex?: number
}

export const Menu = (props: MenuProps) => {
  const {
    className,
    children,
    isVisible: externalIsVisible,
    onClose,
    parentRef,
    id,
    labelId,
    positionVariant,
    closingVariant,
    height,
    width,
    zIndex,
  } = props;

  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isVisible, setIsVisible] = useState<boolean>(externalIsVisible)
  const [isUnmountingAnimation, setIsUnmountingAnimation] = useState<boolean>(false)

  const menuRef = useRef<HTMLUListElement | null>(null);
  const focusableElementsRef = useRef<HTMLElement[]>([]);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)

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
        case "ArrowDown":
        case "ArrowUp":
          event.preventDefault();
          const direction = event.key === "ArrowUp" ? -1 : 1;
          newIndex =
            newIndex === -1 && direction === -1
              ? currentFocusableElements.length - 1
              : (activeIndex + direction + currentFocusableElements.length) %
                currentFocusableElements.length;
          currentFocusableElements[newIndex].focus();
          break;
        case "Escape":
        case "Tab":
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
    if (!isVisible && activeIndex !== -1) {
      setActiveIndex(-1);
      parentRef.current?.focus();
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isVisible, activeIndex, parentRef]);

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

  if(!isVisible) return

  return (
    <DropdownPortal
      isVisible={isVisible}
      onClose={onClose}
      parentRef={parentRef}
      closingVariant={closingVariant}
      positionVariant={positionVariant}
      height={height}
      width={width}
      isMountingAnimation
      isUnmountingAnimation={isUnmountingAnimation}
      zIndex={zIndex}
    >
      <ul
        className={classNames(styles["menu-list"], [className])}
        role="menu"
        ref={menuRef}
        id={id}
        aria-labelledby={labelId}
      >
        {children}
      </ul>
    </DropdownPortal>
  );
};
