import { User } from './user.entity';

//export type UpdateUserDto = Partial<Omit<User, 'id'>>
export type UpdateUserPartial = Partial<Omit<User, 'id' | 'salt' | 'likes' | 'posts' | 'response' | 'responseToResponse'>>;

export type SignInType = Pick<User, 'userName'|'password'>

export type SignUpType = Pick<User, 'userName' | 'password' | 'firstName' | 'lastName' | 'adrress' | 'phone' | 'salt'>
