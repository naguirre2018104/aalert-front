export interface CreateAlert {
  _id?: string;
  date?: Date;
  status?: boolean;
  name?: string;
  lastname?: string;
  age?: number;
  place?: {
    location?: {
      lat?: number,
      lng?: number
    },
    formatted_address?: string
  };
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
  showAlert?: boolean;
}

export interface Alert {
  _id?: string;
  date?: Date;
  status?: boolean;
  name?: string;
  lastname?: string;
  age?: number;
  place?: {
    location?: {
      lat?: number,
      lng?: number
    },
    formatted_address?: string
  };
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
  showAlert?: boolean;
}

export interface Notification{
  app_id: string;
  included_segments: [string,string];
  contents: {
    en: string,
    es?: string
  };
  headings: {
    en: string,
    es?: string
  };
}
