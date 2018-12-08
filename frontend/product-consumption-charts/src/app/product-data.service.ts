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

  getProductData() {
    return this.httpClient.get<Groups>(this.productUrl);
  }

}
