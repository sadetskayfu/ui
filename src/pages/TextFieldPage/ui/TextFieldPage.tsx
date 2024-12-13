import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { Field, FieldLabelVariant, FieldVariant } from "@/shared/ui/Field";
import { useCallback, useRef, useState } from "react";
import styles from "./style.module.scss";
import { Radio } from "@/shared/ui/Radio";
import { fieldLabelVariants, fieldVariants } from "../model/Field";
import { requiredValidate } from "@/shared/lib/validate";
import { InputAdornment } from "@/shared/ui/InputAdornment";
import { IconButton } from "@/shared/ui/IconButton";
import { Icon } from "@/shared/ui/Icon";
import { FormLabel } from "@/shared/ui/FormLabel";
import { Switch } from "@/shared/ui/Switch";
import { FormGroup } from "@/shared/ui/FormGroup";

const TextFieldPage = () => {
  const [value, setValue] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [labelVariant, setLabelVariant] =
    useState<FieldLabelVariant>("visible");
  const [variant, setVariant] = useState<FieldVariant>("outlined");

  const [isRequired, setIsRequired] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isReadonly, setIsReadonly] = useState<boolean>(false);

  const passwordInputRef = useRef<HTMLInputElement | null>(null)

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

  const handleToggleVisibilityPassword = () => {
    const input = passwordInputRef.current
    if (input) {
      const cursorPosition = input.selectionStart;
      setShowPassword((prev) => !prev)
      setTimeout(() => {
        input.setSelectionRange(cursorPosition, cursorPosition);
      }, 0);
    }
  };

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Field</SectionTitle>
        <div className="mods">
          <FormGroup label="Variants">
            {fieldVariants.map((fieldVariant) => {
              return <FormLabel label={fieldVariant.label} Component={<Radio name='field-variant' value={fieldVariant.value} selectedValue={variant} onChange={handleToggleVariant}/>}/>
            })}
          </FormGroup>
          <FormGroup label="Label variants">
            {fieldLabelVariants.map((fieldVariant) => {
              return <FormLabel label={fieldVariant.label} Component={<Radio name='field-label-variant' value={fieldVariant.value} selectedValue={labelVariant} onChange={handleToggleLabelVariant}/>}/>
            })}
          </FormGroup>
          <div>
            <FormLabel label="Disabled" Component={<Switch checked={isDisabled} onChange={handleToggleDisabled}/>}/>
            <FormLabel label="Required" Component={<Switch checked={isRequired} onChange={handleToggleRequired}/>}/>
            <FormLabel label="Readonly" Component={<Switch checked={isReadonly} onChange={handleToggleReadonly}/>}/>
          </div>
        </div>
        <div className="subsections">
          <PreviewComponents title="Sizes" direction="vertical">
            <Field
              id="medium-field"
              name="medium"
              className={styles["field"]}
              label="Medium"
              size="medium"
              labelVariant={labelVariant}
              value={value}
              onChange={handleChangeValue}
              placeholder="Enter value..."
              disabled={isDisabled}
              readonly={isReadonly}
              required={isRequired}
              autoComplete="off"
              variant={variant}
              errorMessage={error}
              onBlur={handleValidate}
            />
            <Field
              id='large-field'
              name="large"
              className={styles["field"]}
              label="Large"
              size="large"
              value={value}
              onChange={handleChangeValue}
              placeholder="Enter value..."
              labelVariant={labelVariant}
              disabled={isDisabled}
              readonly={isReadonly}
              required={isRequired}
              autoComplete="off"
              type="text"
              variant={variant}
            />
          </PreviewComponents>
          <PreviewComponents title="Password field">
            <form autoComplete="off">
              <Field
                id='password-field'
                className={styles["field"]}
                ref={passwordInputRef}
                name="password"
                label="Password"
                size="medium"
                value={password}
                onChange={handleChangePassword}
                placeholder="Enter password..."
                labelVariant={labelVariant}
                disabled={isDisabled}
                readonly={isReadonly}
                required={isRequired}
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleVisibilityPassword}
                      size="small-l"
                      variant="clear"
                      color="secondary"
                      aria-label={showPassword ? 'hide the password' : 'display the password'}
                      stopFocus
                      tabIndex={isDisabled ? -1 : 0}
                    >
                      {showPassword ? <Icon variant="eye" /> : <Icon variant="eye-slash" />}
                    </IconButton>
                  </InputAdornment>
                }
                variant={variant}
              />
            </form>
          </PreviewComponents>
          <PreviewComponents title="Search field">
            <Field
              id='search-field'
              className={styles["field"]}
              name="search"
              label="Search"
              size="medium"
              value={value}
              onChange={handleChangeValue}
              placeholder="Search..."
              labelVariant={labelVariant}
              disabled={isDisabled}
              readonly={isReadonly}
              required={isRequired}
              autoComplete="off"
              onSearch={() => alert("Search")}
              variant={variant}
            />
          </PreviewComponents>
          <PreviewComponents title="Multiline">
            <Field
              id='multiline-field'
              name="multiline"
              className={styles["field"]}
              label="Large"
              size="medium"
              value={value}
              onChange={handleChangeValue}
              placeholder="Enter value..."
              labelVariant={labelVariant}
              disabled={isDisabled}
              readonly={isReadonly}
              required={isRequired}
              autoComplete="off"
              variant={variant}
              isMultiline
            />
          </PreviewComponents>
          <PreviewComponents title="With custom adornment">
            <Field
              id='custom-start-adornment-field'
              name="custom-start-adornment"
              className={styles["field"]}
              label="Medium"
              size="medium"
              labelVariant={labelVariant}
              value={value}
              onChange={handleChangeValue}
              placeholder="Enter value..."
              disabled={isDisabled}
              readonly={isReadonly}
              required={isRequired}
              autoComplete="off"
              variant={variant}
              startAdornment={
                <InputAdornment>
                  <p>KG</p>
                </InputAdornment>
              }
            />
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default TextFieldPage;
