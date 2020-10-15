import { Car } from './car.module';
import { Office } from './office.module';

export class Booking{
    
    public id:any;
    public checkInDate:Date;
    public checkOutDate:Date;
    public car: Car;
    public offices: Office;
   
}