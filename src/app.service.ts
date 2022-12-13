import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello world are u ready!!!';
  }

  getHomePage(): string {
    return 'Home Page';
  }
}
