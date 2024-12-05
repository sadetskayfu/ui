export const getSelectedValue = (
  value: string,
  selectedValue: string | string[]
): boolean => {
  return Array.isArray(selectedValue)
    ? selectedValue.filter((selectedValue) => selectedValue === value).length >
        0
    : value === selectedValue;
};
