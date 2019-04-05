export interface Roles {
    empresas?: boolean;
    admin?: boolean;
  }
  
  export interface UserInterface {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    colegiado?: string;
    localidad?: string;
    telefono?: number;
    cif?: number;
    roles: Roles;
  }