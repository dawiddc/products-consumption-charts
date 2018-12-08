import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

export interface Product {
  name: string;
  unit: string;
  valuesPerYear: { [year: number]: number };
}

@Injectable()
export class ProductDataService {

  productUrl = 'http://localhost:8080/products';

  constructor(private httpClient: HttpClient) {
  }

  getProductData() {
    return this.httpClient.get<Product[]>(this.productUrl);
  }

}
