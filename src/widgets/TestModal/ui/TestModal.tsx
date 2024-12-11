import { Button } from "@/shared/ui/Button";
import { Modal } from "@/shared/ui/Modal";
import { useCallback, useId, useRef, useState } from "react";
import styles from "./style.module.scss";

export const TestModal = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(true);
  const [newButton, setNewButton] = useState<boolean>(false);

  const labelId = useId() + "label";
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleOpen = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    buttonRef.current?.focus()
  }, []);

  const handleToggleDisabledBtn = useCallback(() => {
    setIsDisabledBtn((prev) => !prev);
  }, []);

  const handleToggleNewButton = useCallback(() => {
    setNewButton((prev) => !prev);
  }, []);

  return (
    <>
      <Button ref={buttonRef} onClick={handleOpen}>
        Open modal
      </Button>
        <Modal
          labelId={labelId}
          isVisible={isVisible}
          onClose={handleClose}
          zIndex={2000}
          backdropVariant="dark"
        >
          <div className={styles["content"]}>
            <h3 id={labelId}>Hello world</h3>
            <div className={styles["buttons"]}>
              <Button onClick={handleToggleNewButton}>Add new button</Button>
              <Button onClick={handleToggleDisabledBtn}>
                Toggle disabled button 2
              </Button>
              <Button disabled={isDisabledBtn}>Button 2</Button>
              <Button onClick={handleClose}>Close</Button>
              {newButton ? <Button>New button</Button> : undefined}
            </div>
            
          </div>
        </Modal>
    </>
  );
};
