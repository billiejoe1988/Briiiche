import { Pipe, PipeTransform } from '@angular/core';

export interface UserPipe {
  firstName: string;
  lastName: string;
}

@Pipe({
  name: 'fullNamePipe',
})
export class FullNamePipe implements PipeTransform {
  transform(
    value: UserPipe,
    ...args: unknown[]
  ): unknown {

    console.log(args);
    const result = value.lastName + ' ' + value.firstName;

    return result;
  }
}