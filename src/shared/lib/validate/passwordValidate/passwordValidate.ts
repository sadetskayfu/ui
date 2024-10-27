import { patterns } from "@/shared/constans/patterns"

export const passwordValidate = (password: string, confirmedPassword: string | undefined = undefined) => {
    const errors: string[] = []

    if(password.length < 1) {
        errors.push('Password is required')
    }

    if(password.length < 10) {
        errors.push('The password is too small')
    }

    if(!patterns.password.test(password)) {
        errors.push('The password must contain at least 1 special character')
    }

    if(confirmedPassword) {
        if(password !== confirmedPassword) {
            errors.push("Passwords don't match")
        }
    }

    return errors
}