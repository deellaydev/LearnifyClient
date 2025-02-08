import styles from './courses-list.module.css'
import {CourseItem} from "../../components/course-item";
import {observer} from "mobx-react-lite";
import {coursesStore} from "./courses.store.ts";
import {useEffect} from "react";

export const CoursesList = observer(() => {
    useEffect(() => {
        coursesStore.fetchCourses()
    }, [])

    return <div className={styles.wrapper}>
        {coursesStore.courses.map((item, i) => <CourseItem key={i} item={item}/>)}
    </div>
})