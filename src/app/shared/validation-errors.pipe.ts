import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validationErrors'
})
export class ValidationErrorsPipe implements PipeTransform {

  transform(errors?: ValidationErrors | null, ...args: unknown[]): unknown {
     if (!!errors) {
      let messages = [];

      if (errors['required']) messages.push('Complete this Field');
      if (errors['email'])  messages.push('Its not the valid format');
      if (errors['maxLength']) messages.push(`Max ${errors['maxLength']?.requiredLength} characters`);
      if (errors['minLength']) messages.push(`Min ${errors['minLength']?.requiredLength} characters`);

      return messages.join('. ') + '.';
    }
    return null;
  }
}
