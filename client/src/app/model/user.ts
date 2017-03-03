
export class User {
    id: string;
    password: string;
    email: string;
    token?: string;
    dataCreate: number;
    dataUpdate?: number;
    status: number; //1 - admin; 0 - user

    constructor(obj?: any) {
        this.id = obj && obj.id;
        this.password = obj && obj.password;
        this.email = obj && obj.email;
    };
}
