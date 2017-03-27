import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'searchPipe'})

export class SearchPipe implements PipeTransform {
  transform(value: any, exponent: string) {
    console.log(value, "-", exponent);
    return [{
        amountOfItems: 3,
        name: 'Music'
    }];
  }
}

