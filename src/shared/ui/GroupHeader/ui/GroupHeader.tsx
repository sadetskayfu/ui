import { memo } from 'react'
import styles from './style.module.scss'

interface GroupHeaderProps {
    children: string
    id: string
}

export const GroupHeader = memo((props: GroupHeaderProps) => {

    const {children, id} = props

    return (
        <div id={id} role='presentation' className={styles['header']}>
            {children}
        </div>
    )
})