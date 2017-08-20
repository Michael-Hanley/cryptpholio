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
    this.lineChartData = [];
    this.lineChartData.push(values);
    this.dataAvail = true;
    this.lineChartData.forEach(object => {
      if (object.data.length < 2){
        this.dataAvail = false;
      }
    }
  )

  }
  @Input()
  set times(times:Array<any>){
    let date:any;
    let hours:any;
    let minutes: any;
    let seconds: any;
    let formattedTime:any = [];
    this.lineChartLabels = [];
    times.forEach(time => {
      date = new Date(time*1000)
      hours = date.getHours();
      minutes = "0" + date.getMinutes();
      seconds = "0" + date.getSeconds();
      formattedTime = hours+ ':' + minutes.substr(-2);
      this.lineChartLabels.push(formattedTime);
      }
    )
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
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  onChartClick(event) {
    console.log(event);
  }
  constructor() {
  }


  ngOnInit(){

  }



}
