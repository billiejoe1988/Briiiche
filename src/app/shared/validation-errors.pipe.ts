import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl} from '@angular/forms';

@Pipe({
  name: 'validationErrors'
})
export class ValidationErrorsPipe implements PipeTransform {

  transform(control?: AbstractControl | null, ...args: unknown[]): unknown {

    if (typeof control!== 'undefined' && !!control) {
      if (control.hasError('email')) return 'Invalid Email';
      if (control.hasError('required')) return 'Complete this Field';
    }

    return null;
  }
}
