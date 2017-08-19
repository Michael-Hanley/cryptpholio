import { Component, Input, OnInit } from '@angular/core';

/**
 * Generated class for the ChartComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'chart',
  templateUrl: 'chart.html'
})
export class ChartComponent implements OnInit {
  coinValue: Array<any> = [];

  @Input()
  set values(values:Array<any>){
    this.coinValue.push(values)
    console.log(this.coinValue);
  }

  constructor() {
  }

  ngOnInit(){
    
  }



}