import styles from './sign-in.module.css'
import {Button, DatePicker, Input} from "antd";
import classNames from "classnames";
import {sharedState, SignInVertical} from "../../stores/shared-store/shared.state.ts";
import {sharedController} from "../../stores/shared-store/shared.controller.ts";
import {observer} from "mobx-react-lite";

export const SignIn = observer(() => {

    const handleChangeVertical = (vertical: SignInVertical) => {
        sharedController.setSignInVertical(vertical)
    }

    return (
        <div className={styles.wrapper}>
            <div className={classNames(styles.studentWrapper, {
                [styles.activeVertical]: sharedState.signInVertical === 'student'
            })}>
                {sharedState.signInVertical === 'student' ? null : <Button onClick={() => handleChangeVertical('student')}>Хочу учиться!</Button>}
                {sharedState.signInVertical === 'student' ? (
                    <div className={styles.fromWrapper}>
                        <Input placeholder={'Имя'}/>
                        <Input placeholder={'Фамилия'}/>
                        <Input placeholder={'Отчество'}/>
                        <Input placeholder={'Учебное заведение'}/>
                        <Input placeholder={'Класс/Курс'}/>
                        <DatePicker placeholder={'Дата рождения'}/>
                        <Button type={'primary'}>Регистрация</Button>
                    </div>
                ) : null}
            </div>
            <div className={classNames(styles.teacherWrapper, {
                [styles.activeVertical]: sharedState.signInVertical === 'teacher'
            })}>
                {sharedState.signInVertical === 'teacher' ? null : <Button type={'primary'} onClick={() => handleChangeVertical('teacher')}>Хочу учить!</Button>}
                {sharedState.signInVertical === 'teacher' ? (
                    <div className={styles.fromWrapper}>
                        <Input placeholder={'Имя'}/>
                        <Input placeholder={'Фамилия'}/>
                        <Input placeholder={'Отчество'}/>
                        <Input placeholder={'Образование'}/>
                        <Input placeholder={'Квалификция'}/>
                        <DatePicker placeholder={'Дата рождения'}/>
                        <Button type={'primary'}>Регистрация</Button>
                    </div>
                ) : null}
            </div>
        </div>
    )
})