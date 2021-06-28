import { Role } from '@modules/roles/models/roles.model';

export interface JwtPayload {
  email: string;
  id: number;
  roles: Role[];
}
