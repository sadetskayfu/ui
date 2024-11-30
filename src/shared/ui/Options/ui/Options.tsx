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
  activeIndex?: number,
  setActiveIndex?: (index: number) => void,
  onClose: () => void;
  onOpen: () => void;
  onSelect: (value: string) => void;
  setActiveOptionId: (id: string | undefined) => void;
  getDisabledOption?: (value: string) => boolean;
  parentRef: React.RefObject<HTMLDivElement>;
  optionsListId: string;
  labelId: string;
  parentId: string;
  width?: string
  height?: string
  isAutocomplete?: boolean
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
    width,
    height,
    isAutocomplete,
    activeIndex,
    setActiveIndex
  } = props;

  const [localActiveIndex, setLocalActiveIndex] = useState<number>(activeIndex || -1);

  const listRef = useRef<HTMLUListElement | null>(null);
  const interactiveElementsRef = useRef<
    Array<HTMLButtonElement | HTMLLinkElement>
  >([]);

  const handleChangeActiveIndex = useCallback((index: number) => {
    setLocalActiveIndex(index)
    setActiveIndex?.(index)
  }, [setActiveIndex])

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

      let nextIndex = localActiveIndex;

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
    [localActiveIndex]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      let newIndex = localActiveIndex;

      switch (event.key) {
        case "ArrowDown":
        case "ArrowUp":
          event.preventDefault();
          const direction = event.key === "ArrowDown" ? 1 : -1;
          isVisible && interactiveElementsRef.current.length > 0
            ? (newIndex = findNextEnabledItem(localActiveIndex, direction))
            : onOpen();
          break;
        case "Enter":
          event.preventDefault();
          if (isVisible) {
            localActiveIndex <= -1
              ? onClose()
              : interactiveElementsRef.current[localActiveIndex].click();
          } else {
            onOpen();
          }
          break;
        case ' ':
          if(isAutocomplete) return
          event.preventDefault();
          if (isVisible) {
            localActiveIndex <= -1
              ? onClose()
              : interactiveElementsRef.current[localActiveIndex].click();
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

      newIndex !== localActiveIndex &&  handleChangeActiveIndex(newIndex);
    },
    [
      handleChangeActiveIndex,
      localActiveIndex,
      isVisible,
      onClose,
      onOpen,
      findNextEnabledItem,
      isAutocomplete
    ]
  );

  useEffect(() => {
    activeIndex && setLocalActiveIndex(activeIndex)
  }, [activeIndex])

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
      localActiveIndex !== -1 &&
      currentInteractiveElements &&
      currentInteractiveElements.length > 1
    ) {
      const selectedElement = currentInteractiveElements[localActiveIndex];
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
  }, [localActiveIndex]);

  // Update the id of the focused element
  useEffect(() => {
    if(localActiveIndex === -1) {
      setActiveOptionId(undefined)
      return
    }
    const focusedItem = interactiveElementsRef.current[localActiveIndex]; 
    setActiveOptionId(focusedItem ? focusedItem.getAttribute("id") as string : undefined);
  }, [setActiveOptionId, localActiveIndex])

  // Update index on selected option after open menu or change selected value
  useEffect(() => {
    if(selectedValue.length === 0 || !isVisible) return
    if(interactiveElementsRef.current.length === 0) return
   
    const lastSelectedOption = interactiveElementsRef.current.filter((item) => {
      return item.getAttribute('data-value') === (Array.isArray(selectedValue) ? selectedValue[selectedValue.length - 1] : selectedValue)
    })
    const index = lastSelectedOption[0] ? Number(lastSelectedOption[0].getAttribute('data-index')) : -1
    handleChangeActiveIndex(index)
  }, [handleChangeActiveIndex, selectedValue, isVisible])

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

        const isHovered = index === localActiveIndex;
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
          setActiveIndex: handleChangeActiveIndex,
        };

        return cloneElement(menuItem as ReactElement, { ...props });
      });
    } else {
      return options.map((option, index) => {
        const isHovered = index === localActiveIndex;
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
          setActiveIndex: handleChangeActiveIndex,
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
    localActiveIndex,
    handleChangeActiveIndex
  ]);

  return (
    <Dropdown
      className={styles["menu"]}
      isVisible={isVisible}
      onClose={onClose}
      parentRef={parentRef}
      width={width}
    >
      <ul
        className={styles['list']}
        ref={listRef}
        id={optionsListId}
        aria-labelledby={labelId}
        role="listbox"
        aria-multiselectable={Array.isArray(selectedValue) ? "true" : "false"}
        style={{maxHeight: height}}
      >
        {localActiveIndex}
        {(options.length > 0 || (menuItems && menuItems?.length > 0)) ? renderOptions : <MenuItem isReadonly>No options</MenuItem>}
      </ul>
    </Dropdown>
  );
};
