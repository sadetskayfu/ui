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
import type { MenuItemProps } from "@/shared/ui/MenuItem";
import { MenuItem } from "@/shared/ui/MenuItem";
import { GroupHeader } from "@/shared/ui/GroupHeader";

interface Option {
  value: string;
  label: string;
}

interface OptionsProps {
  isVisible: boolean;
  options: Option[] | undefined;
  childrenOptions?: ReactElement<MenuItemProps>[] | ReactElement[] | ReactElement | ReactElement<MenuItemProps>;
  selectedValue: string | string[];
  activeIndex?: number;
  setActiveIndex?: (index: number) => void;
  onClose: () => void;
  onOpen: () => void;
  onSelect: (value: string) => void;
  setActiveOptionId: (id: string | undefined) => void;
  getDisabledOption?: (value: string) => boolean;
  parentRef: React.RefObject<HTMLDivElement>;
  optionsListId: string;
  labelId: string;
  parentId: string;
  width?: string;
  height?: string;
  isAutocomplete?: boolean;
  groupBy?: keyof Option | "first-letter";
}

export const Options = (props: OptionsProps) => {
  const {
    isVisible,
    options,
    childrenOptions,
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
    setActiveIndex,
    groupBy,
  } = props;

  const [localActiveIndex, setLocalActiveIndex] = useState<number>(
    activeIndex || -1
  );

  const listRef = useRef<HTMLUListElement | null>(null);
  const interactiveElementsRef = useRef<
    Array<HTMLButtonElement | HTMLLinkElement>
  >([]);

  const handleChangeActiveIndex = useCallback(
    (index: number) => {
      setLocalActiveIndex(index);
      setActiveIndex?.(index);
    },
    [setActiveIndex]
  );

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
      const currentInteractiveElements = interactiveElementsRef.current;

      switch (event.key) {
        case "ArrowDown":
        case "ArrowUp":
          event.preventDefault();
          const direction = event.key === "ArrowDown" ? 1 : -1;
          isVisible && currentInteractiveElements.length > 0
            ? (newIndex = findNextEnabledItem(localActiveIndex, direction))
            : onOpen();
          break;
        case "Enter":
        case " ":
          if (isAutocomplete && event.key === " ") return;
          event.preventDefault();
          if (isVisible) {
            localActiveIndex <= -1
              ? onClose()
              : currentInteractiveElements[localActiveIndex].click();
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

      newIndex !== localActiveIndex && handleChangeActiveIndex(newIndex);
    },
    [
      handleChangeActiveIndex,
      localActiveIndex,
      isVisible,
      onClose,
      onOpen,
      findNextEnabledItem,
      isAutocomplete,
    ]
  );

  useEffect(() => {
    activeIndex && setLocalActiveIndex(activeIndex);
  }, [activeIndex]);

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

  // Update the id on the focused element
  useEffect(() => {
    if (localActiveIndex === -1) {
      setActiveOptionId(undefined);
      return;
    }
    const focusedItem = interactiveElementsRef.current[localActiveIndex];
    setActiveOptionId(
      focusedItem ? (focusedItem.getAttribute("id") as string) : undefined
    );
  }, [setActiveOptionId, localActiveIndex]);

  // Update index on selected option after open menu or change selected value
  useEffect(() => {
    if (selectedValue.length === 0 || !isVisible) return;
    if (interactiveElementsRef.current.length === 0) return;

    const lastSelectedOption = interactiveElementsRef.current.filter((item) => {
      return (
        item.getAttribute("data-value") ===
        (Array.isArray(selectedValue)
          ? selectedValue[selectedValue.length - 1]
          : selectedValue)
      );
    });
    const index = lastSelectedOption[0]
      ? Number(lastSelectedOption[0].getAttribute("data-index"))
      : -1;
    handleChangeActiveIndex(index);
  }, [handleChangeActiveIndex, selectedValue, isVisible]);

  const groupOptions = useCallback(
    (options: Option[]) => {
      return options.reduce((groups, option) => {
        let groupKey: string = "";

        if (groupBy === "first-letter") {
          const firstLetter = option.label.charAt(0);
          groupKey = /[0-9]/.test(firstLetter) ? "0-9" : firstLetter;
        }
        if (groupBy && groupBy !== "first-letter") {
          groupKey = option[groupBy];
        }

        groupKey.toUpperCase();

        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }

        groups[groupKey].push(option);

        return groups;
      }, {} as { [key: string]: Option[] });
    },
    [groupBy]
  );

  const groupChildrenOptions = useCallback(
    (childrenOptions: ReactElement<MenuItemProps>[] | ReactElement<MenuItemProps>) => {
      const groups = {} as { [key: string]: ReactElement<MenuItemProps>[] };

      Children.map(childrenOptions, (option) => {
        const props = option.props;
        let groupKey: string = "";

        if (groupBy === "first-letter") {
          const firstLetter = props.label!.charAt(0);
          groupKey = /[0-9]/.test(firstLetter) ? "0-9" : firstLetter;
        }
        if (groupBy && groupBy !== "first-letter") {
          groupKey = props[groupBy as keyof MenuItemProps] as string;
        }

        groupKey.toUpperCase();

        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
        groups[groupKey].push(option);
      });

      return groups;
    },
    [groupBy]
  );

  const getSelectedValue = useCallback(
    (value: string): boolean => {
      return Array.isArray(selectedValue)
        ? selectedValue.filter((selectedValue) => selectedValue === value)
            .length > 0
        : value === selectedValue;
    },
    [selectedValue]
  );

  const renderOptions = useMemo(() => {
    if (childrenOptions || !options || options.length === 0) return;

    let optionIndex = 0;

    if (groupBy) {
      const groupedOptions = groupOptions(options);

      return Object.keys(groupedOptions).map((groupKey) => {
        const groupHeaderId = `${parentId}-group-header-${groupKey}`;

        return (
          <li key={groupKey}>
            <GroupHeader id={groupHeaderId}>{groupKey}</GroupHeader>
            <ul
              className="group-items"
              role="listbox"
              aria-labelledby={groupHeaderId}
            >
              {groupedOptions[groupKey].map((option) => {
                const index = optionIndex;
                optionIndex++;
                const optionId = `${parentId}-option-${index}`;

                const isHovered = localActiveIndex === index;
                const isDisabled = getDisabledOption?.(option.value);
                const isSelected = getSelectedValue(option.value);

                const props: Partial<MenuItemProps> = {
                  isDisabled,
                  isSelected,
                  isHovered,
                  role: "option",
                  id: optionId,
                  index,
                  setActiveIndex: handleChangeActiveIndex,
                  onSelect,
                  value: option.value,
                };

                return (
                  <MenuItem key={index} {...props}>
                    {option.label}
                  </MenuItem>
                );
              })}
            </ul>
          </li>
        );
      });
    }
    return options.map((option, index) => {
      const optionId = `${parentId}-option-${index}`;

      const isHovered = localActiveIndex === index;
      const isDisabled = getDisabledOption?.(option.value);
      const isSelected = getSelectedValue(option.value);

      const props: Partial<MenuItemProps> = {
        isDisabled,
        isSelected,
        isHovered,
        role: "option",
        id: optionId,
        index,
        setActiveIndex: handleChangeActiveIndex,
        onSelect,
        value: option.value,
      };
      return (
        <MenuItem key={index} {...props}>
          {option.label}
        </MenuItem>
      );
    });
  }, [
    options,
    getDisabledOption,
    handleChangeActiveIndex,
    onSelect,
    localActiveIndex,
    parentId,
    groupOptions,
    groupBy,
    childrenOptions,
    getSelectedValue,
  ]);

  const renderChildrenOptions = useMemo(() => {
    if (options || !childrenOptions || (childrenOptions as ReactElement[]).length <= 0) return;

    let optionIndex = 0;

    if (groupBy) {
      const groupedChildrenOptions = groupChildrenOptions(childrenOptions);

      return Object.keys(groupedChildrenOptions).map((groupKey) => {
        const groupHeaderId = `${parentId}-group-header-${groupKey}`;

        return (
          <li key={groupKey}>
            <GroupHeader id={groupHeaderId}>{groupKey}</GroupHeader>
            <ul
              className="group-items"
              role="listbox"
              aria-labelledby={groupHeaderId}
            >
              {Children.map(groupedChildrenOptions[groupKey], (option) => {
                const index = optionIndex;
                optionIndex++;
                const optionId = `${parentId}-option-${index}`;

                const value = option.props.value;

                const isHovered = localActiveIndex === index;
                const isDisabled = getDisabledOption?.(value!);
                const isSelected = getSelectedValue(value!);

                const props: Partial<MenuItemProps> = {
                  isDisabled,
                  isSelected,
                  isHovered,
                  role: "option",
                  id: optionId,
                  index,
                  setActiveIndex: handleChangeActiveIndex,
                  onSelect,
                };
                return cloneElement(option, { ...props });
              })}
            </ul>
          </li>
        );
      });
    }

    return Children.map(
      childrenOptions,
      (option: ReactElement<MenuItemProps>) => {
        const value = option.props.value;
        if(!value) return cloneElement(option)
  
        const index = optionIndex;
        optionIndex++;

        const optionId = `${parentId}-option-${index}`;

        const isHovered = localActiveIndex === index;
        const isDisabled = getDisabledOption?.(value);
        const isSelected = getSelectedValue(value);

        const props: Partial<MenuItemProps> = {
          isDisabled,
          isSelected,
          isHovered,
          role: "option",
          id: optionId,
          index,
          setActiveIndex: handleChangeActiveIndex,
          onSelect,
        };

        return cloneElement(option, { ...props });
      }
    );
  }, [
    childrenOptions,
    getDisabledOption,
    getSelectedValue,
    handleChangeActiveIndex,
    localActiveIndex,
    onSelect,
    parentId,
    groupBy,
    options,
    groupChildrenOptions,
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
        className={styles["list"]}
        ref={listRef}
        id={optionsListId}
        aria-labelledby={labelId}
        role="listbox"
        aria-multiselectable={Array.isArray(selectedValue) ? "true" : "false"}
        style={{ maxHeight: height }}
      >
        {localActiveIndex}

        {options ? (
          options.length > 0 ? (
            renderOptions
          ) : (
            <MenuItem isReadonly>No options</MenuItem>
          )
        ) : childrenOptions && (childrenOptions as ReactElement[]).length > 0 ? (
          renderChildrenOptions
        ) : (
          <MenuItem isReadonly>No options</MenuItem>
        )}
      </ul>
    </Dropdown>
  );
};
