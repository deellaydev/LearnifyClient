import {Input, Layout} from 'antd';
import styles from './index.module.css'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";
import {sharedState} from "../../stores/shared-store/shared.state.ts";
import {observer} from "mobx-react-lite";
import {SideBar} from "../sider-bar";
import {ChangeEvent, useEffect} from "react";
import {sharedController} from "../../stores/shared-store/shared.controller.ts";
import {AlertComponent} from "../alerts";
import {authStore} from "../../stores/auth-store/auth.store.ts";
import {coursesStore} from "../../pages/courses-list/courses.store.ts";

const {Header, Sider, Content} = Layout;

export const LayoutComponent = observer(() => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const user = window.localStorage.getItem("user");
        console.log(user)
        if (user) {
            authStore.setUser(JSON.parse(user))
            coursesStore.fetchCoursesByUser(authStore.user?.id)
        }
    }, [])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (location.pathname === '/') {
            navigate('courses')
        }
        sharedController.setCoursesInput(e.target.value);
    }

    return (
        <Layout className={styles.layoutStyle}>
            <Sider width={sharedState.isOpenSidebar ? 192 : 72} className={styles.siderStyle}>
                <SideBar/>
            </Sider>
            <Layout>
                <Header className={styles.headerStyle}>
                    <Input value={sharedState.coursesInput} onInput={handleInputChange} addonBefore={<SearchOutlined />} placeholder={'Начнём урок?'} className={styles.headerInput}/>
                    <p onClick={() => navigate('/')} className={styles.logo}>Lernify</p>
                </Header>
                <Content className={styles.contentStyle}>
                    <Outlet/>
                </Content>
            </Layout>
            <AlertComponent />
        </Layout>
    );
})