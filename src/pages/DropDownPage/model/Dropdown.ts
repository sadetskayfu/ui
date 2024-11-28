import { DropdownClosingVariant, DropdownPositionVariant } from "@/shared/ui/Dropdown"

interface Option {
    value: string
    label: string
}

interface PositionMenuVariant{
    value: DropdownPositionVariant
    label: string
}

interface ClosingMenuVariant {
    value: DropdownClosingVariant
    label: string
}

export const options: Option[] = [
    {
        value: '1',
        label: 'Option 1'
    },
    {
        value: '2',
        label: 'Option 2'
    },
    {
        value: '3',
        label: 'Option 3'
    },
    {
        value: '4',
        label: 'Option 4'
    },
    {
        value: '5',
        label: 'Option 5'
    },
    {
        value: '6',
        label: 'Option 6'
    },
]

export const positionMenuVariants: PositionMenuVariant[] = [
    {
        value: 'column',
        label: 'Column',
    },
    {
        value: 'row',
        label: 'Row',
    },
]

export const closingMenuVariants: ClosingMenuVariant[] = [
    {
        value: 'mousedown',
        label: 'Mousedown'
    },
    {
        value: 'mousemove',
        label: 'Mousemove',
    }
]