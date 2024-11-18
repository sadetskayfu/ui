import { IconFillVariant as variant, IconSize as size, IconColor as color } from "@/shared/ui/Icon"

interface IconVariant {
    value: variant
    label: string
}

interface IconSize {
    value: size
    label: string
}

interface IconColor {
    value: color
    label: string
}

export const iconFillVariants: IconVariant[] = [
    {
        value: 'filled',
        label: 'Filled'
    },
    {
        value: 'outlined',
        label: 'Outlined'
    }
]

export const iconSizes: IconSize[] = [
    {
        value: 'small',
        label: 'Small'
    },
    {
        value: 'medium',
        label: 'Medium'
    },
    {
        value: 'large',
        label: 'Large'
    }
]

export const iconColors: IconColor[] = [
    {
        value: 'primary',
        label: 'Primary'
    },
    {
        value: 'secondary',
        label: 'Secondary'
    }
]