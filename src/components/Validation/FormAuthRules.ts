import type {Rule} from "antd/es/form";

const usernameRules = {
    min: 1,
    max: 60,
}

const loginRules = {
    min: 2,
    max: 60
}

const passwordRules = {
    min: 6,
    max: 60
}

const emailRules = {
    min: 2,
    max: 60
}


export const usernameTextAuthRules: Rule[] = [
    {
        required: true,
        message: "Поле не должно быть пустым",
    },
    {
        whitespace: true,
        message: 'Введите имя пользователя!'
    },
    {
        min: usernameRules.min,
        message: `Минимум ${usernameRules.min} символа`,
    },
    {
        max: usernameRules.max,
        message: `Максимум ${usernameRules.max} символа`,
    },
    {
        pattern: /^[a-zA-Zа-яА-ЯёЁ0-9\s]+$/,
        message: 'Имя может содержать только буквы, цифры и пробелы'
    }
]

export const loginTextAuthRules: Rule[] = [
    {
        required: true,
        message: 'Поле не должно быть пустым',
    },
    {
        whitespace: true,
        message: 'Введите логин!'
    },
    {
        min: loginRules.min,
        message: `Минимум ${loginRules.min} символов`,
    },
    {
        max: loginRules.max,
        message: `Максимум ${loginRules.max} символов`,
    },
    {
        pattern: /^[a-zA-Zа-яА-ЯёЁ]+$/,
        message: 'Только буквы! Без цифр, пробелов и символов.'
    }
]

export const passwordTextAuthRules: Rule[] = [
    {
        required: true,
        message: "Поле не должно быть пустым",
    },
    {
        whitespace: true,
        message: 'Введите название задачи!'
    },
    {
        min: passwordRules.min,
        message: `Минимум ${passwordRules.min} символов`,
    },
    {
        max: passwordRules.max,
        message: `Максимум ${passwordRules.max} символов`,
    }
]

export const emailTextAuthRules: Rule[] = [
    {
        required: true,
        message: "Поле не должно быть пустым",
    },
    {
        whitespace: true,
        message: 'Введите название задачи!'
    },
    {
        min: emailRules.min,
        message: "Минимум 2 символа"
    },
    {
        max: emailRules.max,
        message: `Максимум ${emailRules.max} символов`
    }
]

export const phoneTextAuthRules: Rule[] = [
    {
        required: false,

    },
    {
        max: 10,
        message: 'Введите 10 цифр номера',
    },
    {
        pattern: /^\+7\d{10}$/,
        message: 'Введите номер в формате: +79998887766'
    }
]


