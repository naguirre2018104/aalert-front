export interface UserLogin{
    _id?: string;
    username?: string;
    password?: string;
    gettoken?: true;
}

export interface UserRegister {
    name?: string;
    lastname?: string;
    username?: string;
    password?: string;
    age?: number;
    dpi?: string;
    status?: boolean;
    role?: string;
    phone?: number;
}
