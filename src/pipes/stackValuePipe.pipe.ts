import {Pipe} from '@angular/core';

@Pipe({
   name: 'stackValue'
})

export class stackValuePipe {
    transform(myCoinStack: any, coinValue: number): any {
      return myCoinStack * coinValue;
    }

}
