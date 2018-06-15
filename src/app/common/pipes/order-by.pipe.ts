import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: any, args?: any): any {
    return _.orderBy(array, [args[0]], [args[1] ? args[1] : 'asc']);
  }
}
