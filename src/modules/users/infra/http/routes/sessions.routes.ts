import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const sessionUser = new AuthenticateUserService();

  const { user, token } = await sessionUser.execute({ email, password });

  delete user.password;

  return response.json({ user, token });
});

export default usersRouter;
