import { makeAutoObservable } from 'mobx';

export interface AlertType {
    id: number;
    message: string;
    type?: "warning" | "success" | "info" | "error"
}

class AlertStore {
    alerts: AlertType[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addAlert(message: string, type: "warning" | "success" | "info" | "error" = 'info'): void {
        const id = Date.now();
        this.alerts.push({ id, message, type });
        setTimeout(() => this.removeAlert(id), 5000); // Удаляем алерт через 5 секунд
    }

    removeAlert(id: number): void {
        this.alerts = this.alerts.filter((alert) => alert.id !== id);
    }
}

export const alertStore = new AlertStore();
