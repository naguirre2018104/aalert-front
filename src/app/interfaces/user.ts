export interface User {
    date?: Date,
    status?: boolean,
    name?: String,
    lastname?: String,
    age?: Number,
    place?: Object,
    lastdate?: Date,
    sex?: String,
    image?: String,
    user?: string,
    departament?: string,
    description?: {
        tez?: String,
        complexion?: String,
        hair?: String,
        special_signs?: String,
    },
    showAlert?: boolean
}

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

export interface UserLogged {
    _id?: string;
    name?: string;
    lastname?: string;
    username?: string;
    password?: string;
    phone?: number;
}