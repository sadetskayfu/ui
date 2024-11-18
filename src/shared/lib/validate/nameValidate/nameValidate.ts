export const nameValidate = (value: string, title: string) => {
    const errors = []

    if(value.length === 1) {
        errors.push(`${title} is is too short`)
    }

    return errors
}