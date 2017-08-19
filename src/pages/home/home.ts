import { ChartComponent } from './../../components/chart/chart';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from './../../services/data.service';
import { Storage } from '@ionic/storage';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, AfterViewInit {
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
  //portfolioValue: number;
  coinValueChart:Array<any>=[];
  coinTime:Array<any>=[];
  dataReady:boolean=false;
  chartData:Array<boolean> = []; 

  constructor(public navCtrl: NavController, private dataService:DataService, afDB: AngularFireDatabase,
    private storage: Storage) {
 //     this.storage.clear();

    /** FIREBASE FUN
    this.items$ = afDB.list('/');
    this.items$.subscribe(item => console.log(item));
    console.log(this.items$);
    */

  }
    getCoins(){
      this.dataService.getCoins()
        .subscribe((coinInfo) => {
          this.allCoins = coinInfo;
          this.startApp();
        });
      }
    getCoinPrice(){
      this.searchedCoin = this.searchedCoin.toUpperCase();
      this.dataService.getCoinPrice(this.searchedCoin)
        .subscribe((coinsPrice) => {
            this.coins = [];
            this.coins.push(coinsPrice);
      })
    }

    addCoin(){
      let coinValue: Array <any> = [];      
      let haveCoin: boolean = false;
      let coinTimeMin: Array<any> = [];
      this.myCoins.forEach(element => {
        if (element == this.searchedCoin){
          haveCoin = true;
        }
      });
      if(haveCoin == false){
        this.myCoins.push(this.searchedCoin);
        this.myAmount.push(null);
        this.storage.set(this.searchedCoin, null);
        this.dataService.getCoinMarketCap(this.allCoins[this.searchedCoin].Name.toLowerCase())
          .subscribe((coinMarketCap) => {
            this.myCoinsMarketCap.push(coinMarketCap)
          })
        this.dataService.getCoinPrice(this.searchedCoin)
          .subscribe((coinsPrice) =>{
            this.myCoinsPrice.push(coinsPrice);
          })
          this.dataService.getCoinHistMin(this.searchedCoin)
            .subscribe(res => {res.forEach(
              element => {coinValue.push(element.close),
              coinTimeMin.push(element.time)
            })
          this.coinTime.push(coinTimeMin);
          this.coinValueChart.push({data: coinValue, label: this.allCoins[this.searchedCoin].Name});
          this.showInfo.push(true);
          if(res.length == null){
            this.chartData.push(false); 
           }
           else {
            this.chartData.push(true); 
           }
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
      let coinValue: Array <any> = [];
      let coinTimeMin: Array<any> = [];
      this.dataService.getCoinMarketCap(this.allCoins[coin].Name.toLowerCase())
      .subscribe((coinMarketCap) => {
        this.myCoinsMarketCap.splice(i, 1, coinMarketCap)
      })
      this.dataService.getCoinPrice(coin)
        .subscribe((coinsPrice) =>{
        this.myCoinsPrice.splice(i,1, coinsPrice);
      })
      this.dataService.getCoinHistMin(this.searchedCoin)
      .subscribe(res => {res.forEach(
        element => {coinValue.push(element.close),
        coinTimeMin.splice(element.time)
      })
    this.coinTime.splice(i, 1, coinTimeMin);
    this.coinValueChart.splice(i, 1, {data: coinValue, label: this.allCoins[this.searchedCoin].Name});
    this.showInfo.splice(i,1, true);
    if(res.length == null){
      this.chartData.splice(i, 1, false); 
     }
     else {
      this.chartData.splice(i, 1, true); 
     }
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
    removeCoin(i:number){
      this.storage.remove(this.myCoins[i]);
      this.myCoins.splice(i, 1);
      this.myCoinsMarketCap.splice(i, 1);
      this.myCoinsPrice.splice(i, 1);
      this.myAmount.splice(i, 1);
      this.coinValueChart.splice(i, 1);
      this.chartData.splice(i, 1);
    }
    startApp(){
      let coinValue: Array<any> = [];
      let coinTimeMin:Array<any> = [];
      this.storage.keys().then(element => {
        element.forEach(item => {
          this.storage.get(item).then(res => {
          this.myAmount.push(res)
          this.myCoins.push(item)
          this.dataService.getCoinMarketCap(this.allCoins[item].Name.toLowerCase())
            .subscribe((coinMarketCap) => {
              this.myCoinsMarketCap.push(coinMarketCap)
            })
          this.dataService.getCoinPrice(item)
            .subscribe((coinsPrice) =>{
              this.myCoinsPrice.push(coinsPrice);
            }
          )
          this.dataService.getCoinHistMin(item)
            .subscribe(res => {res.forEach(
              element => {coinValue.push(element.close),
              coinTimeMin.push(element.time)
            })
            console.log(res);            
            this.coinTime.push(coinTimeMin);
            this.coinValueChart.push({data: coinValue, label: this.allCoins[item].Name});
            this.showInfo.push(true);
            if(res.length == null){
              this.chartData.push(false); 
             }
             else {
              this.chartData.push(true); 
             }
          })
        })}
      )})
    }
    getCoinHistMin(){
      
    }
    updateCoinAmount(event:any, i:number){
      setTimeout(() => {
        this.storage.set(this.myCoins[i], this.myAmount[i]);}, 1000);

    }
    /**
    addCoins(){
      this.portfolioValue = this.myAmount.reduce((a,b) => a + b);
      console.log(this.portfolioValue);
    }
    **/
    ngOnInit(){
      this.getCoins();
    }

    ngAfterViewInit(){
      this.dataReady = true;
    }
    
}
