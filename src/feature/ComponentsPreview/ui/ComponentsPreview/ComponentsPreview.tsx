import { useState } from "react";
import { AutocompleteSubsection } from "../AutocompleteSubsection/AutocompleteSubsection";
import { CheckboxSubsection } from "../CheckboxSubsection/CheckboxSubsection";
import { FieldSubsection } from "../FieldSubsection/FieldSubsection";
import styles from "./style.module.scss";
import { classNames } from "@/shared/lib";

export const ComponentsPreview = () => {

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className={styles["wrapper"]}>
      <div className={classNames(styles["column"], [], {[styles['hovered']]: hoveredId === '1'})} onMouseEnter={() => setHoveredId('1')}>
        <FieldSubsection />
      </div>
      <div className={classNames(styles["column"], [], {[styles['hovered']]: hoveredId === '2'})} onMouseEnter={() => setHoveredId('2')}>
        <AutocompleteSubsection />
      </div>
      <div className={classNames(styles["column"], [], {[styles['hovered']]: hoveredId === '3'})} onMouseEnter={() => setHoveredId('3')}>
        
      </div>
      <div className={classNames(styles["column"], [], {[styles['hovered']]: hoveredId === '4'})} onMouseEnter={() => setHoveredId('4')}>
        <CheckboxSubsection/>
      </div>
    </div>
  );
};
