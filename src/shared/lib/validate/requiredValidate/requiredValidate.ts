export const requiredValidate = (value: string | string[]) => {
    const errors = []

    if(value.length <= 0) {
        errors.push(`This field is required`)
    }

    return errors
}