import { ReactNode, RefObject, useCallback, useEffect, useId, useRef, useState } from "react";
import { Portal } from "../../Portal";
import { classNames } from "@/shared/lib";
import { Backdrop, BackdropVariant } from "@/shared/ui/Backdrop";
import styles from "./style.module.scss";

type AsideMenuPositionVariant = "left" | "right" | "top" | "bottom";

interface AsideMenuProps {
  className?: string;
  label?: string
  children: ReactNode;
  isVisible: boolean;
  onClose?: () => void;
  positionVariant?: AsideMenuPositionVariant;
  backdropVariant?: BackdropVariant;
  parentRef?: RefObject<HTMLElement>
}

export const AsideMenu = (props: AsideMenuProps) => {
  const {
    className,
    label = 'Navigate menu',
    children,
    isVisible,
    onClose,
    positionVariant = "left",
    backdropVariant,
    parentRef,
  } = props;


  const menuRef = useRef<HTMLDivElement | null>(null);
  const focusableElementsRef = useRef<HTMLElement[]>([]);
  const [isFocusFirstItem, setIsFocusFirstItem] = useState<boolean>(false)
  const [isFocusLastItem, setIsFocusLastItem] = useState<boolean>(false)

  const id = useId() + 'aside-menu-label'

  const firstItem = focusableElementsRef.current[0]
  const lastItem = focusableElementsRef.current[focusableElementsRef.current.length - 1]

  const handleSetFocusFirstItem = () => {
    setIsFocusFirstItem(true)
  }
  const handleClearFocusFirstItem = () => {
    setIsFocusFirstItem(false)
  }
  const handleSetFocusLastItem = () => {
    setIsFocusLastItem(true)
  }
  const handleClearFocusLastItem = () => {
    setIsFocusLastItem(false)
  }

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.()
      }
      if (event.key === 'Tab') {
        
        if(focusableElementsRef.current.length === 1) {
            event.preventDefault();
            firstItem?.focus()
            return
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

  useEffect(() => {
    if (isVisible) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, handleKeyDown]);

  useEffect(() => {
    const currentParent = parentRef?.current
    if(isVisible && firstItem) {
        firstItem.focus()
        handleSetFocusFirstItem()
    }   
    return () => {
        currentParent?.focus()
    }
  }, [isVisible, firstItem, parentRef])

  // Get items
  useEffect(() => {
    if (!menuRef.current) return;
  
    const currentMenuRef = menuRef.current;

    const updateFocusableElements = () => {
      const focusableElements = currentMenuRef.querySelectorAll<HTMLElement>(
        "a, button, input, textarea, select, [tabindex]"
      );
      focusableElementsRef.current = Array.from(focusableElements);
    };

    const observer = new MutationObserver(updateFocusableElements);
  
    observer.observe(currentMenuRef, {
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
    if(isVisible && firstItem && lastItem) {
        firstItem.addEventListener('focus', handleSetFocusFirstItem)
        firstItem.addEventListener('blur', handleClearFocusFirstItem)
        lastItem.addEventListener('focus', handleSetFocusLastItem)
        lastItem.addEventListener('blur', handleClearFocusLastItem)
    }
    return () => {
        if(firstItem && lastItem) {
            lastItem.removeEventListener('focus', handleSetFocusLastItem)
            lastItem.removeEventListener('blur', handleClearFocusLastItem)
            firstItem.removeEventListener('focus', handleSetFocusFirstItem)
            firstItem.removeEventListener('blur', handleClearFocusFirstItem)
        }
    }
  }, [isVisible, firstItem, lastItem])

  const mods: Record<string, boolean | undefined> = {
    [styles["visible"]]: isVisible,
  };
  const additionalClasses: Array<string | undefined> = [
    className,
    styles[positionVariant],
  ];

  if (backdropVariant) {
    return (
      <Backdrop
        isVisible={isVisible}
        onClose={onClose}
        variant={backdropVariant}
      >
        <div
          ref={menuRef}
          onClick={handleContentClick}
          className={classNames(styles["aside-menu"], additionalClasses, mods)}
          role="menu"
          aria-hidden={!isVisible}
          aria-labelledby={id}
        >
          <span id={id} className="visually-hidden">{label}</span>
          {children}
        </div>
      </Backdrop>
    );
  }

  return (
    <Portal>
      <div
        ref={menuRef}
        className={classNames(styles["aside-menu"], additionalClasses, mods)}
        role="menu"
        aria-hidden={!isVisible}
        aria-labelledby={id}
      >
        <span id={id} className="visually-hidden">{label}</span>
        {children}
      </div>
    </Portal>
  );
};
