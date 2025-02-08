import styles from './index.module.css'
import {Button} from "antd";
import {CourseItem} from "../../components/course-item";
import {additionalCourseItems, popularCourseItems} from "./courses.mock.ts";
import {sharedState, SignInVertical} from "../../stores/shared-store/shared.state.ts";
import {sharedController} from "../../stores/shared-store/shared.controller.ts";
import {useNavigate} from "react-router-dom";
import {RegistrationModal} from "../../components/registration-modal";
import {useState} from "react";
import {authStore} from "../../stores/auth-store/auth.store.ts";
import {observer} from "mobx-react-lite";

export const MainPage = observer(() => {
    const navigate = useNavigate();
    const [isStudent, setIsStudent] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleChangeVertical = (vertical: SignInVertical) => {
        sharedController.setSignInVertical(vertical)
        setIsOpen(true)
    }

    const handleCloseModal = () => {
        setIsOpen(false);
        setIsStudent(false);
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Учитесь новому каждый день!</h1>
            <h2 className={styles.subTitle}>Присоединяйтесь к нашим тысячам студентов и начните свой путь к новым
                знаниям.</h2>

            {!authStore.user ? (
                <><p className={styles.text}>Чем вы хотите заниматься?</p>
                    <div className={styles.buttons}>
                        <Button onClick={() => handleChangeVertical('student')}>Хочу учиться!</Button>
                        <Button type={'primary'} onClick={() => handleChangeVertical('teacher')}>Хочу учить!</Button>
                    </div>
                </>
            ) : (
                <>
                    <p className={styles.text}>Вы можете найти курс, который бы хотели пройти</p>
                    <div className={styles.buttons}>
                        <Button onClick={() => navigate('/courses')}>Хочу учиться!</Button>
                    </div>
                </>
            )}

            <p className={styles.popularCourses}>Популярные курсы:</p>
            <div className={styles.popularCoursesWrapper}>
                {popularCourseItems.map((item, i) => <CourseItem key={i} item={item}/>)}
            </div>

            <p className={styles.popularCourses}>Продолжите обучение:</p>
            <div className={styles.popularCoursesWrapper}>
                {additionalCourseItems.map((item, i) => <CourseItem key={i} item={item}/>)}
            </div>
            <RegistrationModal visible={isOpen} onCancel={handleCloseModal} />
        </div>
    )
})