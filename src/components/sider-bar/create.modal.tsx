import React from 'react';
import { Modal, Form, Input, Button, DatePicker, InputNumber } from 'antd';
import moment from 'moment';

export interface StepContent {
    description: string;
    duration: string;
    __html: string;
}

export interface StepChild {
    title: string;
    content: StepContent;
    status: string;
}

export interface CourseStep {
    title: string;
    children: StepChild[];
}

export interface CourseFormValues {
    name: string;
    author: string;
    category: string;
    endDate: string; // в формате DD-MM-YYYY
    rating: number;
    steps: CourseStep[];
}

interface CreateCourseModalProps {
    visible: boolean;
    onCancel: () => void;
    onCreate: (values: CourseFormValues) => void;
}

const CreateCourseModal: React.FC<CreateCourseModalProps> = ({ visible, onCancel, onCreate }) => {
    const [form] = Form.useForm<CourseFormValues>();

    const handleOk = async () => {
        try {
            // Валидируем поля формы
            const values = await form.validateFields();
            // Приводим дату к нужному формату
            values.endDate = moment(values.endDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
            onCreate(values);
            form.resetFields();
        } catch (error) {
            console.error('Ошибка валидации формы:', error);
        }
    };

    return (
        <Modal
            visible={visible}
            title="Создать курс"
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            onOk={handleOk}
            width={800}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Название курса"
                    rules={[{ required: true, message: 'Введите название курса' }]}
                >
                    <Input placeholder="Название курса" />
                </Form.Item>
                <Form.Item
                    name="author"
                    label="Автор"
                    rules={[{ required: true, message: 'Введите автора курса' }]}
                >
                    <Input placeholder="Автор курса" />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Категория"
                    rules={[{ required: true, message: 'Введите категорию курса' }]}
                >
                    <Input placeholder="Категория курса" />
                </Form.Item>
                <Form.Item
                    name="endDate"
                    label="Срок окончания"
                    rules={[{ required: true, message: 'Выберите срок окончания курса' }]}
                >
                    <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="rating"
                    label="Рейтинг"
                    rules={[{ required: true, message: 'Введите рейтинг курса' }]}
                >
                    <InputNumber min={0} max={5} step={0.1} style={{ width: '100%' }} />
                </Form.Item>

                {/* Динамическое добавление шагов курса */}
                <Form.List name="steps">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field, index) => (
                                <div
                                    key={field.key}
                                    style={{ border: '1px dashed #ccc', padding: '16px', marginBottom: '16px' }}
                                >
                                    <Form.Item
                                        {...field}
                                        label={`Шаг ${index + 1} - Название`}
                                        name={[field.name, 'title']}
                                        fieldKey={[field.fieldKey, 'title']}
                                        rules={[{ required: true, message: 'Введите название шага' }]}
                                    >
                                        <Input placeholder="Название шага" />
                                    </Form.Item>

                                    {/* Вложенный список для добавления элементов (children) шага */}
                                    <Form.List name={[field.name, 'children']}>
                                        {(childFields, { add: addChild, remove: removeChild }) => (
                                            <>
                                                {childFields.map((childField, childIndex) => (
                                                    <div
                                                        key={childField.key}
                                                        style={{
                                                            marginLeft: '16px',
                                                            border: '1px solid #ddd',
                                                            padding: '8px',
                                                            marginBottom: '8px',
                                                        }}
                                                    >
                                                        <Form.Item
                                                            {...childField}
                                                            label={`Элемент ${childIndex + 1} - Заголовок`}
                                                            name={[childField.name, 'title']}
                                                            fieldKey={[childField.fieldKey, 'title']}
                                                            rules={[{ required: true, message: 'Введите заголовок элемента' }]}
                                                        >
                                                            <Input placeholder="Заголовок элемента" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...childField}
                                                            label="Описание"
                                                            name={[childField.name, 'content', 'description']}
                                                            fieldKey={[childField.fieldKey, 'content', 'description']}
                                                            rules={[{ required: true, message: 'Введите описание' }]}
                                                        >
                                                            <Input.TextArea placeholder="Описание" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...childField}
                                                            label="Длительность"
                                                            name={[childField.name, 'content', 'duration']}
                                                            fieldKey={[childField.fieldKey, 'content', 'duration']}
                                                            rules={[{ required: true, message: 'Введите длительность' }]}
                                                        >
                                                            <Input placeholder="Длительность" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...childField}
                                                            label="HTML контент"
                                                            name={[childField.name, 'content', '__html']}
                                                            fieldKey={[childField.fieldKey, 'content', '__html']}
                                                        >
                                                            <Input.TextArea placeholder="HTML контент (опционально)" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...childField}
                                                            label="Статус"
                                                            name={[childField.name, 'status']}
                                                            fieldKey={[childField.fieldKey, 'status']}
                                                            rules={[{ required: true, message: 'Введите статус' }]}
                                                        >
                                                            <Input placeholder="Статус" />
                                                        </Form.Item>
                                                        <Button type="link" onClick={() => removeChild(childField.name)}>
                                                            Удалить элемент
                                                        </Button>
                                                    </div>
                                                ))}
                                                <Form.Item>
                                                    <Button type="dashed" onClick={() => addChild()} block>
                                                        Добавить элемент
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                    <Button type="link" onClick={() => remove(field.name)}>
                                        Удалить шаг
                                    </Button>
                                </div>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block>
                                    Добавить шаг
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </Modal>
    );
};

export default CreateCourseModal;
