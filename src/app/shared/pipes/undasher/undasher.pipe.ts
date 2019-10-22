import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'undasher'
})
export class UndasherPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!value) {
      return '';
    }

    return value.replace(/-/g, ' ');
  }
}
