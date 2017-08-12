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
  allCoins:Array<any> = [];
  myCoins:Array<any> = [];
  constructor(public navCtrl: NavController, private dataService:DataService) {
    this.getCoins();
  }
    getCoins(){
      this.dataService.getCoins()
        .subscribe((coinInfo) => {
          this.allCoins = coinInfo;
        });
      }
      /*
    getCoinPrice(){
      let data: Array<any>;
      for (var coin of Object.keys(this.searchedCoin)) {
        this.dataService.getCoinPrice(coin)
          .subscribe((coinsPrice) => {
              data = coinsPrice;
              this.coins.push(data);
              console.log(this.coins);
        })
      }
    }
    */
    getCoinPrice(){
      this.dataService.getCoinPrice(
        this.searchedCoin = this.searchedCoin.toUpperCase())
        .subscribe((coinsPrice) => {
            this.coins = [];
            this.coins.push(coinsPrice);
      })
    }

    addCoin(){
      let haveCoin: boolean = false;
      this.myCoins.forEach(element => {
        if (element == this.searchedCoin){
          haveCoin = true;
        }
      });
      if(haveCoin == false){
        this.myCoins.push(this.searchedCoin);
      }
    }

}
