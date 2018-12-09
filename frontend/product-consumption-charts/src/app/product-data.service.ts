import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

export interface Product {
  name: string;
  valuesPerYear: { [year: number]: number };
}

export interface Groups {
  groups: { [unit: string]: Product[] };
}


@Injectable()
export class ProductDataService {

  productUrl = 'http://localhost:8080/products';

  constructor(private httpClient: HttpClient) {
  }

  getProductData(groups: string[] = ['szt.', 'kg']) {
    return this.httpClient.post<Groups>(this.productUrl, groups);
  }

}
