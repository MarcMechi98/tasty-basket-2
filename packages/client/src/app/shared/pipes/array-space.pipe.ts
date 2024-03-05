import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arraySpace'
})
export class ArraySpacePipe implements PipeTransform {
  transform(value: string[]): string {
    return value.join(', ');
  }
}
