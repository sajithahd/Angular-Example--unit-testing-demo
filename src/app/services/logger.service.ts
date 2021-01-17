import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {

  constructor() { }

  log(message: any): void {
    console.log(message);
  }
}
