import { ButtonMinimalismVariant, ButtonVariant, ButtonSize } from "@/shared/ui/Button";

export const buttonVariants: ButtonVariant[] = ['filled', 'outlined', 'clear']

export const buttonSizes: ButtonSize[] = [
    'small', 'medium', 'large'
]

export const minimalismButtonVariants: ButtonMinimalismVariant[] = [
   'round', 'square'
]

interface colorVariant {
    value: string
    label: string
}

export const colorVariants: colorVariant[] = [
    {
        value: 'primary',
        label: 'Primary'
    },
    {
        value: 'secondary',
        label: 'Secondary'
    },
]