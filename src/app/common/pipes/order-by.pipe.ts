import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: any, args?: any): any {
    const args0 = _.split(args[0], ',');
    const args1 = _.split(args[1], ',');
    return _.orderBy(array, args0, args1 ? args1 : ['asc']);
  }
}
