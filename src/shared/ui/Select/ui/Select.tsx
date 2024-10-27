import { classNames } from "@/shared/lib";
import { ChangeEvent, memo, useEffect, useMemo, useRef, useState } from "react";
import { ClearFieldButton } from "../../ClearFieldButton";

import styles from "./style.module.scss";

type LabelTheme = "label-placeholder" | "label-none" | "label-static";

interface SelectedItemProps {
  id: string;
  label: string;
  onRemoveHandler: (value: string, e: React.MouseEvent) => void;
}

export interface Option {
  id: string;
  label: string;
}

interface SelectProps {
  readonly?: boolean;
  additionalClass?: string;
  label: string;
  require?: boolean;
  options: Option[];
  onSelect?: (value: string) => void;
  onRemove?: (value: string) => void;
  value: string | string[];
  isMulti?: boolean;
  placeholder?: string;
  labelTheme?: LabelTheme;
  errorMessage?: string;
}

const ArrowIcon = () => {
  return (
    <svg
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.46967 8.96967C6.76256 8.67678 7.23744 8.67678 7.53033 8.96967L12 13.4393L16.4697 8.96967C16.7626 8.67678 17.2374 8.67678 17.5303 8.96967C17.8232 9.26256 17.8232 9.73744 17.5303 10.0303L12.5303 15.0303C12.3897 15.171 12.1989 15.25 12 15.25C11.8011 15.25 11.6103 15.171 11.4697 15.0303L6.46967 10.0303C6.17678 9.73744 6.17678 9.26256 6.46967 8.96967Z"
        fill="#363853"
      />
    </svg>
  );
};

export const Select = memo((props: SelectProps) => {
  const {
    additionalClass,
    label,
    require = false,
    options,
    onSelect,
    onRemove,
    value,
    placeholder,
    errorMessage,
    isMulti = false,
    readonly = false,
    labelTheme = "label-placeholder",
  } = props;

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const selectRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);

  // Close drop down menu by clicking outside the content
  useEffect(() => {
    const handler = (e: ChangeEvent<HTMLInputElement> | any) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(e.target) &&
        !dropDownRef.current?.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      window.addEventListener("click", handler);
    }

    return () => {
      window.removeEventListener("click", handler);
    };
  }, [showMenu]);

  const onSelectHandler = (id: string) => {
    onSelect?.(id);

    if (!isMulti) {
      setShowMenu(false);
    }
  };

  const onRemoveHandler = (id: string, e: React.MouseEvent) => {
    if (onRemove && isMulti) {
      onRemove(id);
    }

    e.stopPropagation();
  };

  const getOptionLabel = (id: string) => {
    const option = options.filter((option) => option.id === id);
    return option[0]?.label;
  };

  const renderOptions = useMemo(() => {
    return options.map((optionItem) => {
      const values = value as string[];

      const selectedItem =
        isMulti &&
        values.filter((selectedItem) => selectedItem === optionItem.id).length;

      const isSelected = optionItem.id === value || !!selectedItem;

      const itemMods: Record<string, boolean> = {
        [styles["selected"]]: isSelected,
      };

      return (
        <li
          className={classNames(styles["drop-down-menu__item"], [], itemMods)}
          key={optionItem.id}
          onClick={() => onSelectHandler(optionItem.id)}
        >
          <span>{optionItem.label}</span>
        </li>
      );
    });
  }, [options, value, isMulti]);

  const renderSelectedValues = useMemo(() => {
    const values = value as string[];

    return (
      isMulti &&
      values.map((id) => {
        return (
          <SelectedItem
            label={getOptionLabel(id)}
            id={id}
            onRemoveHandler={onRemoveHandler}
            key={id}
          />
        );
      })
    );
  }, [value, isMulti]);

  const additionalClasses: Array<string | undefined> = [
    additionalClass,
    styles[labelTheme],
  ];

  const mods: Record<string, boolean> = {
    [styles["error"]]: !!errorMessage,
    [styles["open"]]: showMenu,
    [styles["multi"]]: isMulti,
    [styles["dirty"]]: value.length > 0 || showMenu,
    [styles["placeholder-hidden"]]:
      labelTheme === "label-placeholder"
        ? value.length > 0 || !showMenu
        : value.length > 0,
    [styles["readonly"]]: readonly,
  };

  console.log("render");

  return (
    <div className={classNames(styles["wrapper"], additionalClasses, mods)}>
      <div className={styles["select-wrapper"]}>
        <div
          className={styles["select"]}
          onClick={() => setShowMenu(!showMenu)}
          ref={selectRef}
          tabIndex={0}
        >
          {isMulti ? (
            <ul className={styles["selected-items-list"]}>
              {renderSelectedValues}
            </ul>
          ) : (
            <span>{getOptionLabel(value as string)}</span>
          )}
          <span className={styles["arrow-icon"]}>
            <ArrowIcon />
          </span>
        </div>
        <span className={styles["label"]}>
          {label}
          {require && <span className={styles["label__require"]}>*</span>}
        </span>
        <span className={styles["placeholder"]}>{placeholder}</span>
      </div>
      <div className={styles["drop-down-menu"]} ref={dropDownRef}>
        <ul className={styles["drop-down-menu__list"]}>{renderOptions}</ul>
      </div>
      <p className={styles["error-message"]}>{errorMessage}</p>
    </div>
  );
});

const SelectedItem = (props: SelectedItemProps) => {
  const { label, id, onRemoveHandler } = props;

  const onClear = (e: React.MouseEvent) => {
    onRemoveHandler(id, e);
  };

  return (
    <li className={styles["selected-item"]}>
      <span>{label}</span>
      <ClearFieldButton
        label="remove selected value"
        onClear={onClear}
      ></ClearFieldButton>
    </li>
  );
};
