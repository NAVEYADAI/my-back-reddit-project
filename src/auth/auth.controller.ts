import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    @UseGuards(AuthGuard('jwt'))
    @Post('login')
    async login(@Request() req) {
        return req.user;
    }
}