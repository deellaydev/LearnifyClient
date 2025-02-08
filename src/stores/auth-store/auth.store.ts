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
        this.user = user;
    }
}

export const authStore = new AuthStore();