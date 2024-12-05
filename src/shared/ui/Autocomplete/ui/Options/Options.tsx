import {
  cloneElement,
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { OptionItem } from "@/shared/ui/OptionItem";
import { getSelectedValue, updateScrollList } from "@/shared/lib";
import styles from './style.module.scss'
import { OptionItemProps } from "@/shared/ui/OptionItem";

interface OptionsProps {
  isVisible: boolean;
  options: ReactElement<OptionItemProps>[];
  onClose: () => void;
  onSelect: (value: string) => void;
  getDisabledOption?: (value: string) => boolean;
  autocompleteRef: React.RefObject<HTMLDivElement>;
  fieldRef: React.RefObject<HTMLInputElement>;
  optionsListId: string;
  labelId: string;
  parentId: string;
  height?: string;
  focusedOptionIndex: number;
  setFocusedOptionIndex: (index: number) => void;
  setFocusedOptionId: (id: string | undefined) => void;
  value: string;
  selectedValue: string | string[];
  isStopFilter: boolean;
  isFocusedField: boolean;
}

export const Options = memo((props: OptionsProps) => {
  const {
    isVisible,
    options,
    onSelect,
    getDisabledOption,
    fieldRef,
    optionsListId,
    labelId,
    parentId,
    height,
    focusedOptionIndex,
    setFocusedOptionIndex,
    setFocusedOptionId,
    value,
    selectedValue,
    isStopFilter,
    isFocusedField,
  } = props;

  const optionsListRef = useRef<HTMLUListElement | null>(null);
  const optionsRef = useRef<Array<HTMLLIElement>>([]);
  const lastFocusedOptionRef = useRef<HTMLLIElement | null>(null);

  const getFilteredOptions = useCallback(
    (
      options: ReactElement<OptionItemProps>[],
      value: string,
      isStopFilter: boolean
    ) => {
      if (value === "" || isStopFilter) return options;
      return options.filter((option) =>
        option.props.label!.toLowerCase().includes(value.toLowerCase())
      );
    },
    []
  );

  // Get options
  useEffect(() => {
    const optionsList = optionsListRef.current;
    if (!optionsList) return;

    const updateOptions = () => {
      const options =
        optionsList.querySelectorAll<HTMLLIElement>("[role='option']");
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

      let nextIndex = currentIndex;

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
    []
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      let index = focusedOptionIndex;
      const options = optionsRef.current;

      switch (event.key) {
        case "ArrowDown":
        case "ArrowUp":
          event.preventDefault();
          const direction = event.key === "ArrowDown" ? 1 : -1;
          isVisible && options.length > 0 && (index = findNextEnabledOption(index, direction))
          break;
        case "Enter":
          event.preventDefault();
          if (isVisible) {
            index !== -1 && onSelect(options[index].getAttribute("data-value")!);
          } 
          break;
        default:
          return;
      }
      setFocusedOptionIndex(index);
    },
    [
      isVisible,
      findNextEnabledOption,
      focusedOptionIndex,
      setFocusedOptionIndex,
      onSelect,
    ]
  );

  const findMenuItem = (element: HTMLElement | null): HTMLElement | null => {
    while (element && !element.hasAttribute("data-value")) {
      element = element.parentElement;
    }
    return element;
  };

  const handleSelect = useCallback(
    (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement;
      const optionItem = findMenuItem(targetElement);

      if (optionItem) {
        onSelect(optionItem.getAttribute("data-value")!);
      }
    },
    [onSelect]
  );

  useEffect(() => {
    if (isFocusedField) {
      document.addEventListener("click", handleSelect);
    }
    return () => {
      document.removeEventListener("click", handleSelect);
    };
  }, [handleSelect, isFocusedField]);

  // Add handle keydown on field
  useEffect(() => {
    const field = fieldRef.current;
    field?.addEventListener("keydown", handleKeyDown);
    return () => {
      field?.removeEventListener("keydown", handleKeyDown);
    };
  }, [fieldRef, handleKeyDown]);

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
    setFocusedOptionIndex(index);
  }, [setFocusedOptionIndex, selectedValue, isVisible]);

  // Update scroll
  useEffect(() => {
    const options = optionsRef.current;
    const optionsList = optionsListRef.current;
    if (isVisible) {
      updateScrollList(focusedOptionIndex, options, optionsList, 6);
    }
  }, [isVisible, focusedOptionIndex]);

  // Update style the focused option
  useEffect(() => {
    const options = optionsRef.current;
    const focusedOption = options[focusedOptionIndex];
    const lastFocusedOption = lastFocusedOptionRef.current;

    lastFocusedOption?.classList.remove(styles["focused"]);

    if (focusedOptionIndex !== -1 && focusedOption) {
      focusedOption.classList.add(styles["focused"]);
      lastFocusedOptionRef.current = focusedOption;
    }
  }, [focusedOptionIndex]);

  // Update focused option id for aria-activedescendant
  useEffect(() => {
    if (focusedOptionIndex === -1) {
      setFocusedOptionId(undefined);
      return;
    }
    const focusedOptionId =
      optionsRef.current[focusedOptionIndex]?.getAttribute("id");
    focusedOptionId ? setFocusedOptionId(focusedOptionId) : undefined;
  }, [focusedOptionIndex, setFocusedOptionId]);

  const renderOptions = useMemo(() => {
    if (options.length === 0) return <OptionItem isReadonly>No options</OptionItem>;

    const filteredOptions = getFilteredOptions(options, value, isStopFilter);

    if (filteredOptions.length === 0)
      return <OptionItem isReadonly>No options</OptionItem>;

    return filteredOptions.map((option: ReactElement<OptionItemProps>, index) => {
      const optionValue = option.props.value;
      const optionId = `${parentId}-option-${index}`;
      const isDisabled = getDisabledOption?.(optionValue!);
      const isSelected = getSelectedValue(optionValue!, selectedValue);

      const props: Partial<OptionItemProps> = {
        isDisabled,
        id: optionId,
        index,
        setFocusedOptionIndex,
        isSelected,
      };
      return cloneElement(option, { ...props, key: index });
    });
  }, [
    options,
    getFilteredOptions,
    getDisabledOption,
    parentId,
    setFocusedOptionIndex,
    isStopFilter,
    value,
    selectedValue,
  ]);

  return (
      <ul
        className={styles["list"]}
        ref={optionsListRef}
        id={optionsListId}
        aria-labelledby={labelId}
        role="listbox"
        aria-multiselectable={Array.isArray(selectedValue) ? "true" : "false"}
        style={{ maxHeight: height}}
      >
        {renderOptions}
      </ul>
  );
});
