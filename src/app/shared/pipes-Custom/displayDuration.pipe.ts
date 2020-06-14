import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'DisplayDurationPipe',
})
export class DisplayDurationPipe implements PipeTransform {
  transform(value: number, splitChar: string): string {
    let numberString = value.toFixed(2).toString().split(splitChar);
    return `${numberString[0]} hrs ${numberString[1]} mins`;
  }
}
