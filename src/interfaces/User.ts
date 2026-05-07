/** Espejo del UserDTO del backend */
export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  propietario_id?: string;
  personal_id?: string;
}
