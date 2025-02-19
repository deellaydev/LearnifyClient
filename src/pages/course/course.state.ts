import {makeAutoObservable, runInAction} from "mobx";
import {baseRequest} from "../../services/api-service.ts";
import {authStore} from "../../stores/auth-store/auth.store.ts";

// Интерфейсы для описания структуры курса
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

export interface Course {
    name: string;
    steps: CourseStep[];
}

export interface UserCourse {
    userId: string;
    courseId: string;
    progress: string;
}

class CourseStore {
    course: Course | null = null;
    userProgress: UserCourse | null = null;
    loading: boolean = false;
    error: string | null = null;
    courseId: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    updateChildStatus(stepIndex: number, childIndex: number, newStatus: string): void {
        if (!this.course) return;

        if (
            this.course.steps[stepIndex] &&
            this.course.steps[stepIndex].children[childIndex]
        ) {
            this.course.steps[stepIndex].children[childIndex].status = newStatus;
        }
        console.log([stepIndex, childIndex])
        if (this.userProgress?.progress) {
            this.userProgress.progress = [stepIndex, childIndex].join(',')
        }
    }

    setCourse(course: Course) {
        this.course = course;
    }

    setCourseId(courseId: string) {
        this.courseId = courseId;
    }

    async fetchCourseById() {
        this.loading = true;
        this.error = null;
        if (!this.courseId) return;
        try {
            const response = await baseRequest.get<Course>(`/courses/${this.courseId}`);
            runInAction(() => {
                this.course = response;
                this.loading = false;
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message || "Ошибка при загрузке курса";
                this.loading = false;
            });
        }
    }

    async fetchUserProgress() {
        this.loading = true;
        this.error = null;
        //@ts-ignore
        if (!authStore.user.id || !this.courseId) return;
        try {
            const response = await baseRequest.post<any,UserCourse>(
                "/courses/get-or-create",
                { userId: authStore.user?.id, courseId: this.courseId },
            );
            runInAction(() => {
                this.userProgress = response;
                this.loading = false;
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message || "Ошибка при загрузке прогресса пользователя";
                this.loading = false;
            });
        }
    }

    async saveProgress() {
        try {
            const response = await baseRequest.put<any,UserCourse>(
                "/courses/update-progress",
                { userId: authStore.user?.id, courseId: this.courseId, progress: this.userProgress?.progress },
            );
            runInAction(() => {
                this.userProgress = response;
                this.loading = false;
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message || "Ошибка при загрузке прогресса пользователя";
                this.loading = false;
            });
        }
    }
}

export const courseStore = new CourseStore();