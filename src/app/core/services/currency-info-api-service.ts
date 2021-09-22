import {Injectable} from "@angular/core";
import {HttpBackend, HttpClient} from "@angular/common/http";

@Injectable({providedIn: `root`})

export class CurrencyInfoApiService {
  private httpClient: HttpClient

  constructor(handler: HttpBackend) {
    this.httpClient = new HttpClient(handler)
  }

  urlAddress: string = 'http://api.exchangeratesapi.io/v1/latest?access_key=6ad942ce3abac5d14a21235d48f68e2a&symbols=USD,PLN&format=1'

  getCurrencyInfoFromApi() {
    return this.httpClient.get(this.urlAddress);
  }

}
