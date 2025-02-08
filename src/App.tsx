import {RouterProvider} from "react-router-dom";
import {router} from "./router.tsx";
import './app.css'
import './assets/font/fonts.css'
import {ConfigProvider} from "antd";

function App() {
    return <ConfigProvider theme={{
        components: {
            Button: {
                colorPrimary: '#248045',
                colorPrimaryHover: '#21723e',
                colorPrimaryActive: '#1c6536',
                colorBgContainer: '#1e1f22',
                colorBorder: 'none',
                colorPrimaryBorder: 'none',
            },
            Input: {
                colorBorder: '#1e1f22',
                colorBgContainer: '#1e1f22',
                colorText: '#dbdee1',
                colorTextPlaceholder: 'rgba(219,222,225,0.51)',
            },
            DatePicker: {
                addonBg: '#1e1f22',
                colorBgContainer: '#1e1f22',
                colorBgElevated: '#1e1f22',
                colorBorder: '#1e1f22',
                colorText: '#dbdee1',
                colorTextPlaceholder: '#dbdee1',
                colorBgBase: '#1e1f22'
            },
            Modal: {
                contentBg: '#313338',
                footerBg: '#313338',
                headerBg: '#313338',
                titleColor: '#dbdee1',
            },
            Alert: {
                colorErrorBg: '#313338',
            },
            Form: {
                labelColor: '#dbdee1'
            },
            Steps: {
                colorText: '#dbdee1',
                colorTextDescription: '#dbdee1',
            },
            Checkbox: {
                colorBgContainer: '#1e1f22',
                colorBorder: '#1e1f22'
            },
            InputNumber: {
                colorBgContainer: '#1e1f22',
                colorBorder: '#1e1f22',
                colorText: '#dbdee1',
                colorTextPlaceholder: 'rgba(219,222,225,0.5)',
                handleBg: '#1e1f22',
                handleBorderColor: '#1c6536',
            }
        },
        token: {}
    }}><RouterProvider router={router}/></ConfigProvider>
}

export default App
