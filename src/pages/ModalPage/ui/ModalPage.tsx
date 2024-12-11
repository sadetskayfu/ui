import { SectionTitle } from "@/shared/ui/SectionTitle"
import { PreviewComponents } from "@/widgets/PreviewComponents"
import { TestModal } from "@/widgets/TestModal/ui/TestModal"

const ModalPage = () => {

    return (
        <div className="page">
            <section className="section">
                <SectionTitle>Modal</SectionTitle>
                <PreviewComponents title='Backdrop variants'>
                    <TestModal />
                </PreviewComponents>
            </section>
        </div>
    )
}

export default ModalPage