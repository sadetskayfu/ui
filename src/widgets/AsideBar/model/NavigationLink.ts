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
        label: 'Menu',
        path: ROUTES.DROPDOWN
    },
    {
        label: 'Pagination',
        path: ROUTES.PAGINATION
    },
    {
        label: 'Stars rating',
        path: ROUTES.STAR_RATING
    },
    {
        label: 'Slider',
        path: ROUTES.SLIDER
    },
    {
        label: 'Accordion',
        path: ROUTES.ACCORDION
    },
    {
        label: 'Backdrop',
        path: ROUTES.BACKDROP
    },
    {
        label: 'Aside menu',
        path: ROUTES.ASIDE_MENU
    },
    {
        label: 'Modal',
        path: ROUTES.MODAL
    },
    {
        label: 'Select',
        path: ROUTES.SELECT
    },
    {
        label: 'Chip',
        path: ROUTES.CHIP
    },
    {
        label: 'Tooltip',
        path: ROUTES.TOOLTIP
    },
]