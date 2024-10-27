import { patterns } from "@/shared/constans/patterns"

export const emailValidate = (value: string) => {
    const errors: string[] = []

    if(value.length < 1) {
        errors.push('Email is required')
    }

    if(!patterns.email.test(value)) {
        errors.push('This email is not valid')
    }

    return errors
}