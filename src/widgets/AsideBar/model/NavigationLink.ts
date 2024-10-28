import { ROUTES } from "@/shared/constans/routes"

interface NavigationLink {
    label: string
    path: string
}

type NavigationLinks = NavigationLink[]

export const navigationLinks: NavigationLinks = [
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
    }
]