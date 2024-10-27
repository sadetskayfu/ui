import { AutocompleteSubsection } from "../AutocompleteSubsection/ui/AutocompleteSubsection";
import { FieldSubsection } from "../FieldSubsection/FieldSubsection";
import styles from "./style.module.scss";

export const ComponentsPreview = () => {

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["column"]}>
        <FieldSubsection />
      </div>
      <div className={styles["column"]}>
        <AutocompleteSubsection />
      </div>
      <div className={styles["column"]}></div>
    </div>
  );
};
