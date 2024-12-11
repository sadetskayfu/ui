import { Backdrop } from "@/shared/ui/Backdrop";
import { Button } from "@/shared/ui/Button";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { useState } from "react";

const BackdropPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenClearBackdrop, setIsOpenClearBackdrop] =
    useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleCloseClearBackdrop = () => {
    setIsOpenClearBackdrop(false);
  };
  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Backdrop</SectionTitle>
        <PreviewComponents title="Backdrop variants">
          <Button onClick={() => setIsOpen(true)}>Dark</Button>
          <Backdrop onClose={handleClose} isVisible={isOpen} zIndex={2000}>
            <p>I am dark</p>
          </Backdrop>
          <Button onClick={() => setIsOpenClearBackdrop(true)}>Clear</Button>
          <Backdrop
            variant="clear"
            onClose={handleCloseClearBackdrop}
            isVisible={isOpenClearBackdrop}
            zIndex={2000}
          >
            <p>I am clear</p>
          </Backdrop>
        </PreviewComponents>
      </section>
    </div>
  );
};

export default BackdropPage;
