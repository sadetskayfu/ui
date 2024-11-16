import { CustomLinkDirection, CustomLinkMinimalismVariant, CustomLinkSize, CustomLinkVariant } from "@/shared/ui/CustomLink"

interface ActiveLink {
    direction: CustomLinkDirection
    variant: CustomLinkVariant
}

export const linkVariants: CustomLinkVariant[] = [
    'filled', 'outlined', 'clear', 'standart', 'text'
]

export const minimalismLinkVariants: CustomLinkMinimalismVariant[] = [
    'round', 'square'
]

export const linkSizes: CustomLinkSize[] = [
    'small', 'medium', 'large'
]

export const activeHorizontalLinks: ActiveLink[] = [
    {
        direction: 'horizontal',
        variant: 'clear',
    },
    {
        direction: 'horizontal',
        variant: 'standart',
    },
]

export const activeVerticalLinks: ActiveLink[] = [
    {
        direction: 'vertical',
        variant: 'clear',
    },
    {
        direction: 'vertical',
        variant: 'standart',
    },
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