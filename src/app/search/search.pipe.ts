import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'searchPipe'})

export class SearchPipe implements PipeTransform {
  transform(value: any, exponent: string) {
    return value.filter(item => {
      console.log(item.name, '-', exponent);
        return item.name.toUpperCase().startsWith(exponent.toUpperCase())
    })
  }
}