export interface UserFormFields {
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  consent: boolean;
}

export interface UserFormErrors {
  lastName?: string;
  firstName?: string;
  phone?: string;
  email?: string;
  consent?: string;
}
