import {makeAutoObservable} from "mobx";
import {sharedState, SharedState, SignInVertical} from "./shared.state.ts";

class SharedController {
    state!: SharedState;

    constructor(state: SharedState) {
        this.state = state;
        makeAutoObservable(this)
    }

    setIsOpenSidebar(isOpenSidebar: boolean) {
        this.state.setIsOpenSidebar(isOpenSidebar);
    }

    toggleSidebar() {
        this.state.setIsOpenSidebar(!this.state.isOpenSidebar);
    }

    setCoursesInput = (coursesInput: string) => {
        this.state.setCoursesInput(coursesInput)
    }

    setSignInVertical(vertical: SignInVertical) {
        this.state.setSignInVertical(vertical)
    }
}

export const sharedController = new SharedController(sharedState);