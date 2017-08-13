import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from './../../services/data.service';


import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

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
  items$: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, private dataService:DataService, afDB: AngularFireDatabase) {
    this.getCoins();
    this.items$ = afDB.list('/');
    this.items$.subscribe(item => console.log(item));
    console.log(this.items$);
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
    }
    refresher(i:number, coin:string){
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
    minimizeAll(){
      let i:number = 0;
      if(this.showInfo[0] == false && this.showInfo[1] == false)
        {
          this.showInfo.forEach(element =>
            this.showInfo.splice(i++, 1, true),
          )
        }
      else{
        this.showInfo.forEach(element =>
          this.showInfo.splice(i++, 1, false),
        )
      }
    }
    myPortfolioValues(i:number,){
      this.myAmount.splice(i, 1, this.enteredAmount[i]);
    }
    removeCoin(i:number){
      this.myCoins.splice(i,1);
      this.myCoinsMarketCap.splice(i,1);
      this.myCoinsPrice.splice(i, 1);
    }

}
