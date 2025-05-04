import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppService } from 'src/app.service';
import { importJWK, jwtVerify } from 'jose';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly appService: AppService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;  
    try {

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Authorization token missing');
      }
  
      const key = await this.appService.fetchKeyfromRedis()
      if(!key){
        throw new UnauthorizedException('Invalid or expired token');
      }
      const parsedKey = JSON.parse(key as string);
      const publicKey = await importJWK(parsedKey, 'RS256');
  
      const token = authHeader.split(' ')[1];
  
      const { payload } = await jwtVerify(token, publicKey, { algorithms: ['RS256'] });

      if(payload){
        next
      }
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}