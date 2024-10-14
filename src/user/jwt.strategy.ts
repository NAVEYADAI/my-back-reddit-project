import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from "./user.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
      private userService: UserService,
  ){
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'topSecret51',
      });
}
  
  async validate(user:any) {
    // console.log('in validate func')
    const newUser = await this.userService.getUserByUser(user);
    if (!newUser) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}