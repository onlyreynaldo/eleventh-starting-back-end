import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const { email, password } = request.body;

  const sessionUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await sessionUser.execute({ email, password });

  delete user.password;

  return response.json({ user, token });
});

export default usersRouter;
