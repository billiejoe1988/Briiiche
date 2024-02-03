import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullNamePipe',
})
export class FullNamePipe implements PipeTransform {
  transform(value: { firstName: string; lastName: string }): string {
    if (!value) {
      return '';
    }

    return `${value.lastName} ${value.firstName}`;
  }
}
