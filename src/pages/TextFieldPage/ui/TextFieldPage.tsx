import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { Field, FieldLabelVariant } from "@/shared/ui/Field";
import { useCallback, useState } from "react";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Group } from "@/shared/ui/Group";
import styles from "./style.module.scss";
import { Button } from "@/shared/ui/Button";
import { RadioGroup } from "@/shared/ui/RadioGroup";
import { fieldLabelVariants } from "../model/Field";
import { requiredValidate } from "@/shared/lib/validate";

const TextFieldPage = () => {
  const [value, setValue] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [labelVariant, setLabelVariant] = useState<FieldLabelVariant>("jump");
  const [isRequired, setIsRequired] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isReadonly, setIsReadonly] = useState<boolean>(false);

  const handleToggleLabelVariant = useCallback((value: string) => {
    setLabelVariant(value as FieldLabelVariant);
  }, []);

  const handleToggleRequired = useCallback(() => {
    setIsRequired((prev) => !prev);
  }, []);
  const handleToggleDisabled = useCallback(() => {
    setIsDisabled((prev) => !prev);
  }, []);
  const handleToggleReadonly = useCallback(() => {
    setIsReadonly((prev) => !prev);
  }, []);

  const handleChangeValue = useCallback((value: string) => {
    setValue(value);
  }, []);

  const handleValidate = useCallback(() => {
    const errors = requiredValidate(value);
    setError(errors[0]);
  }, [value]);

  const handleChangePassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Text Filed</SectionTitle>
        <Group direction="vertical" gap="small">
          <Checkbox
            name="disabled"
            label="Disabled"
            isChecked={isDisabled}
            onToggle={handleToggleDisabled}
            size="small"
          />
          <Checkbox
            name="readonly"
            label="Readonly"
            isChecked={isReadonly}
            onToggle={handleToggleReadonly}
            size="small"
          />
          <Checkbox
            name="required"
            label="Required"
            isChecked={isRequired}
            onToggle={handleToggleRequired}
            size="small"
          />
          <RadioGroup
            name="field-label-variant"
            items={fieldLabelVariants}
            title="Label variant"
            selectedValue={labelVariant}
            onChange={handleToggleLabelVariant}
            size="small"
            direction="horizontal"
          />
        </Group>
        <div className="subsections">
          <PreviewComponents title="Sizes" direction="vertical">
            <Field
              className={styles["field"]}
              label="Small"
              name="small"
              size="small"
              labelVariant={labelVariant}
              value={value}
              onChange={handleChangeValue}
              placeholder="Enter value..."
              isDisabled={isDisabled}
              isReadonly={isReadonly}
              isRequired={isRequired}
              onBlur={handleValidate}
              errorMessage={error}
              autoComplete="off"
            />
            <Field
              name="medium"
              className={styles["field"]}
              label="Medium"
              size="medium"
              labelVariant={labelVariant}
              value={value}
              onChange={handleChangeValue}
              placeholder="Enter value..."
              isDisabled={isDisabled}
              isReadonly={isReadonly}
              isRequired={isRequired}
              autoComplete="off"
            />
            <Field
              name="large"
              className={styles["field"]}
              label="Large"
              size="large"
              value={value}
              onChange={handleChangeValue}
              placeholder="Enter value..."
              labelVariant={labelVariant}
              isDisabled={isDisabled}
              isReadonly={isReadonly}
              isRequired={isRequired}
              autoComplete="off"
              type="text"
            />
          </PreviewComponents>
          <PreviewComponents title="Password field">
            <form autoComplete="off">
              <Field
                className={styles["field"]}
                name="password"
                label="Password"
                size="medium"
                value={password}
                onChange={handleChangePassword}
                placeholder="Enter password..."
                labelVariant={labelVariant}
                isDisabled={isDisabled}
                isReadonly={isReadonly}
                isRequired={isRequired}
                type="password"
                autoComplete="new-password"
                isVisibleEyeButton
              />
            </form>
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default TextFieldPage;
