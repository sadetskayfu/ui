import { Button } from "@/shared/ui/Button"
import { SectionTitle } from "@/shared/ui/SectionTitle"
import { PreviewComponents } from "@/widgets/PreviewComponents"
import { Modal } from "@/shared/ui/Modal"
import styles from './style.module.scss'
import { useState } from "react"

const ModalPage = () => {

    const [isVisibleDarkModal, setIsVisibleDarkModal] = useState<boolean>(false)
    const [isVisibleClearModal, setIsVisibleClearModal] = useState<boolean>(false)

    return (
        <div className="page">
            <section className="section">
                <SectionTitle>Modal</SectionTitle>
                <PreviewComponents title='Backdrop variants'>
                    <Button onClick={() => setIsVisibleDarkModal(true)}>Dark</Button>
                    <Button onClick={() => setIsVisibleClearModal(true)}>Clear</Button>
                    <Modal isVisible={isVisibleDarkModal} onClose={() => setIsVisibleDarkModal(false)} isLazy isUnmounting>
                        <div className={styles['content']}>
                            <Button onClick={() => setIsVisibleDarkModal(false)}>Close</Button>
                        </div>
                    </Modal>
                    <Modal isVisible={isVisibleClearModal} onClose={() => setIsVisibleClearModal(false)} backdropVariant="clear">
                        <div className={styles['content']}>
                            <Button onClick={() => setIsVisibleClearModal(false)}>Close</Button>
                        </div>
                    </Modal>
                </PreviewComponents>
            </section>
        </div>
    )
}

export default ModalPage