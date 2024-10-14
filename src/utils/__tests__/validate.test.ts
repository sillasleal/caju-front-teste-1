import { validateCPF } from "../validate";

describe('validate', () => {
    it('should return false if the CPF is invalid', () => {
        expect(validateCPF('123.456.798-09')).toBe(false);
    });

    it('should return false if all numbers are the same', () => {
        expect(validateCPF('000.000.000-00')).toBe(false);
        expect(validateCPF('111.111.111-11')).toBe(false);
        expect(validateCPF('222.222.222-22')).toBe(false);
        expect(validateCPF('333.333.333-33')).toBe(false);
        expect(validateCPF('444.444.444-44')).toBe(false);
        expect(validateCPF('555.555.555-55')).toBe(false);
        expect(validateCPF('666.666.666-66')).toBe(false);
        expect(validateCPF('777.777.777-77')).toBe(false);
        expect(validateCPF('888.888.888-88')).toBe(false);
        expect(validateCPF('999.999.999-99')).toBe(false);
    });

    it('should return true if the CPF is valid', () => {
        expect(validateCPF('265.989.060-91')).toBe(true);
    });
});