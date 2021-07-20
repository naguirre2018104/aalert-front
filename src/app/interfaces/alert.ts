export interface CreateAlert {
  _id?: string;
  date?: Date;
  status?: boolean;
  name?: string;
  lastname?: string;
  age?: number;
  place?: string;
  lastdate?: Date;
  sex?: string;
  image?: string;
  user?: string;
  department?: string;
  description?: {
    tez?: string;
    complexion?: string;
    hair?: string;
    special_signs?: string;
  };
}

export interface Alert {
  _id?: string;
  date?: Date;
  status?: boolean;
  name?: string;
  lastname?: string;
  age?: number;
  place?: string;
  lastdate?: Date;
  sex?: string;
  image?: string;
  user?: string;
  department?: string;
  description?: {
    tez?: string;
    complexion?: string;
    hair?: string;
    special_signs?: string;
  };
}
