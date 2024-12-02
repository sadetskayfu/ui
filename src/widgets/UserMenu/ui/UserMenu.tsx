import { Button } from '@/shared/ui/Button'
import styles from './style.module.scss'
import { memo, useCallback, useRef, useState } from 'react'
import { Menu } from '@/shared/ui/Menu'
import { MenuItem } from '@/shared/ui/MenuItem'
import { Divider } from '@/shared/ui/Divider'
import { Icon } from '@/shared/ui/Icon'

export const UserMenu = memo(() => {
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const menuId = 'user-menu'
    const buttonId = 'user-menu-button'

    const handleToggleVisible = useCallback(() => {
        setIsVisible((prev) => !prev)
    }, [])
    const handleClose = useCallback(() => {
        setIsVisible(false)
    }, [])

    const handleClickMenuItem = useCallback(() => {
        console.log('click')
        handleClose()
    }, [handleClose])

    return (
        <div className={styles['user-menu']}>
            <Button
                onClick={handleToggleVisible}
                ref={buttonRef}
                variant="outlined"
                color="secondary"
                aria-controls={isVisible ? menuId : undefined}
                aria-haspopup="menu"
                aria-expanded={isVisible ? 'true' : undefined}
                id={buttonId}
            >
                User
            </Button>
            <Menu
                parentRef={buttonRef}
                isVisible={isVisible}
                onClose={handleClose}
                className={styles['menu']}
                id={menuId}
                labelId={buttonId}
            >
                <MenuItem
                    onClick={handleClickMenuItem}
                    isExternalLink
                    to=""
                    EndIcon={<Icon variant="user" color="dark" />}
                >
                    Profile
                </MenuItem>
                <MenuItem
                    onClick={handleClickMenuItem}
                    EndIcon={<Icon variant="gear" color="dark" />}
                >
                    Settings
                </MenuItem>
                <Divider component="li" orientation="horizontal" />
                <MenuItem onClick={handleClickMenuItem}>Log out</MenuItem>
            </Menu>
        </div>
    )
})
