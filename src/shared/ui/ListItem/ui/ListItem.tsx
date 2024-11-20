import { classNames } from '@/shared/lib'
import styles from './style.module.scss'
import { ReactElement } from 'react'

interface ListItemProps {
    children: ReactElement
}

export const ListItem = (props: ListItemProps) => {

    const {children} = props

    return (
        <li className={classNames(styles['item'])}>
            {children}
        </li>
    )
}