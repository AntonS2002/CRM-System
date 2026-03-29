import type {Rule} from "antd/es/form";
const textTaskRules = {
    min: 2,
    max: 64
}

export const textTaskValidationRules: Rule[] =
   [
        {
            required: true,
            message: 'Введите название задачи!'
        },
        {
            whitespace: true,
            message: 'Введите название задачи!'
        },
        {
            min: textTaskRules.min,
            message: 'Минимум 2 символа'
        },
        {
            max: textTaskRules.max,
            message: 'Максимум 64 символа'
        },
    ]
