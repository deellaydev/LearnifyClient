import {authStore, AuthStore, UserType} from "./auth.store.ts";
import {baseRequest} from "../../services/api-service.ts";
import {alertStore} from "../../components/alerts/alerts.store.ts";
import {RegistrationFormValues} from "../../components/registration-modal";
import {sharedState, SharedState} from "../shared-store/shared.state.ts";
import moment from "moment";
import {coursesStore} from "../../pages/courses-list/courses.store.ts";

export class AuthController {
    authStore!: AuthStore;
    sharedStore!: SharedState;

    constructor(authStore: AuthStore, sharedStore: SharedState) {
        this.authStore = authStore;
        this.sharedStore = sharedStore;
    }

    login(payload: {email: string, password: string, asMentor: boolean}, cb?: () => void) {
        baseRequest.post<any, {token: string; user: UserType}>('/auth/login', payload).then(({user, token}) => {
            this.authStore.setUser(user);
            window.localStorage.setItem("authToken", JSON.stringify(token));
            window.localStorage.setItem("user", JSON.stringify(user));
            coursesStore.fetchCoursesByUser(user.id)
            cb && cb();
        }).catch((err: {code: number, message: string}) => {
            alertStore.addAlert('Неверный логин или пароль', 'error')
        });
    }

    registration(payload: RegistrationFormValues, cb?: () => void) {
        const regData = {
            ...payload,
            birthDay: moment(payload.birthDate).format('DD-MM-YYYY'),
            isMentor: this.sharedStore.signInVertical === 'teacher',
        }
        console.log(regData)

        baseRequest.post<any, {token: string; user: UserType}>('/auth/registration', regData).then(({user, token}) => {

        })
    }
}

export const authController = new AuthController(authStore, sharedState);