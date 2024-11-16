import { Accordion, AccordionGroup } from "@/shared/ui/Accordion";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Group } from "@/shared/ui/Group";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { useCallback, useState } from "react";

const AccordionPage = () => {
  const [blueColor, setBlueColor] = useState<boolean>(false);
  const [redColor, setRedColor] = useState<boolean>(false);
  const [greenColor, setGreenColor] = useState<boolean>(false);

  const handleToggleBlueColor = useCallback(() => {
    setBlueColor((prev) => !prev);
  }, []);
  const handleToggleRedColor = useCallback(() => {
    setRedColor((prev) => !prev);
  }, []);
  const handleToggleGreenColor = useCallback(() => {
    setGreenColor((prev) => !prev);
  }, []);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Accordion</SectionTitle>
        <PreviewComponents title="Accordion variants" direction="vertical">
          <Accordion title="Filled" isBorderRadius>
            <Group direction="vertical" gap="small">
              <Checkbox
                label="Blue"
                name="blue-color"
                isChecked={blueColor}
                onToggle={handleToggleBlueColor}
                size="small"
              />
              <Checkbox
                label="Red"
                name="red-color"
                isChecked={redColor}
                onToggle={handleToggleRedColor}
                size="small"
              />
              <Checkbox
                label="Green"
                name="green-color"
                isChecked={greenColor}
                onToggle={handleToggleGreenColor}
                size="small"
              />
            </Group>
          </Accordion>
          <Accordion title="Outlined" variant="outlined" isBorderRadius>
            <Group direction="vertical" gap="small">
              <Checkbox
                label="Blue"
                name="blue-color"
                isChecked={blueColor}
                onToggle={handleToggleBlueColor}
                size="small"
                variant="outlined"
              />
              <Checkbox
                label="Red"
                name="red-color"
                isChecked={redColor}
                onToggle={handleToggleRedColor}
                size="small"
                variant="outlined"
              />
              <Checkbox
                label="Green"
                name="green-color"
                isChecked={greenColor}
                onToggle={handleToggleGreenColor}
                size="small"
                variant="outlined"
              />
            </Group>
          </Accordion>
          <Accordion title="Clear" variant="clear" isBorderRadius>
            <Group direction="vertical" gap="small">
              <Checkbox
                label="Blue"
                name="blue-color"
                isChecked={blueColor}
                onToggle={handleToggleBlueColor}
                size="small"
                variant="outlined"
              />
              <Checkbox
                label="Red"
                name="red-color"
                isChecked={redColor}
                onToggle={handleToggleRedColor}
                size="small"
                variant="outlined"
              />
              <Checkbox
                label="Green"
                name="green-color"
                isChecked={greenColor}
                onToggle={handleToggleGreenColor}
                size="small"
                variant="outlined"
              />
            </Group>
          </Accordion>
        </PreviewComponents>
        <PreviewComponents title="Accordion group">
          <AccordionGroup>
            <Accordion title="Accordion">
              <Group direction="vertical" gap="small">
                <Checkbox
                  label="Blue"
                  name="blue-color"
                  isChecked={blueColor}
                  onToggle={handleToggleBlueColor}
                  size="small"
                  variant="outlined"
                />
                <Checkbox
                  label="Red"
                  name="red-color"
                  isChecked={redColor}
                  onToggle={handleToggleRedColor}
                  size="small"
                  variant="outlined"
                />
                <Checkbox
                  label="Green"
                  name="green-color"
                  isChecked={greenColor}
                  onToggle={handleToggleGreenColor}
                  size="small"
                  variant="outlined"
                />
              </Group>
            </Accordion>
            <Accordion title="Accordion">
              <Group direction="vertical" gap="small">
                <Checkbox
                  label="Blue"
                  name="blue-color"
                  isChecked={blueColor}
                  onToggle={handleToggleBlueColor}
                  size="small"
                />
                <Checkbox
                  label="Red"
                  name="red-color"
                  isChecked={redColor}
                  onToggle={handleToggleRedColor}
                  size="small" />
                <Checkbox
                  label="Green"
                  name="green-color"
                  isChecked={greenColor}
                  onToggle={handleToggleGreenColor}
                  size="small"
                />
              </Group>
            </Accordion>
            <Accordion title="Accordion">
              <Group direction="vertical" gap="small">
                <Checkbox
                  label="Blue"
                  name="blue-color"
                  isChecked={blueColor}
                  onToggle={handleToggleBlueColor}
                  size="small"
                />
                <Checkbox
                  label="Red"
                  name="red-color"
                  isChecked={redColor}
                  onToggle={handleToggleRedColor}
                  size="small"
                />
                <Checkbox
                  label="Green"
                  name="green-color"
                  isChecked={greenColor}
                  onToggle={handleToggleGreenColor}
                  size="small"
                />
              </Group>
            </Accordion>
          </AccordionGroup>
        </PreviewComponents>
        <PreviewComponents title="Disabled">
            <Accordion title="Accordion" isDisabled isBorderRadius>
                <div></div>
            </Accordion>
        </PreviewComponents>
      </section>
    </div>
  );
};

export default AccordionPage;
