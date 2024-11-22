import {FieldLabelVariant as LabelVariant, FieldVariant as Variant} from '@/shared/ui/Field'

interface FieldLabelVariant {
    value: LabelVariant
    label: string
}

interface FieldVariant {
    value: Variant
    label: string
}

export const fieldLabelVariants: FieldLabelVariant[] = [
    {
        value: 'visible',
        label: 'Visible',
    },
    {
        value: 'hidden',
        label: 'Hidden'
    }
]

export const fieldVariants: FieldVariant[] = [
    {
        value: 'filled',
        label: 'Filled'
    },
    {
        value: 'outlined',
        label: 'Outlined'
    }
]
