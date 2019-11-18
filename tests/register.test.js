const chai = require('chai');
const {
    validateGmail,
    validatePassword
} = require('../services/register.service');

const {
    expect
} = chai;

describe('register service', () => {
    it('should not valid wrong gmail format', () => {
        const gmail1 = '^$$gadaâ_-1219-*82@gmai.com.';
        const gmail2 = '^gada1 21982@gmai.com';
        const gmail3 = '^gada121982@@gmai.com';
        const gmail4 = 'gada@gmail..com';
        const gmail5 = 'gadagmail';
        const gmail6 = '';

        expect(validateGmail(gmail1)).not.equal(true);
        expect(validateGmail(gmail2)).not.equal(true);
        expect(validateGmail(gmail3)).not.equal(true);
        expect(validateGmail(gmail4)).not.equal(true);
        expect(validateGmail(gmail5)).not.equal(true);
        expect(validateGmail(gmail6)).not.equal(true);
    });
    it('should not valid with length of password less than 8 and empty', () => {
        expect(validatePassword('')).equal(false);
        expect(validatePassword('1234567')).equal(false);
        expect(validatePassword('12345678')).equal(true);
    });
});