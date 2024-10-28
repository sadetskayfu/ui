import { CustomLinkDirection, CustomLinkMinimalismVariant, CustomLinkSize, CustomLinkVariant } from "@/shared/ui/CustomLink"

interface MinimalismLink {
    variant: CustomLinkVariant
    minimalism: CustomLinkMinimalismVariant
}

interface LinkSize {
    size: CustomLinkSize
    minimalism: CustomLinkMinimalismVariant
}

interface ActiveLink {
    direction: CustomLinkDirection
    variant: CustomLinkVariant
}

export const linkVariants: CustomLinkVariant[] = [
    'primary', 'transparent', 'clear', 'classic', 'text'
]

export const minimalismLinkVariants: MinimalismLink[] = [
    {
        variant: 'primary',
        minimalism: 'round'
    },
    {
        variant: 'transparent',
        minimalism: 'round'
    },
    {
        variant: 'clear',
        minimalism: 'round'
    },
    {
        variant: 'classic',
        minimalism: 'round'
    },
    {
        variant: 'primary',
        minimalism: 'square'
    },
    {
        variant: 'transparent',
        minimalism: 'square'
    },
    {
        variant: 'clear',
        minimalism: 'square'
    },
    {
        variant: 'classic',
        minimalism: 'square'
    },
]

export const linkSizes: LinkSize[] = [
    {
        size: 'small',
        minimalism: 'none'
    },
    {
        size: 'medium',
        minimalism: 'none'
    },
    {
        size: 'large',
        minimalism: 'none'
    },
    {
        size: 'small',
        minimalism: 'round'
    },
    {
        size: 'medium',
        minimalism: 'round'
    },
    {
        size: 'large',
        minimalism: 'round'
    },
    {
        size: 'small',
        minimalism: 'square'
    },
    {
        size: 'medium',
        minimalism: 'square'
    },
    {
        size: 'large',
        minimalism: 'square'
    },
]

export const activeHorizontalLinks: ActiveLink[] = [
    {
        direction: 'horizontal',
        variant: 'clear',
    },
    {
        direction: 'horizontal',
        variant: 'classic',
    },
]

export const activeVerticalLinks: ActiveLink[] = [
    {
        direction: 'vertical',
        variant: 'clear',
    },
    {
        direction: 'vertical',
        variant: 'classic',
    },
]