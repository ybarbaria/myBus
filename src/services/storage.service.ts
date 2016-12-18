import { NativeStorage } from 'ionic-native';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ScheduleService {

    constructor() { }

    public storeBus(idBus: number, nameBus: string, station: string, terminus: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            NativeStorage.setItem(nameBus, { busNumber: idBus, stationName: station, terminusName: terminus })
                .then(
                () => {
                    console.log('Stored item!');
                    resolve(true);
                },
                error => {
                    console.error('Error storing item', error);
                    reject(false);
                });
        });
    }

    public getBus(nameBuse: string): Promise<Object> {
              return new Promise((resolve, reject) => {
            NativeStorage.getItem(nameBuse)
            .then(
                data => console.log(data),
                error => console.error(error)
            );
        });
     }  
}