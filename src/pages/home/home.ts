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
  searchedCoin: string = '';
  constructor(public navCtrl: NavController, private dataService:DataService) {
   this.getCoinPrice();
  }
    getCoins(){
      this.dataService.getCoins()
        .subscribe((coinInfo) => {
          //this.getCoinPrice(coinInfo);
          this.coins = coinInfo;
        });
      }
    getCoinPrice(){
      let data: Array<any>;
      for (var coin of Object.keys(this.searchedCoin)) {
        this.dataService.getCoinPrice(coin)
          .subscribe((coinsPrice) => {
              data = coinsPrice;
              this.coins.push(data);
              console.log(data);
        })
      }
    }
}
