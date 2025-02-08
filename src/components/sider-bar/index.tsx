import {Avatar, Button} from "antd";
import {sharedController} from "../../stores/shared-store/shared.controller.ts";
import {observer} from "mobx-react-lite";
import styles from './index.module.css'
import {FullscreenExitOutlined, FullscreenOutlined, LoginOutlined, LogoutOutlined} from "@ant-design/icons";
import {sharedState} from "../../stores/shared-store/shared.state.ts";
import classNames from "classnames";
import {useNavigate} from "react-router-dom";
import {AuthModal} from "../auth-modal";
import {useState} from "react";
import {authStore, AuthStore} from "../../stores/auth-store/auth.store.ts";
import {coursesStore} from "../../pages/courses-list/courses.store.ts";
import {courseStore} from "../../pages/course/course.state.ts";
import CreateCourseModal from "./create.modal.tsx";

export const SideBar = observer(() => {
    const navigate = useNavigate();
    const [isOpenCreate, setIsOpenCreate] = useState(false);

    const handleButtonClick = () => {
        sharedController.toggleSidebar()
    }

    const handleAddNewCourse = () => {
        //@ts-ignore
        if (isUserAuth && !authStore.user.workExperience) {
            navigate("/courses");
            return;
        } else {
            setIsOpenCreate(true)
        }
    }

    const handleLogout = () => {
        authStore.setUser(null);
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
    }

    const isOpened = sharedState.isOpenSidebar
    const isUserAuth = !!authStore.user;

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={classNames(styles.sidebarHeader, {[styles.sidebarContentOpened]: isOpened})}>
                {isUserAuth ? <div><Avatar>{authStore.user?.nickname}</Avatar></div> :
                    <Button type={'text'} onClick={() => setIsOpen(true)}><LoginOutlined/>{isOpened ? 'Войти' : null}
                    </Button>}
            </div>

            <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)}/>

            <div className={classNames(styles.sidebarContent, {[styles.sidebarContentOpened]: isOpened})}>
                {isUserAuth ? (<>{coursesStore.userCourses.map((_, i) => <div onClick={() => {
                    courseStore.setCourseId(_.id)
                    navigate(`/course/${_.id}`)
                }}><span key={i} className={styles.circle}/>
                </div>)}
                    <div><span onClick={handleAddNewCourse} className={styles.circle}><p>+</p></span></div>
                </>) : <div><span onClick={handleAddNewCourse} className={styles.circle}><p>+</p></span></div>}
            </div>

            <div className={styles.sidebarFooter}>
                <Button type={'text'} onClick={handleButtonClick}>
                    {isOpened ? <FullscreenExitOutlined/> : <FullscreenOutlined/>}{isOpened ? 'Скрыть' : null}
                </Button>
                {isUserAuth ? <Button type={'text'} onClick={handleLogout}><LogoutOutlined/>{isOpened ? 'Выход' : null}
                </Button> : null}
            </div>
            <CreateCourseModal visible={isOpenCreate} onCancel={() => setIsOpenCreate(false)} onCreate={() => {}} />
        </>
    )
})