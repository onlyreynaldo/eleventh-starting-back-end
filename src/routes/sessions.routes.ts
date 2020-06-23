import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const sessionUser = new AuthenticateUserService();

    const { user, token } = await sessionUser.execute({ email, password });

    delete user.password;

    return response.json({ user, token });
  } catch (error) {
    return response.status(error.statusCode).json({ error: error.message });
  }
});

export default usersRouter;
