
export class ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;

    constructor(data: T, message = '', success = true) {
        this.data = data;
        this.message = message;
        this.success = success;
    }
}
