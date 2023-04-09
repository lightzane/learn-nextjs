import { StatusEnum } from "../enum/status.enum";

export interface INotificationData {
    status: StatusEnum,
    title: string;
    message: string;
}
