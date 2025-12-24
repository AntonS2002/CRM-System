
interface ResultValidation {
    errorMessage: string;
    isValid: boolean;
}

export const validateTextInput = (text: string): ResultValidation => {
    if(text.trim().length == 0) {
        return {errorMessage: 'Введите название задачи', isValid: false};
    } else if(text.trim().length < 2) {
        return {errorMessage: 'Не менее 2 символов', isValid: false};
    }else if(text.trim().length > 64) {
        return {errorMessage: 'Не более 64 символа', isValid: false};
    } else {
        return {errorMessage: '' , isValid: true};
    }
}