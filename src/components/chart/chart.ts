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
  @Input()
  set values(values:Array<any>){
    this.lineChartData.push(values);
    console.log(this.lineChartData);
    this.dataAvail = true;
  }
  @Input()
  set times(times:Array<any>){
    let realTime:any;
    times.forEach(time => this.lineChartLabels.push(time)
    );
  }
  dataAvail:boolean = false;
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];
  public lineChartColors:Array<any> = [
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';

  onChartClick(event) {
    console.log(event);
  }
  constructor() {
  }


  ngOnInit(){
    
  }



}