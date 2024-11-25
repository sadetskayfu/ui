import { ReactNode } from 'react'
import styles from './style.module.scss'
import { classNames } from '@/shared/lib'

type InputAdornmentPosition = 'start' | 'end'

interface InputAdornmentProps {
    children: ReactNode
    position?: InputAdornmentPosition
}

export const InputAdornment = (props: InputAdornmentProps) => {

    const {children, position = 'start'} = props


    const additionalClasses: Array<string | undefined> = [
        styles[position]
    ]

    return (
        <div className={classNames(styles['adornment'], additionalClasses)}>
            {children}
        </div>
    )
}