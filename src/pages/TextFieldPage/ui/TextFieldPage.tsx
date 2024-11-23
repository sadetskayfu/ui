import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { Field, FieldLabelVariant, FieldVariant } from "@/shared/ui/Field";
import { useCallback, useState } from "react";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Group } from "@/shared/ui/Group";
import styles from "./style.module.scss";
import { Button } from "@/shared/ui/Button";
import { Radio, RadioGroup } from "@/shared/ui/RadioGroup";
import { fieldLabelVariants, fieldVariants } from "../model/Field";
import { requiredValidate } from "@/shared/lib/validate";
import { Divider } from "@/shared/ui/Divider";

const TextFieldPage = () => {
  const [value, setValue] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [labelVariant, setLabelVariant] =
    useState<FieldLabelVariant>("visible");
  const [variant, setVariant] = useState<FieldVariant>("outlined");

  const [isRequired, setIsRequired] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isReadonly, setIsReadonly] = useState<boolean>(false);

  const handleToggleLabelVariant = useCallback((value: string) => {
    setLabelVariant(value as FieldLabelVariant);
  }, []);
  const handleToggleVariant = useCallback((value: string) => {
    setVariant(value as FieldVariant);
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
        <SectionTitle>Field</SectionTitle>
        <div className="mods">
          <RadioGroup
            legend="Variants"
            name="variant"
            direction="horizontal"
            selectedValue={variant}
            onChange={handleToggleVariant}
          >
            {fieldVariants.map((radio) => {
              return <Radio label={radio.label} value={radio.value} />;
            })}
          </RadioGroup>
          <RadioGroup
            legend="Label variants"
            name="label-variant"
            direction="horizontal"
            selectedValue={labelVariant}
            onChange={handleToggleLabelVariant}
          >
            {fieldLabelVariants.map((radio) => {
              return <Radio label={radio.label} value={radio.value} />;
            })}
          </RadioGroup>
          <div>
            <Checkbox
              label="Required"
              isChecked={isRequired}
              onToggle={handleToggleRequired}
            />
            <Checkbox
              label="Disabled"
              isChecked={isDisabled}
              onToggle={handleToggleDisabled}
            />
            <Checkbox
              label="Readonly"
              isChecked={isReadonly}
              onToggle={handleToggleReadonly}
            />
          </div>
        </div>
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
              variant={variant}
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
              variant={variant}
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
              variant={variant}
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
                autoComplete="current-password"
                isVisibleEyeButton
                variant={variant}
              />
            </form>
          </PreviewComponents>
          <PreviewComponents title="Search field">
            <Field
              className={styles["field"]}
              name="search"
              label="Search"
              size="medium"
              value={value}
              onChange={handleChangeValue}
              placeholder="Search..."
              labelVariant={labelVariant}
              isDisabled={isDisabled}
              isReadonly={isReadonly}
              isRequired={isRequired}
              autoComplete="off"
              isVisibleEyeButton
              onSearch={() => alert("Search")}
              variant={variant}
            />
            <textarea/>
          </PreviewComponents>
          <PreviewComponents title="Multiline">
          <Field
              name="large"
              className={styles["field"]}
              label="Large"
              size="medium"
              value={value}
              onChange={handleChangeValue}
              placeholder="Enter value..."
              labelVariant={labelVariant}
              isDisabled={isDisabled}
              isReadonly={isReadonly}
              isRequired={isRequired}
              autoComplete="off"
              type="text"
              variant={variant}
              //isMultiline
              isMultiAutocomplete
              isVisibleOpenMenuButton
            />
          </PreviewComponents>
          <ul className={styles["container"]}>
            <li className={styles["block"]}></li>
            <Divider orientation="vertical" />
            <li className={styles["block"]}></li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default TextFieldPage;
