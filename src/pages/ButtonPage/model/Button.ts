import { ButtonMinimalismVariant, ButtonVariant, ButtonSize as Size } from "@/shared/ui/Button";

interface ButtonSize {
    size: Size
    variant: ButtonVariant
    minimalism: ButtonMinimalismVariant
}

interface MinimalismButton {
    variant: ButtonVariant
    minimalism: ButtonMinimalismVariant
}

export const buttonVariants: ButtonVariant[] = ["primary", 'transparent', 'clear']

export const buttonSizes: ButtonSize[] = [
    {
        variant: 'primary',
        size: 'small',
        minimalism: 'none',
    },
    {
        variant: 'primary',
        size: 'medium',
        minimalism: 'none',
    },
    {
        variant: 'primary',
        size: 'large',
        minimalism: 'none',
    },
    {
        variant: 'primary',
        size: 'small',
        minimalism: 'round',
    },
    {
        variant: 'primary',
        size: 'medium',
        minimalism: 'round',
    },
    {
        variant: 'primary',
        size: 'large',
        minimalism: 'round',
    },
    {
        variant: 'primary',
        size: 'small',
        minimalism: 'square',
    },
    {
        variant: 'primary',
        size: 'medium',
        minimalism: 'square',
    },
    {
        variant: 'primary',
        size: 'large',
        minimalism: 'square',
    },
]

export const minimalismButtonVariants: MinimalismButton[] = [
    {
        variant: 'primary',
        minimalism: 'round',
    },
    {
        variant: 'transparent',
        minimalism: 'round',
    },
    {
        variant: 'clear',
        minimalism: 'round',
    },
    {
        variant: 'primary',
        minimalism: 'square',
    },
    {
        variant: 'transparent',
        minimalism: 'square',
    },
    {
        variant: 'clear',
        minimalism: 'square',
    },
]