import {PipeTransform, Pipe} from "@angular/core";
import {IProduct} from "./product";
/**
 * Created by vajni on 2017.07.19..
 */

@Pipe({
  name: 'productFilterByType'
})
export class ProductFilterPipeType implements PipeTransform {

  transform(value: IProduct[], filterBy: string): IProduct[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((product: IProduct) =>
      product.productType.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
  }
}