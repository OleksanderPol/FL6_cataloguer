import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'searchPipe'})

export class SearchPipe implements PipeTransform {
  transform(value: any, exponent: string) {
      console.log(value, "-", exponent);
    return value.filter(item => {
        console.log(item.name.toUpperCase(), "-", item.name.toUpperCase().indexOf(exponent.toUpperCase()));
        return item.name.toUpperCase().indexOf(exponent.toUpperCase()) !== -1
    })
  }
}

