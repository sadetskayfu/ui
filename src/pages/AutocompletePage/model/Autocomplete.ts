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
