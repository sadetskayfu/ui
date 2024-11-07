import { RadioSize } from "@/shared/ui/RadioGroup"

export interface Item {
    value: string
    label: string
}

export const items: Item[] = [
    {
        value: '1',
        label: 'One',
    },
    {
        value: '2',
        label: 'Two',
    },
    {
        value: '3',
        label: 'Three'
    }
]

export const radioSizes: RadioSize[] = [
    'small', 'medium'
]

