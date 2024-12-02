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
import { updateScrollList } from "@/shared/lib";

interface Option {
  value: string;
  label: string;
}

interface OptionsProps {
  isVisible: boolean;
  options: Option[] | undefined;
  childrenOptions?:
    | ReactElement<MenuItemProps>[]
    | ReactElement[]
    | ReactElement
    | ReactElement<MenuItemProps>;
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

  const optionsListRef = useRef<HTMLUListElement | null>(null);
  const optionsRef = useRef<Array<HTMLButtonElement>>([]);

  const baseGroupedOptionsRef = useRef<Record<string, Option[]> | null>(null);
  const baseGroupedOptionsLengthRef = useRef<number | null>(null);

  const baseGroupedChildrenOptionsRef = useRef<Record<
    string,
    ReactElement<MenuItemProps>[]
  > | null>(null);
  const baseGroupedChildrenOptionsLengthRef = useRef<number | null>(null);

  const handleChangeActiveIndex = useCallback(
    (index: number) => {
      setLocalActiveIndex(index);
      setActiveIndex?.(index);
    },
    [setActiveIndex]
  );

  // Get options
  useEffect(() => {
    const optionsList = optionsListRef.current;
    if (!optionsList) return;

    const updateOptions = () => {
      const options =
        optionsList.querySelectorAll<HTMLButtonElement>("[role='option']");
      optionsRef.current = Array.from(options);
    };

    const observer = new MutationObserver(updateOptions);

    observer.observe(optionsList, {
      childList: true,
    });

    updateOptions();

    return () => {
      observer.disconnect();
    };
  }, [optionsListRef]);

