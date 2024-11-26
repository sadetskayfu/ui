import { Option } from "@/shared/ui/Select";
import { SelectLabelVariant as LabelVariant, SelectVariant as Variant } from "@/shared/ui/Select";

export const options: Record<string, Option> = {
    '10:30': { value: '10:30', label: '10:30'},
    '11:00': { value: '11:00', label: '11:00'},
    '11:30': { value: '11:30', label: '11:30'},
    '12:00': { value: '12:00', label: '12:00'},
    '12:30': { value: '12:30', label: '12:30'},
    '13:00': { value: '13:00', label: '13:00'},
    '13:30': { value: '13:30', label: '13:30'},
    '14:00': { value: '14:00', label: '14:00'},
    '14:30': { value: '14:30', label: '14:30'},
    '15:30': { value: '15:30', label: '15:30'},
}

interface SelectLabelVariant {
    value: LabelVariant
    label: string
}

interface SelectVariant {
    value: Variant
    label: string
}

export const selectLabelVariants: SelectLabelVariant[] = [
    {
        value: 'visible',
        label: 'Visible',
    },
    {
        value: 'hidden',
        label: 'Hidden'
    }
]

export const selectVariants: SelectVariant[] = [
    {
        value: 'filled',
        label: 'Filled'
    },
    {
        value: 'outlined',
        label: 'Outlined'
    }
]
