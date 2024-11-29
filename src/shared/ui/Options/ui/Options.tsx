import { Dropdown } from "@/shared/ui/Dropdown";
import {
  Children,
  cloneElement,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./style.module.scss";
import { MenuItemProps } from "@/shared/ui/MenuItem";
import { MenuItem } from "@/shared/ui/MenuItem";

interface Option {
    value: string
    label: string
}

interface OptionsProps {
  isVisible: boolean;
  options: Option[];
  menuItems?: ReactElement[];
  selectedValue: string | string[];
  onClose: () => void;
  onOpen: () => void;
  onSelect: (value: string) => void;
  setActiveOptionId: (id: string) => void;
  getDisabledOption?: (value: string) => boolean;
  parentRef: React.RefObject<HTMLDivElement>;
  optionsListId: string;
  labelId: string;
  parentId: string;
  menuWidth?: string
  menuHeight?: string
}

export const Options = (props: OptionsProps) => {
  const {
    isVisible,
    options,
    menuItems,
    selectedValue,
    onClose,
    onOpen,
    onSelect,
    setActiveOptionId,
    getDisabledOption,
    parentRef,
    optionsListId,
    labelId,
    parentId,
    menuWidth,
    menuHeight,
  } = props;

  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const listRef = useRef<HTMLUListElement | null>(null);
  const interactiveElementsRef = useRef<
    Array<HTMLButtonElement | HTMLLinkElement>
  >([]);

  // Get interactive elements
  useEffect(() => {
    const currentList = listRef.current;
    if (!currentList) return;

    const updateInteractiveElements = () => {
      const interactiveElements = currentList.querySelectorAll<
        HTMLButtonElement | HTMLLinkElement
      >("a, button");
      interactiveElementsRef.current = Array.from(interactiveElements);
    };

    const observer = new MutationObserver(updateInteractiveElements);

    observer.observe(currentList, {
      childList: true,
    });

    updateInteractiveElements();

    return () => {
      observer.disconnect();
    };
  }, []);

  const findNextEnabledItem = useCallback(
    (currentIndex: number, direction: 1 | -1) => {
      const currentInteractiveElements = interactiveElementsRef.current;

      let nextIndex = activeIndex;

      for (let i = 1; i <= currentInteractiveElements.length; i++) {
        const step = direction * i;
        nextIndex =
          currentIndex === -1 && direction === -1
            ? currentInteractiveElements.length - 1
            : (currentIndex + step + currentInteractiveElements.length) %
              currentInteractiveElements.length;
        const isDisabled =
          currentInteractiveElements[nextIndex].getAttribute(
            "data-disabled"
          ) === "true";
        if (!isDisabled) return nextIndex;
      }

      return -1;
    },
    [activeIndex]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      let newIndex = activeIndex;

      switch (event.key) {
        case "ArrowDown":
        case "ArrowUp":
          event.preventDefault();
          const direction = event.key === "ArrowDown" ? 1 : -1;
          isVisible && interactiveElementsRef.current.length > 0
            ? (newIndex = findNextEnabledItem(activeIndex, direction))
            : onOpen();

          if (
            newIndex !== -1 &&
            newIndex !== activeIndex &&
            interactiveElementsRef.current
          ) {
            const focusedItem = interactiveElementsRef.current[newIndex];
            setActiveOptionId(focusedItem.getAttribute("id") as string);
          }
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (isVisible) {
            activeIndex <= -1
              ? onClose()
              : interactiveElementsRef.current[activeIndex].click();
          } else {
            onOpen();
          }
          break;
        case "Escape":
          event.preventDefault();
          onClose();
          break;
        default:
          return;
      }

      newIndex !== activeIndex &&  setActiveIndex(newIndex);
    },
    [
      activeIndex,
      isVisible,
      onClose,
      onOpen,
      findNextEnabledItem,
      setActiveOptionId,
    ]
  );

  // Add handle keydown on parent
  useEffect(() => {
    const currentParent = parentRef.current;
    currentParent?.addEventListener("keydown", handleKeyDown);
    return () => {
      currentParent?.removeEventListener("keydown", handleKeyDown);
    };
  }, [parentRef, handleKeyDown]);

  // Scroll list if selected item not visible
  useEffect(() => {
    const currentList = listRef.current;
    const currentInteractiveElements = interactiveElementsRef.current;
    if (
      currentList &&
      activeIndex !== -1 &&
      currentInteractiveElements &&
      currentInteractiveElements.length > 1
    ) {
      const selectedElement = currentInteractiveElements[activeIndex];
      const menuRect = currentList.getBoundingClientRect();

      if (selectedElement) {
        const selectedRect = selectedElement.getBoundingClientRect();

        if (selectedRect.bottom > menuRect.bottom) {
          currentList.scrollTop += selectedRect.bottom - menuRect.bottom;
        } else if (selectedRect.top < menuRect.top) {
          currentList.scrollTop -= menuRect.top - selectedRect.top;
        }
      }
    }
  }, [activeIndex]);

  const optionId = `${parentId}-option-`;

  const renderOptions = useMemo(() => {
    if (options.length <= 0 || (menuItems && menuItems?.length <= 0)) return;

    const getSelectedValue = (value: string): boolean => {
      return Array.isArray(selectedValue)
        ? selectedValue.filter((selectedValue) => selectedValue === value)
            .length > 0
        : value === selectedValue;
    };

    let menuItemIndex = 0;

    if (menuItems) {
      return Children.map(menuItems, (menuItem) => {
        const childProps = (menuItem as ReactElement).props;
        const value = childProps.value;

        if (!value) return cloneElement(menuItem);

        const index = menuItemIndex;
        menuItemIndex++;

        const isHovered = index === activeIndex;
        const isSelected = getSelectedValue(value);
        const isDisabled = getDisabledOption?.(value);

        const props: Partial<MenuItemProps> = {
          onSelect,
          isSelected,
          isDisabled,
          isHovered,
          role: "option",
          id: `${optionId}${index}`,
          index,
          setActiveIndex,
        };

        return cloneElement(menuItem as ReactElement, { ...props });
      });
    } else {
      return options.map((option, index) => {
        const isHovered = index === activeIndex;
        const isSelected = getSelectedValue(option.value);
        const isDisabled = getDisabledOption?.(option.value);

        const props: Partial<MenuItemProps> = {
          onSelect,
          isSelected,
          isDisabled,
          isHovered,
          role: "option",
          id: `${optionId}${index}`,
          index,
          setActiveIndex,
        };
        return (
          <MenuItem key={index} value={option.value} {...props}>
            {option.label}
          </MenuItem>
        );
      });
    }
  }, [
    onSelect,
    options,
    menuItems,
    selectedValue,
    optionId,
    getDisabledOption,
    activeIndex,
  ]);

  return (
    <Dropdown
      className={styles["menu"]}
      isVisible={isVisible}
      onClose={onClose}
      parentRef={parentRef}
      width={menuWidth}
    >
      <ul
        className={styles['list']}
        ref={listRef}
        id={optionsListId}
        aria-labelledby={labelId}
        role="listbox"
        aria-multiselectable={Array.isArray(selectedValue) ? "true" : "false"}
        style={{maxHeight: menuHeight}}
      >
        {(options.length >= 0 || (menuItems && menuItems?.length >= 0)) ? renderOptions : <MenuItem isReadonly>No options</MenuItem>}
      </ul>
    </Dropdown>
  );
};
