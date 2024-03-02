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
      if (errors['maxlength']) messages.push(`Max ${errors['maxlength']?.requiredLength} characters`);
      if (errors['minlength']) messages.push(`Min ${errors['minlength']?.requiredLength} characters`);

      return messages.join('. ') + '.'
    }
    return null;
  }
}
