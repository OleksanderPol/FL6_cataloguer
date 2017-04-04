import {FormGroup} from '@angular/forms';

export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Required',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 8 characters long',
            'minlength': `Minimum length ${validatorValue.requiredLength}`,
            'invalidUrl': 'Invalid url address'
        };

        return config[validatorName];
    }


    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static passwordValidator(control) {
        if (control.value.match(/^[a-zA-Z0-9!@#$%^&*]{8,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }
    static urlValidator(control) {
        if (control.value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/) || control.value === ''){
            return null;
        } else {
            return { 'invalidUrl': true}
        }
    }
}

