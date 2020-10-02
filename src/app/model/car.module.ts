import { Office } from './office.module';
export class Car{
    
      public id:number;
      public model: string;
      public bodyType:string;
      public color:string;
      public year:number;
      public mileage:number;
      public availability: boolean;
      public office:Office[];
      public checkInDate:Date;
      public checkOutDate:Date;
      public photo = []; 
  }