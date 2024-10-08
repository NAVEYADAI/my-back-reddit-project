import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\w))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/, {
    message: 'set password',
  })
  password: string;

  @IsString()
  fName: string;

  @IsString()
  lName: string;

  @IsString()
  address: string;

  @IsString()
  @Matches(/^(\+[0-9]{1,3}[- ]?)?[0-9]{9,10}$/)
  phone: string;
}
