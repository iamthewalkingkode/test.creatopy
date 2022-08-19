export interface Context {
    req: Request;
    res: Response;
    user: User;
}


export interface Auth {
    email: String;
    password: String;
}

export interface User {
    id?: number;
    name: String;
    email: String;
    password: String;
    createdAt: String;
    updatedAt: String;
}

export interface Item {
    id?: number;
    title: String;
    userId: number;
    user: User;
    createdAt: String;
    updatedAt: String;
}

export interface Code {
    id?: number;
    code: String;
    email: String;
    createdAt: String;
    updatedAt: String;
}

export interface Authenticate {
    user: User;
    token: String;
}

export interface GetItems {
    user: User;
}

export interface CreatItem {
    title: String;
    userId: number;
}

export interface Reset {
    code?: String;
    email?: String;
    password?: String;
}

export enum Errors {
    USER_EXISTS = 'USER_EXISTS',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    USER_NOT_AUTHORIZED = 'USER_NOT_AUTHORIZED',
}