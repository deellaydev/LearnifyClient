import {makeAutoObservable} from "mobx";
import {CourseItem} from "../../components/course-item";
import {additionalCourseItems2} from "./courses-list.mock.ts";

export type SignInVertical = 'student' | 'teacher'

export class SharedState {
    isOpenSidebar = false;
    coursesInput = '';

    courses: CourseItem[] = additionalCourseItems2;

    signInVertical: SignInVertical = 'student';

    constructor() {
        makeAutoObservable(this);
    }

    setIsOpenSidebar(isOpenSidebar: boolean) {
        this.isOpenSidebar = isOpenSidebar;
    }

    setCoursesInput = (coursesInput: string) => {
        this.coursesInput = coursesInput;
    }

    setSignInVertical(vertical: SignInVertical) {
        this.signInVertical = vertical;
    }

    get filteredCourses() {
        return this.courses.filter((item ) => item.name.includes(this.coursesInput));
    }
}

export const sharedState = new SharedState();