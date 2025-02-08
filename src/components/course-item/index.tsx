import styles from "./index.module.css";
import {useNavigate} from "react-router-dom";
import {courseStore} from "../../pages/course/course.state.ts";

export type CourseItem = {
    id: string;

    name: string;
    description: string;

    author: string;
    category: string;
    endTime: string;
    progress: number;

    rating: string;
}

export const CourseItem = ({item}: { item: CourseItem }) => {
    const {name, id, author, endTime, progress, rating, description, category} = item
    const navigate = useNavigate();

    const handleClick = () => {
        courseStore.setCourseId(item.id)
        navigate(`/course/${id}`);
    }

    return (
        <div className={styles.popularCourseItem} onClick={handleClick}>
            <div className={styles.cardFront}>
                <div className={styles.courseItemImg}/>
                <div className={styles.courseItemInfo}>
                    <p>{name}</p>
                    <span>{description}</span>
                </div>
            </div>
            <div className={styles.cardBack}>
                <div className={styles.courseItemImg}/>
                <div className={styles.courseItemAdditionalInfo}>
                    <div className={styles.additionalInfo}>
                        <p>Автор: {author}</p>
                        <p>Категория: {category}</p>
                        <p>Срок окончания: {endTime}</p>
                        <p>Пройдено: {progress}%</p>
                    </div>
                    <div className={styles.rating}/>
                    <span>Рейтинг: {rating}</span>
                </div>
            </div>
        </div>
    )
}