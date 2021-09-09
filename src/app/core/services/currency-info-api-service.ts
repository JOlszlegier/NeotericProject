import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CurrencyInfoService} from "./currency-info-service";

@Injectable({providedIn: `root`})

export class CurrencyInfoApiService {
  constructor(private http: HttpClient, private currencyInfo: CurrencyInfoService) {
  }


  getCurrencyInfoFromApi() {
    this.http.get('http://api.exchangeratesapi.io/v1/latest?access_key=6ad942ce3abac5d14a21235d48f68e2a&symbols=USD,PLN&format=1')
      .subscribe(responseData => {
        this.currencyInfo.euroOnChange(Object.values(responseData)[4].PLN);
        this.currencyInfo.dollarOnChange(Object.values(responseData)[4].PLN / Object.values(responseData)[4].USD);
      })
  }

}
