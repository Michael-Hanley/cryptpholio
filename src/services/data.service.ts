import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {
  private coinList = 'https://www.cryptocompare.com/api/data/coinlist/';
  private coinPrice= 'https://min-api.cryptocompare.com/data/price?fsym=';
  private marketCap = 'https://coinmarketcap-nexuist.rhcloud.com/api/';
  constructor( private http: Http ) { }
  getCoins(): Observable<any> {
    return this.http.get(this.coinList)
      .map(this.extractData)
      .catch(this.handleError)
  }
  getCoinPrice(coin:string): Observable<any> {
    let returnTypes = '&tsyms=BTC,USD,EUR,ETH';
    let queryString = this.coinPrice+coin+returnTypes;
    return this.http.get(queryString)
      .map(this.extractJsonData)
      .catch(this.handleError)
  }
  getCoinMarketCap(coin:string): Observable<any> {
    console.log(coin);
    let queryString = this.marketCap+coin+"/market_cap";
    return this.http.get(queryString)
      .map(this.extractJsonData)
      .catch(this.handleError)
  }
  private extractJsonData(res:Response) {
    let body = res.json();
    return body || { };
  }
  private extractData(res: Response) {
    let body = res.json();
    return body.Data || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
