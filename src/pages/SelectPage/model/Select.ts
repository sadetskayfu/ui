import { Option } from "@/shared/ui/Select";
import { SelectLabelVariant as LabelVariant, SelectVariant as Variant } from "@/shared/ui/Select";

export const options: Option[] = [
    { value: '1', label: "The Shawshank Redemption" },
    { value: '2', label: "The Godfather" },
    { value: '3', label: "The Dark Knight" },
    { value: '4', label: "Pulp Fiction" },
    { value: '5', label: "The Lord of the Rings: The Return of the King" },
    { value: '6', label: "Forrest Gump" },
    { value: '7', label: "Inception" },
    { value: '8', label: "Fight Club" },
    { value: '9', label: "The Matrix" },
    { value: '10', label: "Goodfellas" },
    { value: '11', label: "The Empire Strikes Back" },
    { value: '12', label: "Interstellar" },
    { value: '13', label: "One Flew Over the Cuckoo's Nest" },
    { value: '14', label: "Seven Samurai" },
    { value: '15', label: "City of God" },
    { value: '16', label: "The Silence of the Lambs" },
    { value: '17', label: "It's a Wonderful Life" },
    { value: '18', label: "Life Is Beautiful" },
    { value: '19', label: "The Usual Suspects" },
    { value: '20', label: "Se7en" },
]

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
