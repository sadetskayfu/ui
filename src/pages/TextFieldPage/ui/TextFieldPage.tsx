import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { fieldSizes, fieldVariants, labelVariants } from "../model/TextField";
import { Input } from "@/shared/ui/Input";
import { capitalizeFirstLetter } from "@/shared/lib";
import { useCallback, useMemo, useState } from "react";
import { Checkbox } from "@/shared/ui/Checkbox";

const TextFieldPage = () => {
  const [value, setValue] = useState<string>("");
  const [isRequired, setIsRequired] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isReadonly, setIsReadonly] = useState<boolean>(false);

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

  const renderFieldVariants = useMemo(() => {
    return fieldVariants.map((item) => {
      return (
        <Input
          label={capitalizeFirstLetter(item) as string}
          variant={item}
          name={item}
          value={value}
          onChange={handleChangeValue}
          placeholder="Input value..."
          isDisabled={isDisabled}
          isReadonly={isReadonly}
          isRequired={isRequired}
        />
      );
    });
  }, [value, handleChangeValue, isDisabled, isReadonly, isRequired]);

  const renderSizes = useMemo(() => {
    return fieldSizes.map((item) => {
      return (
        <Input
          label={capitalizeFirstLetter(item) as string}
          variant="transparent"
          size={item}
          name={item}
          value={value}
          onChange={handleChangeValue}
          placeholder="Input value..."
          isDisabled={isDisabled}
          isReadonly={isReadonly}
          isRequired={isRequired}
        />
      );
    });
  }, [value, handleChangeValue, isDisabled, isReadonly, isRequired]);

  const renderLabelVariants = useMemo(() => {
    return labelVariants.map((item) => {
      return (
        <Input
          label={capitalizeFirstLetter(item) as string}
          variant="transparent"
          labelVariant={item}
          name={item}
          value={value}
          onChange={handleChangeValue}
          placeholder={capitalizeFirstLetter(item) + "..."}
          isDisabled={isDisabled}
          isReadonly={isReadonly}
          isRequired={isRequired}
        />
      );
    });
  }, [value, handleChangeValue, isDisabled, isReadonly, isRequired]);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Text Filed</SectionTitle>
        <div className="filter">
          <Checkbox
            name="disabled"
            label="Disabled"
            isChecked={isDisabled}
            onToggle={handleToggleDisabled}
          />
          <Checkbox
            name="readonly"
            label="Readonly"
            isChecked={isReadonly}
            onToggle={handleToggleReadonly}
          />
          <Checkbox
            name="required"
            label="Required"
            isChecked={isRequired}
            onToggle={handleToggleRequired}
          />
        </div>
        <div className="subsections">
          <PreviewComponents title="Field variants">
            {renderFieldVariants}
          </PreviewComponents>
          <PreviewComponents title="Sizes">{renderSizes}</PreviewComponents>
          <PreviewComponents title="Label variants">
            {renderLabelVariants}
          </PreviewComponents>
          <PreviewComponents title="Password field">
            <Input
              type="password"
              isVisiblePasswordButton
              value={value}
              onChange={handleChangeValue}
              name="password"
              label="Password"
              isDisabled={isDisabled}
              isReadonly={isReadonly}
              isRequired={isRequired}
              placeholder="Password.."
            />
          </PreviewComponents>
          <PreviewComponents title="Search field">
            <Input
              isSearch
              value={value}
              onChange={handleChangeValue}
              name="search"
              label="Search"
              placeholder="Search.."
              isDisabled={isDisabled}
              isReadonly={isReadonly}
              isRequired={isRequired}
            />
          </PreviewComponents>
          <PreviewComponents title="Error">
            <Input
              isSearch
              value={value}
              onChange={handleChangeValue}
              name="search"
              label="Search"
              placeholder="Search.."
              errorMessage="Error"
              isDisabled={isDisabled}
              isReadonly={isReadonly}
              isRequired={isRequired}
            />
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default TextFieldPage;
