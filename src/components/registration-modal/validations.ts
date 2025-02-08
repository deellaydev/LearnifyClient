import { Rule } from "antd/es/form";

export const passwordValidation: Rule[] = [
    { required: true, message: 'Пароль обязателен' },
    { min: 6, message: 'Пароль должен содержать минимум 6 символов' },
    { max: 18, message: 'Пароль не должен превышать 18 символов' },
];

export  const confirmPasswordValidation: Rule[] = [
    { required: true, message: 'Подтверждение пароля обязательно' },
    { min: 6, message: 'Подтверждение пароля должно содержать минимум 6 символов' },
    { max: 18, message: 'Подтверждение пароля не должно превышать 18 символов' },
    ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || value === getFieldValue('password')) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('Пароли не совпадают'));
        },
    }),
];

export  const emailValidation: Rule[] = [
    { required: true, message: 'Почта обязательна' },
    {
        type: 'email',
        message: 'Введите корректный адрес электронной почты',
    },
];