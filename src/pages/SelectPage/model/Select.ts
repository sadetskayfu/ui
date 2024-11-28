import { Option } from "@/shared/ui/Select";
import { SelectLabelVariant as LabelVariant, SelectVariant as Variant } from "@/shared/ui/Select";

export const options: Record<string, Option> = {
    '1': { value: '1', label: 'Belonging To The Apocolypse'},
    '2': { value: '2', label: 'Hunted By My Dreams'},
    '3': { value: '3', label: 'Praise The Maze'},
    '4': { value: '4', label: 'Mending The Demons'},
    '5': { value: '5', label: 'Songs Of The Future'},
    '6': { value: '6', label: 'Breaking The Titans'},
    '7': { value: '7', label: 'Answering My Destiny'},
    '8': { value: '8', label: 'Praise'},
    '9': { value: '9', label: 'Killer'},
    '10': { value: '10', label: 'Answering My Destiny adn Y'},
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
