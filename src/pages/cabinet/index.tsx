import React from 'react';
import { Form, Input, Checkbox, Button, Space, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {authStore} from "../../stores/auth-store/auth.store.ts";
import {observer} from "mobx-react-lite";
import styles from './index.module.css'
import {baseRequest} from "../../services/api-service.ts";

interface WorkExperience {
    workPlace: string;
    experience: number;
}

interface BaseUserDto {
    firstname: string;
    surname: string;
    nickname: string;
    email: string;
    password: string;
    birthday: string;
    isMentor: boolean;
}

interface MentorDto extends BaseUserDto {
    notWorked: boolean;
    workExperience: WorkExperience[];
}

interface UserInfoFormProps {
    onSubmit: (values: any) => void;
}

export const Cabinet: React.FC<UserInfoFormProps> = observer(({ onSubmit }) => {
    const [form] = Form.useForm();

    const user = authStore.user;

    if (!user) return null;

    console.log(user)

    const initialValues = {
        firstname: user.firstname,
        surname: user.surname,
        nickname: user.nickname,
        email: user.email,
        isMentor: !!(user as MentorDto).workExperience,
        ...(!!(user as MentorDto).workExperience && {
            notWorked: (user as MentorDto).notWorked,
            workExperience: (user as MentorDto).workExperience || [],
        }),
    };

    const onFinish = (values: any) => {

        baseRequest.post('users/update', {
            ...user,
            ...values,
            isMentor: !!(user as MentorDto).workExperience
        }).then(() => {
            window.localStorage.setItem('user', JSON.stringify({
                ...user,
                ...values,
                isMentor: !!(user as MentorDto).workExperience
            }));
        })
    };

    return (
        <Form
            className={styles.wrapper}
            form={form}
            initialValues={initialValues}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item label="Имя" name="firstname">
                <Input />
            </Form.Item>
            <Form.Item label="Фамилия" name="surname">
                <Input />
            </Form.Item>
            <Form.Item label="Никнейм" name="nickname">
                <Input readOnly />
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input readOnly />
            </Form.Item>
{/*//@ts-ignore*/}
            {user.workExperience && (
                <>
                    <Form.Item label="Не работает" name="notWorked" valuePropName="checked">
                        <Checkbox />
                    </Form.Item>

                    <Form.List name="workExperience">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <Space
                                        key={key}
                                        style={{ display: 'flex', marginBottom: 8 }}
                                        align="baseline"
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'workPlace']}
                                            fieldKey={[fieldKey, 'workPlace']}
                                            label="Место работы"
                                            rules={[{ required: true, message: 'Введите место работы' }]}
                                        >
                                            <Input placeholder="Место работы" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'experience']}
                                            fieldKey={[fieldKey, 'experience']}
                                            label="Опыт (в годах)"
                                            rules={[{ required: true, message: 'Введите опыт работы' }]}
                                        >
                                            <InputNumber placeholder="Опыт" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                    >
                                        Добавить опыт работы
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </>
            )}

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Сохранить
                </Button>
            </Form.Item>
        </Form>
    );
});