
export class User {
    id: string;
    password: string;
    email: string;
    token?: string;
    dataCreate: number;
    dataUpdate?: number;

    constructor(obj?: any) {
        this.id = obj && obj.id;
        this.password = obj && obj.password;
        this.email = obj && obj.email;
    };
}