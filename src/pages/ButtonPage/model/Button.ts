import { IconButtonSize, IconButtonForm as Form } from "@/shared/ui/IconButton";
import { ButtonSize, ButtonColor as Color, ButtonVariant as Variant } from "@/shared/ui/Button";

interface ButtonColor {
    value: Color,
    label: string
}

interface ButtonVariant {
    value: Variant
    label: string
}

interface IconButtonForm {
    value: Form,
    label: string
}

export const buttonSizes: ButtonSize[] = [
    "small", "medium", "large"
]

export const iconButtonSizes: IconButtonSize[] = [
    "small-s", "small-m", "small-l", "medium", "large"
]


export const iconButtonForms: IconButtonForm[] = [
    {
        value: 'square',
        label: 'Square'
    },
    {
        value: 'round',
        label: 'Round'
    }
]

export const buttonColors: ButtonColor[] = [
    {
        value: 'primary',
        label: 'Primary'
    },
    {
        value: 'secondary',
        label: 'Secondary'
    }
]

export const buttonVariants: ButtonVariant[] = [
    {
        value: 'filled',
        label: 'Filled'
    },
    {
        value: 'outlined',
        label: 'Outlined'
    },
    {
        value: 'clear',
        label: 'Clear'
    }
]