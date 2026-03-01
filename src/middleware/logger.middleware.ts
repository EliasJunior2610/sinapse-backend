import { BadRequestException, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new BadRequestException('Token não enviado');
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.SECRET as string);

            req.user = decoded; // injeta usuário na request
            next();
        } catch (error) {
            throw new UnauthorizedException('Token inválido');
        }
    }
}