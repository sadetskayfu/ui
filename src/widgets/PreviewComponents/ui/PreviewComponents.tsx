import { SubsectionTitle } from "@/shared/ui/SubsectionTitle"
import { ReactNode } from "react"
import { classNames } from "@/shared/lib"
import styles from './style.module.scss'

type PreviewComponentsDirection = 'horizontal' | 'vertical'

interface PreviewComponentsProps {
    className?: string
    direction?: PreviewComponentsDirection
    isCentering?: boolean
    title: string
    children: ReactNode
}

export const PreviewComponents = (props: PreviewComponentsProps) => {

    const {className, direction = 'horizontal', isCentering, title, children} = props

    const additionalClasses: Array<string | undefined> = [
        className,
        styles[direction]
    ]

    const mods: Record<string, boolean | undefined> = {
        [styles['centering']]: isCentering
    }

    return (
        <div className={classNames(styles['wrapper'], additionalClasses, mods)}>
            <SubsectionTitle className={styles['title']}>{title}</SubsectionTitle>
            <div className={styles['components']}>
                {children}
            </div>
        </div>
    )
}