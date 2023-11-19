import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
  @ApiProperty({ example: 'Dima' })
  username: string;

  @ApiProperty({ example: 'Dima123' })
  password: string;
}

export class LoginUserResponse {
  @ApiProperty({
    example: {
      user: {
        userId: 1,
        username: 'Dima',
        password: 'Dima123',
      },
    },
  })
  user: {
    userId: number;
    username: string;
    password: string;
  };

  @ApiProperty({ example: 'Logged in' })
  msg: string;
}

export class LogoutUserResponse {
  @ApiProperty({ example: 'session has ended' })
  msg: string;
}

export class LoginCheckResponse {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'Dima' })
  username: string;

  @ApiProperty({ example: 'Dima@mail.ru' })
  email: string;
}

export class SignupResponse {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'Dima' })
  username: string;

  @ApiProperty({
    example: '$1$voDM4v1HKhUr2.ATnbOIuHXs13Eg18niK3qJgm2Ba',
  })
  password: string;

  @ApiProperty({ example: 'Dima@mail.ru' })
  email: string;

  @ApiProperty({ example: '2023-11-19T11:17:28.443Z' })
  updatedAt: string;

  @ApiProperty({ example: '2023-11-19T11:17:28.443Z' })
  createdAt: string;
}
