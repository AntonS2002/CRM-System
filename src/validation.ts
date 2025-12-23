
interface ResultValidation {
    value: string;
    isValid: boolean;
}

export const Validation = (text: string): ResultValidation => {
    if(text.trim().length == 0) {
        return {value: 'Введите название задачи', isValid: false};
    } else if(text.trim().length < 2) {
        return {value: 'Не менее 2 символов', isValid: false};
    }else if(text.trim().length > 64) {
        return {value: 'Не более 64 символа', isValid: false};
    } else {
        return {value: '' , isValid: true};
    }
}