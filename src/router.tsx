import {createBrowserRouter} from "react-router-dom";
import {LayoutComponent} from "./components/layout";
import {MainPage} from "./pages/main";
import {CoursesList} from "./pages/courses-list";
import {CoursePage} from "./pages/course";
import {SignIn} from "./pages/sign-in";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutComponent/>,
        children: [
            {path: '/', element: <MainPage/>},
            {path: 'courses', element: <CoursesList/>},
            {path: 'course/:id', element: <CoursePage/>},
            {path: 'sign-in', element: <SignIn />},
        ],
    }
])
