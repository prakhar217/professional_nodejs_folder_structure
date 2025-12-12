import { userRepository } from './user.repository';

export const userService = {
  getUsers: () => userRepository.findAll(),

  createUser: (data: any) => userRepository.create(data)
};
