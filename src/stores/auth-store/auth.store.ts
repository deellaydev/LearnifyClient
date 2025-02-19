import {makeAutoObservable} from "mobx";

export interface UserType {
    id: string;
    birthDay: string;
    email: string;
    firstname: string;
    secondname: string;
    surname: string;
    nickname: string;
}

export class AuthStore {
    user: UserType | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    setUser(user: UserType | null): void {
        if (user && ('workExperience' in user) && user.workExperience && typeof user.workExperience === 'string') {
            this.user = {
                ...user,
                workExperience: user.workExperience.split(';').map((el) => {
                    const [w, e] = el.split('/');
                    return {
                        workPlace: w,
                        experience: e
                    }
                })
            }
        } else {
            this.user = user;
        }
    }
}

export const authStore = new AuthStore();