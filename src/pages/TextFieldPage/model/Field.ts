import {FieldLabelVariant as LabelVariant} from '@/shared/ui/Field'

interface FieldLabelVariant {
    value: LabelVariant
    label: string
}

export const fieldLabelVariants: FieldLabelVariant[] = [
    {
        value: 'jump',
        label: 'Jump',
    },
    {
        value: 'static',
        label: 'Static'
    }
]