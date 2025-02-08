import { Alert as AntdAlert } from 'antd';
import ReactDOM from 'react-dom';
import {alertStore, AlertType} from "./alerts.store.ts";
import {observer} from "mobx-react-lite";

export const AlertComponent = observer(() => {
    return ReactDOM.createPortal(
        <div style={{ position: 'fixed', top: 20, right: '12px', zIndex: 9999 }}>
            {alertStore.alerts.map((alert: AlertType) => (
                <AntdAlert
                    key={alert.id}
                    message={alert.message}
                    type={alert.type}
                    showIcon
                    style={{ marginBottom: 16 }}
                />
            ))}
        </div>,
        document.body
    );
});
