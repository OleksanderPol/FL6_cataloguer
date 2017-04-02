import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'searchPipe'})

export class SearchPipe implements PipeTransform {
  transform(value: any, exponent: string) {
    return value.filter(item => {
        return item.name.toUpperCase().indexOf(exponent.toUpperCase()) !== -1; 
    })
  }
}

@Pipe({name: 'searchUserPipe'})

export class SearchUserPipe implements PipeTransform {
  transform(value: any, exponent: string) {
    return value.filter(item => {
        return item.username.toUpperCase().indexOf(exponent.toUpperCase()) !== -1; 
    })
  }
}