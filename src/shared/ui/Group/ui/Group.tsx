import { ReactNode } from 'react'
import { classNames } from '@/shared/lib'
import styles from './styles.module.scss'

export type GroupDirectionVariant = 'horizontal' | 'vertical'
export type GroupGapVariant = 'small' | 'medium'

interface GroupProps {
    children: ReactNode
    direction?: GroupDirectionVariant
    gap?: GroupGapVariant
    className?: string
}

export const Group = (props: GroupProps) => {

    const {children, direction = 'horizontal', gap = 'medium', className} = props

    const additionalClasses: Array<string | undefined> = [
        className,
        styles[direction],
        styles[gap]
    ]

    return (
        <div className={classNames(styles['group'], additionalClasses)}>
            {children}
        </div>
    )
}