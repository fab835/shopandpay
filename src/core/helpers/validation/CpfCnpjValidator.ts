export interface ICpfCnpjValidator {
    validate(cpfCnpj: string): string | Error
}

export class CpfCnpjValidator implements ICpfCnpjValidator {

    constructor(

    ) {
    }

    private validateCPF = (cpfCnpj: string): boolean => {

        if(cpfCnpj == '') return false;

        if (cpfCnpj.length != 11 ||
        cpfCnpj == "00000000000" ||
        cpfCnpj == "11111111111" ||
        cpfCnpj == "22222222222" ||
        cpfCnpj == "33333333333" ||
        cpfCnpj == "44444444444" ||
        cpfCnpj == "55555555555" ||
        cpfCnpj == "66666666666" ||
        cpfCnpj == "77777777777" ||
        cpfCnpj == "88888888888" ||
        cpfCnpj == "99999999999"
        ) {
        return false
        }

        // valid first digit
        let add = 0
        for (let i = 0; i < 9; i ++)
        add += parseInt(cpfCnpj.charAt(i)) * (10 - i)
        let rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpfCnpj.charAt(9)))
            return false

        // Valid second digit
        add = 0;
        for (let i = 0; i < 10; i ++)
        add += parseInt(cpfCnpj.charAt(i)) * (11 - i)
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
        rev = 0;
        if (rev != parseInt(cpfCnpj.charAt(10)))
        return false

        return true
    }

    private validateCNPJ = (cpfCnpj: string): boolean => {

        if(cpfCnpj == '') return false;

        if (cpfCnpj.length != 14)
            return false;

        // Remove invalid known cpfCnpjs
        if (cpfCnpj == "00000000000000" ||
            cpfCnpj == "11111111111111" ||
            cpfCnpj == "22222222222222" ||
            cpfCnpj == "33333333333333" ||
            cpfCnpj == "44444444444444" ||
            cpfCnpj == "55555555555555" ||
            cpfCnpj == "66666666666666" ||
            cpfCnpj == "77777777777777" ||
            cpfCnpj == "88888888888888" ||
            cpfCnpj == "99999999999999")
            return false;

        let length = cpfCnpj.length - 2
        let numbers = cpfCnpj.substring(0, length)
        let digits = cpfCnpj.substring(length)
        let sum: any = 0;
        let pos = length - 7
        for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--
        if (pos < 2)
            pos = 9;
        }

        let result = sum % 11 < 2 ? 0 : 11 - sum % 11
        if (result != parseInt(digits.charAt(0)))
        return false

        length = length + 1
        numbers = cpfCnpj.substring(0, length)
        sum = 0
        pos = length - 7
        for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--
        if (pos < 2)
            pos = 9
        }

        result = sum % 11 < 2 ? 0 : 11 - sum % 11
        if (result != parseInt(digits.charAt(1)))
        return false

        return true
    }

    public validate = (cpfCnpj: string): string | Error  => {
        cpfCnpj = cpfCnpj.replace(/[^\d]+/g,'');
        if ( !(this.validateCPF(cpfCnpj) || this.validateCNPJ(cpfCnpj)) ) return new Error('Incorrect cpf or cnpj')

        return cpfCnpj
    }
}
