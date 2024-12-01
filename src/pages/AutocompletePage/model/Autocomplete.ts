import { Option } from "@/shared/ui/Autocomplete"

interface Country {
    value: string
    label: string
    phone: string
}

export const countries: Record<string, Country> = {
    'BY': {
        value: 'BY', label: 'Belarus', phone: '375'
    },
    'RU': {
        value: 'RU', label: 'Russian Federation', phone: '7'
    },
    'US': {
        value: 'US', label: 'United States', phone: '1'
    },
    'AD': {
        value: 'AD', label: 'Andorra', phone: '376'
    },
    'AF': {
        value: 'AF', label: 'Afghanistan', phone: '93'
    },
    'AG': {
        value: 'AG', label: 'Antigua and Barbuda', phone: '1-268'
    },
    'AM': {
        value: 'AM', label: 'Armenia', phone: '374'
    },
    'BO': {
        value: 'BO', label: 'Bolivia', phone: '591'
    },
    'CU': {
        value: 'CU', label: 'Cuba', phone: '53'
    }
}

export const options: Option[] = [
    { value: '1', label: '12 Belonging To The Apocolypse'},
    { value: '2', label: '3 Hunted By My Dreams'},
    { value: '3', label: '5 Praise The Maze'},
    { value: '4', label: 'Mending The Demons'},
    { value: '5', label: 'Songs Of The Future'},
    { value: '6', label: 'Breaking The Titans'},
    { value: '7', label: 'Answering My Destiny'},
    { value: '8', label: 'Praise'},
    { value: '9', label: 'Killer'},
    { value: '10', label: 'Answering My Destiny adn Y'},
]


