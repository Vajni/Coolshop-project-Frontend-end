import {PipeTransform, Pipe} from "@angular/core";
import { Log } from "./log";
/**
 * Created by vajni on 2017.09.05..
 */

@Pipe({
  name: 'logFilterByOrderId'
})
export class LogFilterPipeOrderId implements PipeTransform {

  transform(value: Log[], filterBy: string): Log[] {
    filterBy = filterBy ? filterBy.toLowerCase() : null;
    return filterBy ? value.filter((log: Log) =>
      log.orderId.toString().indexOf(filterBy) !== -1) : value;
  }
}