import bcrypt from 'bcryptjs';
import type { TUser } from '../../../frontend/src/features/users/users.types';

const users: Array<TUser> = [
  {
    name: 'Admin User',
    email: 'admin@guitarshop.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Eddie Munson',
    email: 'eddie@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Maxine Mayfield',
    email: 'max@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
