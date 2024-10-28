import { SubsectionTitle } from "@/shared/ui/SubsectionTitle";
import styles from "./style.module.scss";
import { Checkbox } from "@/shared/ui/Checkbox";
import { useCallback, useState } from "react";

export const CheckboxSubsection = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const toggleChecked = useCallback(() => {
    setIsChecked((prev) => !prev);
  }, []);

  return (
    <div className={styles["subsection"]}>
      <SubsectionTitle className={styles["title"]}>Checkbox</SubsectionTitle>
      <div className={styles["components"]}>
        <div className={styles["component"]}>
          <SubsectionTitle
            className={styles["component__title"]}
            titleVariant="h4"
          >
            Size
          </SubsectionTitle>
          <ul className={styles["check-box-list"]}>
            <li>
              <Checkbox
                isChecked={isChecked}
                onToggle={toggleChecked}
                label="Large"
                name="large"
                size="large"
              />
            </li>
            <li>
              <Checkbox
                isChecked={false}
                onToggle={() => undefined}
                label="Middle"
                name="Middle"
                size="middle"
              />
            </li>
            <li>
              <Checkbox
                isChecked={true}
                onToggle={() => undefined}
                label="Small"
                name="small"
                size="small"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
