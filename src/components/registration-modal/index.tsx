import {useState} from 'react';
import {Modal, Form, Input, Button, DatePicker, Checkbox, Steps, InputNumber} from 'antd';
import type {CheckboxChangeEvent} from 'antd/es/checkbox';
import moment from 'moment';
import {sharedState} from "../../stores/shared-store/shared.state.ts";
import {observer} from "mobx-react-lite";
import {authController} from "../../stores/auth-store/auth.controller.ts";

const {Step} = Steps;

interface WorkExperience {
    workPlace: string;
    experience: number;
}

export type RegistrationFormValues = {
    firstName: string;
    lastName: string;
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthDay: moment.Moment;
} & ({
    notWorked: true;
    workExperience: [];
} | {
    notWorked: false;
    workExperience: WorkExperience[];
})

interface RegistrationModalProps {
    visible: boolean;
    onCancel: () => void;
}

export const RegistrationModal = observer(({visible, onCancel}: RegistrationModalProps) => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [form] = Form.useForm<RegistrationFormValues>();
    const [workDisabled, setWorkDisabled] = useState<boolean>(false);

    const next = (): void => {
        form.validateFields().then(() => {
            setCurrentStep(currentStep + 1);
        });
    };

    const prev = (): void => {
        setCurrentStep(currentStep - 1);
    };

    const onCheckboxChange = (e: CheckboxChangeEvent): void => {
        const checked = e.target.checked;
        setWorkDisabled(checked);

        if (checked) {
            form.setFieldsValue({workExperience: []});
        }
    };

    const onFinish = (values: RegistrationFormValues): void => {
        authController.registration(values);
    };

    const handleClose = (): void => {
        form.resetFields();
        setCurrentStep(0);
        setWorkDisabled(false);
        onCancel();
    };

    const firstStep = (
        <>
            <Form.Item
                name="firstname"
                label="Имя"
                required={false}
                rules={[
                    {required: true, message: 'Введите имя'},
                    {max: 32, message: 'Максимум 32 символа'},
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="surname"
                label="Фамилия"
                required={false}
                rules={[
                    {required: true, message: 'Введите фамилию'},
                    {max: 32, message: 'Максимум 32 символа'},
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="nickname"
                label="Никнейм"
                required={false}
                rules={[
                    {required: true, message: 'Введите никнейм'},
                    {max: 32, message: 'Максимум 32 символа'},
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="email"
                label="EMail"
                required={false}
                rules={[
                    {required: true, message: 'Введите email'},
                    {type: 'email', message: 'Некорректный email'},
                    {max: 32, message: 'Максимум 32 символа'},
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="password"
                label="Пароль"
                required={false}
                rules={[
                    {required: true, message: 'Введите пароль'},
                    {min: 6, message: 'Минимум 6 символов'},
                    {max: 18, message: 'Максимум 18 символов'},
                ]}
                hasFeedback
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                label="Подтверждение пароля"
                required={false}
                dependencies={['password']}
                hasFeedback
                rules={[
                    {required: true, message: 'Подтвердите пароль'},
                    {min: 6, message: 'Минимум 6 символов'},
                    {max: 18, message: 'Максимум 18 символов'},
                    ({getFieldValue}) => ({
                        validator(_: unknown, value: string): Promise<void> {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Пароли не совпадают'));
                        },
                    }),
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                name="birthDay"
                label="Дата рождения"
                required={false}
                rules={[
                    {required: true, message: 'Выберите дату рождения'},
                ]}
            >
                <DatePicker style={{width: '100%'}} placeholder={''}/>
            </Form.Item>
        </>
    );

    const secondStep = (
        <>
            <Form.Item name="notWorked" valuePropName="checked" initialValue={false}>
                <Checkbox onChange={onCheckboxChange} >Не работал(а)</Checkbox>
            </Form.Item>
            {!workDisabled && (
                <Form.List name="workExperience">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}) => (
                                <div key={key} style={{display: 'flex', marginBottom: 8}}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'workPlace']}
                                        rules={[
                                            {required: true, message: 'Введите место работы'},
                                            {max: 18, message: 'Максимум 18 символов'},
                                        ]}
                                        style={{flex: 2, marginRight: 8}}
                                    >
                                        <Input placeholder="Место работы"/>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'experience']}
                                        rules={[
                                            {required: true, message: 'Введите стаж'},
                                        ]}
                                        style={{flex: 1, marginRight: 8}}
                                    >
                                        <InputNumber placeholder="Стаж" style={{width: '100%'}}/>
                                    </Form.Item>
                                    <Button type="link" onClick={() => remove(name)}>
                                        Удалить
                                    </Button>
                                </div>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block>
                                    Добавить место работы
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            )}
            {workDisabled && (
                <Form.Item>
                    <span>Поля опыта работы отключены, так как выбран пункт "Не работал".</span>
                </Form.Item>
            )}
        </>
    );

    return (
        <Modal open={visible} title="Регистрация" onCancel={handleClose} footer={null}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                {sharedState.signInVertical === 'teacher' ? (
                    <>
                        <Steps progressDot current={currentStep} style={{marginBottom: 24}}>
                            <Step title="Шаг 1"/>
                            <Step title="Шаг 2"/>
                        </Steps>

                        <div style={{display: currentStep === 0 ? 'block' : 'none'}}>
                            {firstStep}
                        </div>
                        <div style={{display: currentStep === 1 ? 'block' : 'none'}}>
                            {secondStep}
                        </div>
                        <Form.Item>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                {currentStep > 0 && (
                                    <Button style={{margin: '0 8px'}} onClick={prev}>
                                        Назад
                                    </Button>
                                )}
                                {currentStep < 1 && (
                                    <Button type="primary" onClick={next} style={{width:'100%'}}>
                                        Далее
                                    </Button>
                                )}
                                {currentStep === 1 && (
                                    <Button type="primary" htmlType="submit">
                                        Зарегистрироваться
                                    </Button>
                                )}
                            </div>
                        </Form.Item>
                    </>
                ) : (
                    <>
                        {firstStep}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{width:'100%'}}>
                                Зарегистрироваться
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form>
        </Modal>
    );
});
