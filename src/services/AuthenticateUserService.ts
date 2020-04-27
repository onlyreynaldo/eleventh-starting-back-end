import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/Users';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const paswordMatched = await compare(password, user.password);

    if (!paswordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    const token = sign({}, 'afec2611bc76ca443ba4e627c1065d06', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
