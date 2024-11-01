interface Country {
    id: string
    label: string
    phone: string
}

export const countries: Record<string, Country> = {
    'BY': {
        id: 'BY', label: 'Belarus', phone: '375'
    },
    'RU': {
        id: 'RU', label: 'Russian Federation', phone: '7'
    },
    'US': {
        id: 'US', label: 'United States', phone: '1'
    },
    'AD': {
        id: 'AD', label: 'Andorra', phone: '376'
    },
    'AF': {
        id: 'AF', label: 'Afghanistan', phone: '93'
    },
    'AG': {
        id: 'AG', label: 'Antigua and Barbuda', phone: '1-268'
    },
    'AM': {
        id: 'AM', label: 'Armenia', phone: '374'
    },
    'BO': {
        id: 'BO', label: 'Bolivia', phone: '591'
    },
    'CU': {
        id: 'CU', label: 'Cuba', phone: '53'
    }
}
