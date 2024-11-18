import { ChipVariant } from "@/shared/ui/Chip";
import { ChipSize } from "@/shared/ui/Chip/ui/Chip";

interface chipVariant {
    value: ChipVariant
    label: string
}

interface chipSize {
    value: ChipSize
    label: string
}

export const chipVariants: chipVariant[] = [
    {
        value: 'filled',
        label: 'Filled'
    },
    {
        value: 'outlined',
        label: 'Outlined'
    }
]

export const chipSizes: chipSize[] = [
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