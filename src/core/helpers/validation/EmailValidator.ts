
export interface IEmailValidator {
    validate(email: string): string | Error
}

export class EmailValidator implements IEmailValidator {

    constructor(
    ) {
    }

    public validate = (email: string): string | Error => {
        if (!email || email.trim().length > 255) {
        return new Error('Email length error')
        }

        const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!regex.test(email)) {
        return new Error('Email format error')
        }

        return email.trim().toLowerCase()
    }
}
