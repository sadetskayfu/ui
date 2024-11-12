import { ButtonMinimalismVariant, ButtonVariant, ButtonSize as Size } from "@/shared/ui/Button";
import { IconButtonSize, IconButtonVariant } from "@/shared/ui/IconButton";

interface ButtonSize {
    size: Size
    variant: ButtonVariant
    minimalism?: ButtonMinimalismVariant
}

interface MinimalismButton {
    variant: ButtonVariant
    minimalism: ButtonMinimalismVariant
}

export const buttonVariants: ButtonVariant[] = ["primary", "secondary", 'transparent', 'clear']

export const buttonSizes: ButtonSize[] = [
    {
        variant: 'primary',
        size: 'small',
    },
    {
        variant: 'primary',
        size: 'medium',
    },
    {
        variant: 'primary',
        size: 'large',
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
