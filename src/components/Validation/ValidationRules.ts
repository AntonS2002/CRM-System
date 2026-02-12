import type {Rule} from "antd/es/form";

const rulesNumber = {
    min: 2,
    max: 64
}

export const validationRules: Rule[] = [
        {
            required: true,
            message: 'Введите название задачи!'
        },
        {
            whitespace: true,
            message: 'Введите название задачи!'
        },
        {
            min: rulesNumber.min,
            message: 'Минимум 2 символа'
        },
        {
            max: rulesNumber.max,
            message: 'Максимум 64 символа'
        },
    ]
