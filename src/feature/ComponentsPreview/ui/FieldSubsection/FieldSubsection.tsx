import { Input } from "@/shared/ui/Input";
import { useDispatch, useSelector } from "react-redux";
import { fieldActions } from "../../model/slice/fieldSlice";
import {
  getEmail,
  getPassword,
  getThemeVariants,
  getLabelVariants,
  getSelectedThemeVariantId,
  getSelectedLabelVariantId,
  getModsArray,
  getMods,
  getThemeVariantsArray,
  getLabelVariantsArray,
} from "../../model/selectors/fieldSelectors";
import { memo, useCallback, useMemo } from "react";
import { Accordion } from "@/shared/ui/Accordion";
import { RadioGroup } from "@/shared/ui/RadioGroup";
import { SubsectionTitle } from "@/shared/ui/SubsectionTitle";
import { ToggleSwitch } from "@/shared/ui/ToggleSwitch";
import { Mod } from "../../model/types/Field";
import { emailValidate, passwordValidate } from "@/shared/lib/validate";
import styles from "./style.module.scss";

export const FieldSubsection = memo(() => {
  const dispatch = useDispatch();

  const email = useSelector(getEmail);
  const password = useSelector(getPassword);

  const themeVariantItemsArray = useSelector(getThemeVariantsArray);
  const themeVariantItems = useSelector(getThemeVariants);
  const selectedThemeVariantId = useSelector(getSelectedThemeVariantId);

  const labelVariantItemsArray = useSelector(getLabelVariantsArray);
  const labelVariantItems = useSelector(getLabelVariants);
  const selectedLabelVariantId = useSelector(getSelectedLabelVariantId);

  const modItems = useSelector(getModsArray);
  const { disabled, readonly, required, validate } = useSelector(getMods);

  const handleChangeEmail = useCallback(
    (value: string) => {
      dispatch(fieldActions.setEmail(value));
    },
    [dispatch]
  );

  const handleChangePassword = useCallback(
    (value: string) => {
      dispatch(fieldActions.setPassword(value));
    },
    [dispatch]
  );

  const handleEmailValidate = useCallback(
    (value: string) => {
      const errors = emailValidate(value);
      dispatch(fieldActions.setEmailErrors(errors));
    },
    [dispatch]
  );

  const handlePasswordValidate = useCallback(
    (value: string) => {
      const errors = passwordValidate(value);
      dispatch(fieldActions.setPasswordErrors(errors));
    },
    [dispatch]
  );

  const handleChangeSelectedThemeVariantId = useCallback(
    (id: string) => {
      dispatch(fieldActions.toggleThemeVariant(id));
    },
    [dispatch]
  );

  const handleChangeSelectedLabelVariantId = useCallback(
    (id: string) => {
      dispatch(fieldActions.toggleLabelVariant(id));
    },
    [dispatch]
  );

  const handleToggleMod = useCallback(
    (name: string) => {
      dispatch(fieldActions.toggleMod(name as Mod));
    },
    [dispatch]
  );

  const renderModFilterItems = useMemo(() => {
    return modItems.map((item) => {
      return (
        <ToggleSwitch
          key={item.name}
          label={item.label}
          name={item.name}
          isChecked={item.value}
          onToggle={handleToggleMod}
        />
      );
    });
  }, [modItems, handleToggleMod]);

  return (
    <div className={styles["subsection"]}>
      <SubsectionTitle className={styles['title']}>Field</SubsectionTitle>
      <div className={styles["filters"]}>
        <div className={styles["accordion-group"]}>
          <Accordion variant="clear">
            <span>Theme variants</span>
            <RadioGroup
              name="field-theme-variants"
              title="Theme variants"
              items={themeVariantItemsArray}
              selectedItem={selectedThemeVariantId}
              onChange={handleChangeSelectedThemeVariantId}
            />
          </Accordion>
          <Accordion variant="clear">
            <span>Label variants</span>
            <RadioGroup
              name="field-label-variants"
              title="Label variants"
              items={labelVariantItemsArray}
              selectedItem={selectedLabelVariantId}
              onChange={handleChangeSelectedLabelVariantId}
            />
          </Accordion>
          <Accordion variant="clear">
            <span>Mods</span>
            <div className={styles["toggle-switch-group"]}>
              {renderModFilterItems}
            </div>
          </Accordion>
        </div>
      </div>
      <div className={styles["components"]}>
        <div className={styles["component"]}>
          <SubsectionTitle className={styles["component__title"]}>
            Text field
          </SubsectionTitle>
          <Input
            label="Email"
            name="email"
            type="text"
            placeholder="Enter your email.."
            autoComplete="new-password"
            value={email.value}
            onChange={handleChangeEmail}
            required={required.value}
            disabled={disabled.value}
            readOnly={readonly.value}
            variant={themeVariantItems[selectedThemeVariantId].label}
            labelVariant={labelVariantItems[selectedLabelVariantId].label}
            onBlur={() => validate.value && handleEmailValidate(email.value)}
            errorMessage={email.errors[0]}
          />
        </div>
        <div className={styles["component"]}>
          <SubsectionTitle className={styles["component__title"]}>
            Password field
          </SubsectionTitle>
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password.."
            showPasswordButton
            autoComplete="off"
            value={password.value}
            onChange={handleChangePassword}
            required={required.value}
            disabled={disabled.value}
            readOnly={readonly.value}
            variant={themeVariantItems[selectedThemeVariantId].label}
            labelVariant={labelVariantItems[selectedLabelVariantId].label}
            onBlur={() =>
              validate.value && handlePasswordValidate(password.value)
            }
            errorMessage={password.errors[0]}
          />
        </div>
      </div>
    </div>
  );
});