  const findNextEnabledOption = useCallback(
    (currentIndex: number, direction: 1 | -1) => {
      const options = optionsRef.current;

      let nextIndex = localActiveIndex;

      for (let i = 1; i <= options.length; i++) {
        const step = direction * i;
        nextIndex =
          currentIndex === -1 && direction === -1
            ? options.length - 1
            : (currentIndex + step + options.length) % options.length;
        const isDisabled =
          options[nextIndex].getAttribute("data-disabled") === "true";
        if (!isDisabled) return nextIndex;
      }

      return -1;
    },
    [localActiveIndex]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      let nextIndex = localActiveIndex;
      const options = optionsRef.current;

      switch (event.key) {
        case "ArrowDown":
        case "ArrowUp":
          event.preventDefault();
          const direction = event.key === "ArrowDown" ? 1 : -1;
          isVisible && options.length > 0
            ? (nextIndex = findNextEnabledOption(localActiveIndex, direction))
            : onOpen();
          break;
        case "Enter":
        case " ":
          if (isAutocomplete && event.key === " ") return;
          event.preventDefault();
          if (isVisible) {
            localActiveIndex <= -1
              ? onClose()
              : options[localActiveIndex].click();
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

      nextIndex !== localActiveIndex && handleChangeActiveIndex(nextIndex);
    },
    [
      handleChangeActiveIndex,
      localActiveIndex,
      isVisible,
      onClose,
      onOpen,
      findNextEnabledOption,
      isAutocomplete,
    ]
  );

  useEffect(() => {
    activeIndex && setLocalActiveIndex(activeIndex);
  }, [activeIndex]);

  // Add handle keydown on parent
  useEffect(() => {
    const parent = parentRef.current;
    parent?.addEventListener("keydown", handleKeyDown);
    return () => {
      parent?.removeEventListener("keydown", handleKeyDown);
    };
  }, [parentRef, handleKeyDown]);

  // Update scroll
  useEffect(() => {
    const options = optionsRef.current;
    const optionsList = optionsListRef.current;
    if (isVisible) {
      updateScrollList(localActiveIndex, options, optionsList, 6);
    }
  }, [isVisible, localActiveIndex]);

  // Update the id on the focused element
  useEffect(() => {
    if (localActiveIndex === -1) {
      setActiveOptionId(undefined);
      return;
    }
    const focusedOption = optionsRef.current[localActiveIndex];
    setActiveOptionId(
      focusedOption ? (focusedOption.getAttribute("id") as string) : undefined
    );
  }, [setActiveOptionId, localActiveIndex]);

  // Update index on selected option after open menu or change selected value
  useEffect(() => {
    if (selectedValue.length === 0 || !isVisible) return;

    const options = optionsRef.current;

    if (options.length === 0) return;

    const lastSelectedOption = options.filter((option) => {
      return (
        option.getAttribute("data-value") ===
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

  const groupedOptions = useMemo(() => {
    if (!options || !groupBy) return;

    const optionsLength = options.length;
    const baseGroupedOptions = baseGroupedOptionsRef.current;

    if (
      baseGroupedOptions &&
      baseGroupedOptionsLengthRef.current === optionsLength
    )
      return baseGroupedOptions;

    const groups: Record<string, Option[]> = {};

    options.map((option) => {
      let groupKey: string = "";
      console.log("grouped options");
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
    });

    if (!baseGroupedOptions) {
      baseGroupedOptionsRef.current = groups;
      baseGroupedOptionsLengthRef.current = optionsLength;
    }

    return groups;
  }, [groupBy, options]);

  const groupedChildrenOptions = useMemo(() => {
    if (!childrenOptions || !groupBy) return;

    const optionsLength = (childrenOptions as ReactElement[]).length;
    const baseGroupedChildrenOptions = baseGroupedChildrenOptionsRef.current;

    if (
      baseGroupedChildrenOptions &&
      baseGroupedChildrenOptionsLengthRef.current === optionsLength
    )
      return baseGroupedChildrenOptions;
    
    const groups: Record<string, ReactElement<MenuItemProps>[]> = {};

    Children.map(childrenOptions, (option) => {
      console.log('grouped children options')
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

    if (!baseGroupedChildrenOptions) {
      baseGroupedChildrenOptionsRef.current = groups;
      baseGroupedChildrenOptionsLengthRef.current = optionsLength;
    }

    return groups;
  }, [groupBy, childrenOptions]);

  const getSelectedValue = useCallback(
    (value: string, selectedValue: string | string[]): boolean => {
      return Array.isArray(selectedValue)
        ? selectedValue.filter((selectedValue) => selectedValue === value)
            .length > 0
        : value === selectedValue;
    },
    []
  );

  const renderOptions = useMemo(() => {
    if (!options || options.length === 0) return;

    let optionIndex = 0;

    if (groupBy) {
      return Object.keys(groupedOptions!).map((groupKey) => {
        const groupHeaderId = `${parentId}-group-header-${groupKey}`;

        return (
          <li key={groupKey}>
            <GroupHeader id={groupHeaderId}>{groupKey}</GroupHeader>
            <ul
              className="group-items"
              role="listbox"
              aria-labelledby={groupHeaderId}
            >
              {groupedOptions![groupKey].map((option) => {
                const index = optionIndex;
                optionIndex++;
                const optionId = `${parentId}-option-${index}`;

                const isHovered = localActiveIndex === index;
                const isDisabled = getDisabledOption?.(option.value);
                const isSelected = getSelectedValue(
                  option.value,
                  selectedValue
                );

                const props: Partial<MenuItemProps> = {
                  isDisabled,
                  isSelected,
                  isHovered,
                  role: "option",
                  id: optionId,
                  index,
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
      const isSelected = getSelectedValue(option.value, selectedValue);

      const props: Partial<MenuItemProps> = {
        isDisabled,
        isSelected,
        isHovered,
        role: "option",
        id: optionId,
        index,
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
    onSelect,
    localActiveIndex,
    parentId,
    groupedOptions,
    groupBy,
    getSelectedValue,
    selectedValue,
  ]);

  const renderChildrenOptions = useMemo(() => {
    if (!childrenOptions || (childrenOptions as ReactElement[]).length === 0)
      return;

    let optionIndex = 0;

    if (groupBy) {
      return Object.keys(groupedChildrenOptions!).map((groupKey) => {
        const groupHeaderId = `${parentId}-group-header-${groupKey}`;

        return (
          <li key={groupKey}>
            <GroupHeader id={groupHeaderId}>{groupKey}</GroupHeader>
            <ul
              className="group-items"
              role="listbox"
              aria-labelledby={groupHeaderId}
            >
              {Children.map(groupedChildrenOptions![groupKey], (option) => {
                console.log('children map')
                const index = optionIndex;
                optionIndex++;
                const optionId = `${parentId}-option-${index}`;

                const value = option.props.value;

                const isHovered = localActiveIndex === index;
                const isDisabled = getDisabledOption?.(value!);
                const isSelected = getSelectedValue(value!, selectedValue);

                const props: Partial<MenuItemProps> = {
                  isDisabled,
                  isSelected,
                  isHovered,
                  role: "option",
                  id: optionId,
                  index,
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
        if (!value) return cloneElement(option);

        const index = optionIndex;
        optionIndex++;

        const optionId = `${parentId}-option-${index}`;

        const isHovered = localActiveIndex === index;
        const isDisabled = getDisabledOption?.(value);
        const isSelected = getSelectedValue(value, selectedValue);

        const props: Partial<MenuItemProps> = {
          isDisabled,
          isSelected,
          isHovered,
          role: "option",
          id: optionId,
          index,
          onSelect,
        };

        return cloneElement(option, { ...props });
      }
    );
  }, [
    childrenOptions,
    getDisabledOption,
    getSelectedValue,
    localActiveIndex,
    onSelect,
    parentId,
    groupBy,
    groupedChildrenOptions,
    selectedValue,
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
        ref={optionsListRef}
        id={optionsListId}
        aria-labelledby={labelId}
        role="listbox"
        aria-multiselectable={Array.isArray(selectedValue) ? "true" : "false"}
        style={{ maxHeight: height }}
      >
        {options ? (
          options.length > 0 ? (
            renderOptions
          ) : (
            <MenuItem isReadonly>No options</MenuItem>
          )
        ) : childrenOptions &&
          (childrenOptions as ReactElement[]).length > 0 ? (
          renderChildrenOptions
        ) : (
          <MenuItem isReadonly>No options</MenuItem>
        )}
      </ul>
    </Dropdown>
  );
};
