import { SubsectionTitle } from "@/shared/ui/SubsectionTitle"
import { ReactNode } from "react"
import { classNames } from "@/shared/lib"
import styles from './style.module.scss'

type PreviewComponentsDirection = 'horizontal' | 'vertical'

interface PreviewComponentsProps {
    className?: string
    direction?: PreviewComponentsDirection
    title: string
    children: ReactNode
}

export const PreviewComponents = (props: PreviewComponentsProps) => {

    const {className, direction = 'horizontal', title, children} = props

    const additionalClasses: Array<string | undefined> = [
        className,
        styles[direction]
    ]

    return (
        <div className={classNames(styles['wrapper'], additionalClasses)}>
            <SubsectionTitle className={styles['title']}>{title}</SubsectionTitle>
            <div className={styles['components']}>
                {children}
            </div>
        </div>
    )
}