import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  coins:Array<any> = [];
  coinPrices: Array<any> = [];
  errorMessage: string;
  constructor(public navCtrl: NavController, private dataService:DataService) {
    this.getCoins();
  }
    getCoins(){
      this.dataService.getCoins()
        .subscribe((coinInfo) => {
          //this.getCoinPrice(coinInfo);
          this.coins = coinInfo;
        });
      }
    getCoinPrice(coinInfo:any){
      let data: Array<any>;
      for (var coin of Object.keys(coinInfo)) {
        this.dataService.getCoinPrice(coin)
          .subscribe((coinsPrice) => {
              data = coinsPrice;
              this.coinPrices.push(data);
        })
      }
    }
}
