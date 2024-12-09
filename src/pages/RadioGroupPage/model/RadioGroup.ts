import { RadioSize, RadioVariant as Variant} from "@/shared/ui/Radio"

interface RadioVariant {
    value: Variant
    label: string
}

export const radioSizes: RadioSize[] = [
    'small', 'medium'
]

export const radioVariants: RadioVariant[] = [
    {
        value: 'filled',
        label: 'Filled'
    },
    {
        value: 'outlined',
        label: 'Outlined'
    }
]

