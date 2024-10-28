import { ReactElement} from 'react'
import { classNames } from '@/shared/lib'
import styles from './style.module.scss'

interface BackdropProps {
	className?: string
	children: ReactElement
	isVisible: boolean
	onClose?: () => void
}

export const Backdrop = (props: BackdropProps) => {

	const { className, children, isVisible, onClose } = props

	const mods: Record<string, boolean> = {
		[styles['visible']]: isVisible,
	}

	return (
		<div onClick={() => onClose?.()} className={classNames(styles['backdrop'], [className], mods)}>
			{children}
		</div>
	)
}