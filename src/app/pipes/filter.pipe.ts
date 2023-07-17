import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: Array<any>, ...args: any[]): any {
    const filterString: string = args[0];
    const propertyName: string = args[1];

    if (
      value.length === 0 ||
      filterString.length === 0 ||
      propertyName.length === 0
    )
      return value;

    value.filter((item) => item[propertyName] === filterString);
    return value;
  }
}
