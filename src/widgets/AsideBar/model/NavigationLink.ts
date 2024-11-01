import { ROUTES } from "@/shared/constans/routes"

interface NavigationLink {
    label: string
    path: string
}

export const navigationLinks: NavigationLink[] = [
    {
        label: 'Autocomplete',
        path: ROUTES.AUTOCOMPLETE
    },
    {
        label: 'Text Field',
        path: ROUTES.TEXT_FIELD
    },
    {
        label: 'Switch',
        path: ROUTES.SWITCH
    },
    {
        label: 'Radio Group',
        path: ROUTES.RADIO_GROUP
    },
    {
        label: 'Checkbox',
        path: ROUTES.CHECKBOX
    },
    {
        label: 'Button',
        path: ROUTES.BUTTON
    },
    {
        label: 'Link',
        path: ROUTES.LINK
    },
    {
        label: 'Dropdown',
        path: ROUTES.DROPDOWN
    },
    {
        label: 'Pagination',
        path: ROUTES.PAGINATION
    }
]