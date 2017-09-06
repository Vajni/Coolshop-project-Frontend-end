import {PipeTransform, Pipe} from "@angular/core";
import { Log } from "./log";
/**
 * Created by vajni on 2017.09.05..
 */

@Pipe({
  name: 'logFilterByOrderDate'
})
export class LogFilterPipeOrderDate implements PipeTransform {

  transform(value: Log[], filterBy: string): Log[] {
    filterBy = filterBy ? filterBy.toLowerCase() : null;
    return filterBy ? value.filter((log: Log) =>
      log.orderDate.toLowerCase().indexOf(filterBy) !== -1) : value;
  }
}