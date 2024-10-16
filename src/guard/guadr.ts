import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext) {
    const jwtService = new JwtService();

    const secret = process.env.JWT_SECRET;

    const [req] = context.getArgs();
    const { headers } = req;
    const { jwt } = headers;

    if (!jwt) {
      return false;
    }

    try {
      const verify = await jwtService.verify(jwt, { secret: secret });

      if (verify.login) {
        return true;
      } else {
        throw false;
      }
    } catch (error) {
      throw error;
    }
  }
}
