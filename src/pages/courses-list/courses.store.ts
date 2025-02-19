import {makeAutoObservable} from "mobx";
import {baseRequest} from "../../services/api-service.ts";

export interface CourseSummary {
    id: string;
    name: string;
    author: string;
    category: string;
    endDate: string; // Формат "DD-MM-YYYY"
    rating: number;
}

class CoursesStore {
    courses: CourseSummary[] = [];
    userCourses: { id: string; name: string }[] = [];
    loading: boolean = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchCourses() {
        this.loading = true;
        this.error = null;
        try {
            const response = await baseRequest.get<CourseSummary[]>('http://localhost:4200/courses/summary');
            this.courses = response;
        } catch (err: any) {
            this.error = err.message || 'Ошибка при загрузке курсов';
        } finally {
            this.loading = false;
        }
    }

    //@ts-ignore
    async fetchCoursesByUser(userId: string): Promise<CourseSummary[]> {
        try {
            const response = await baseRequest.get<{ id: string; name: string }[]>(`courses/by-user/${userId}`);
            this.userCourses = response;
        } catch (err: any) {
            this.error = err.message || 'Ошибка при загрузке курсов';
        } finally {
            this.loading = false;
        }

    }
}

export const coursesStore = new CoursesStore();