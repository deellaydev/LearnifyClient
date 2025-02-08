import styles from './index.module.css'
import {Badge, Button, Divider} from "antd";
import classNames from "classnames";
import {useEffect, useLayoutEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {courseStore} from "./course.state.ts";
import {useParams} from "react-router-dom";
import {authStore} from "../../stores/auth-store/auth.store.ts";

const statusColorDispatcher = {
    'success': '#248045',
    'inProgress': '#92a5ef',
}

export const CoursePage = observer(() => {
    const [currentStep, setCurrentStep] = useState<number[]>([0, 0]);
    const [lessonPassed, setlessonPassed] = useState<boolean>(false);
    const params = useParams();

    useLayoutEffect(() => {
        courseStore.fetchCourseById();
        courseStore.fetchUserProgress();
    }, []);

    useEffect(() => {
        courseStore.setCourseId(params.id)
        courseStore.fetchCourseById();
        courseStore.fetchUserProgress();
    }, [params, authStore.user]);

    // useEffect(() => {
    //     if (courseStore.userProgress?.progress) {
    //         setCurrentStep(courseStore.userProgress?.progress.split(',').map(Number))
    //     }
    // }, [courseStore.userProgress?.progress]);

    useEffect(() => {
        if (courseStore.userProgress?.progress && courseStore.course) {
            const [step, child] = courseStore.userProgress.progress.split(',').map(Number);
            for (let i = 0; i <= step; i++) {
                const currentStepPointLength = courseStore.course.steps[i].children.length - 1;
                for (let y = 0; y <= child; y++) {
                    if (y === child && i === step) {
                        courseStore.updateChildStatus(i, y, 'inProgress');
                    } else {
                        courseStore.updateChildStatus(i, y, 'success');
                    }
                }
            }
        }
    }, [courseStore.userProgress?.progress]);

    useEffect(() => {
        if (!courseStore.course) return;
        console.log(currentStep)
        if (courseStore.course.steps[currentStep[0]].children[currentStep[1]].status !== 'success') {
            courseStore.updateChildStatus(currentStep[0], currentStep[1], 'inProgress')
        }

    }, [currentStep]);

    const handleNextStep = () => {
        if (!courseStore.course) return
        const stepsLength = courseStore.course.steps.length
        const currentStepPointLength = courseStore.course.steps[currentStep[0]].children.length - 1;

        setCurrentStep((prev) => {
            courseStore.updateChildStatus(prev[0], prev[1], 'success')
            if (prev[1] === currentStepPointLength) {
                if (prev[0] + 1 === stepsLength) {
                    setlessonPassed(true);

                    return [0,0]
                }
                return [prev[0] + 1, 0]

            }
            return [prev[0], prev[1] + 1];
        })
    }

    if (courseStore.loading) return <div>Загрузка...</div>;
    if (courseStore.error) return <div>Ошибка: {courseStore.error}</div>;
    if (!courseStore.course) return <div>Курс не найден</div>;

    return <div className={styles.courseWrapper}>
        <div className={styles.courseSidebar}>
            <h3 className={styles.sidebarName}>{courseStore.course.name}</h3>
            <Divider/>
            {courseStore.course.steps.map((step, i) => {
                return (
                    <div className={classNames(styles.sidebarItem, {
                        [styles.sidebarItemSuccess]: step.children.every((_) => _.status === 'success'),
                        [styles.sidebarItemInProgress]: step.children.some((_) => _.status === 'inProgress')
                    })}>
                        <p className={styles.sidebarStep}>Шаг {i + 1}: {step.title}</p>
                        {step.children.map((item, y) => {
                            //@ts-ignore
                            const badgeColor = statusColorDispatcher?.[item.status] ?? ''

                            return (
                                <div className={styles.sidebarChildren} onClick={() => item.status !== 'disabled' && setCurrentStep([i, y])}>
                                    <div style={{display: 'flex', gap: '8px'}}>
                                        <Badge color={badgeColor}/>
                                        <p>{i + 1}.{y + 1}: {item.title}</p>
                                    </div>
                                    <span>{item.content.duration}</span>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
        <div className={styles.courseContent} >
            <div dangerouslySetInnerHTML={{__html: courseStore.course.steps[currentStep[0]].children[currentStep[1]].content.__html}} />
            <div className={styles.courseContentFooter}>
                <Button disabled={lessonPassed} size={'large'} type={'primary'} style={{width: '300px'}} onClick={handleNextStep}>Далее</Button>
            </div>
        </div>
    </div>
})