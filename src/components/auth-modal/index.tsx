import {Button, Checkbox, Form, Input, Modal} from "antd";
import {useState} from "react";
import {authController} from "../../stores/auth-store/auth.controller.ts";
import {observer} from "mobx-react-lite";
import {emailValidation, passwordValidation} from "../registration-modal/validations.ts";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal = observer((props: Props) => {
    const {isOpen, onClose} = props;

    const onFinish = ({email, password, asMentor}: {email: string, password: string, asMentor: boolean}) => {
        authController.login({email, password, asMentor}, () => handleClose(asMentor))
    }

    const handleClose = (asMentor: boolean) => {
        if (asMentor) {

        }
        onClose()
    }

    return (
        <Modal title="Войти:" open={isOpen} onCancel={handleClose} closable destroyOnClose footer={null}>
            <Form
                name="register"
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ remember: true }}
                style={{ maxWidth: 400, margin: 'auto' }}
            >
                <Form.Item label="Почта" name="email" required={false} rules={emailValidation}>
                    <Input />
                </Form.Item>

                <Form.Item label="Пароль" name="password" required={false} rules={passwordValidation}>
                    <Input.Password />
                </Form.Item>

                <Form.Item name="asMentor" valuePropName="checked" initialValue={false}>
                    <Checkbox >Войти как ментор</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Вход
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
})
