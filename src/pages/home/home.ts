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
  myCoinsPrice: Array<any> = [];
  showInfo: Array<Boolean> = [];
  myCoinsMarketCap:Array<any> = [];
  myAmount:Array<any> = [];
  enteredAmount:Array<any> = [];

  constructor(public navCtrl: NavController, private dataService:DataService) {
    this.getCoins();
  }
    getCoins(){
      this.dataService.getCoins()
        .subscribe((coinInfo) => {
          this.allCoins = coinInfo;
        });
      }
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
        this.showInfo.push(true);
        this.myAmount.push('0');
        this.dataService.getCoinMarketCap(this.allCoins[this.searchedCoin].Name.toLowerCase())
          .subscribe((coinMarketCap) => {
            this.myCoinsMarketCap.push(coinMarketCap)
          })
        this.dataService.getCoinPrice(this.searchedCoin)
          .subscribe((coinsPrice) =>{
            this.myCoinsPrice.push(coinsPrice);
          })

      }

    }
    updateCoins(refresher){
      let i = 0;
      this.myCoins.forEach(element =>
        this.refresher(i++, element)
      )
    setTimeout(() => {
      refresher.complete();
    }, 1000);
    console.log(this.myCoinsMarketCap)
    console.log(this.myCoinsPrice)
    }
    refresher(i:number, coin:string){
      console.log(i);
      this.dataService.getCoinMarketCap(this.allCoins[coin].Name.toLowerCase())
      .subscribe((coinMarketCap) => {
        this.myCoinsMarketCap.splice(i, 1, coinMarketCap)
      })
      this.dataService.getCoinPrice(coin)
        .subscribe((coinsPrice) =>{
        this.myCoinsPrice.splice(i,1, coinsPrice);
      })
    }
    showInfoToggle(i:number){
      if(this.showInfo[i] == false){
        this.showInfo[i] = true;
      }
      else{
        this.showInfo[i] = false;
      }
    }
    myPortfolioValues(i:number,){
      this.myAmount.splice(i, 1, this.enteredAmount[i]);
    }
    removeCoin(i:number){
      this.myCoins.splice(i,1);
      console.log(this.myCoins);
    }

}
