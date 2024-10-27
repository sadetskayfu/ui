import { ButtonHTMLAttributes, memo } from 'react'
import { classNames } from '@/shared/lib'
import { useClickAnimation } from '@/shared/lib/hooks'
import styles from './style.module.scss'
import { ClickAnimation } from '../../ClickAnimation'

type ButtonVariant = 'primary' | 'transparent'
type ButtonSize = 'middle' | 'large'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant
	size?: ButtonSize
	disabled?: boolean
	children: string
	className?: string
	onClick?: () => void
}

export const Button = memo((props: ButtonProps) => {
	
	const { children, className, disabled, variant = 'primary', size='middle', onClick, ...otherProps } = props

	const {handleToggleAnimation, isAnimation} = useClickAnimation()

	const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
		if (event.key === "Enter") {
		  onClick?.()
		  handleToggleAnimation();
		}
	  };

	const additionalClasses: Array<string | undefined> = [
		className,
        styles[variant],
		styles[size]
	]

	const mods: Record<string, boolean | undefined> = {
		[styles['disabled']]: disabled
	}

	return (
		<button
			className={classNames(styles['button'], additionalClasses, mods)}
			onMouseDown={handleToggleAnimation}
			onKeyDown={handleKeyDown}
			onClick={onClick}
			tabIndex={disabled ? -1 : 0}
			{...otherProps}
		>
			{children}
			<ClickAnimation isAnimation={isAnimation}/>
		</button>
	)
})