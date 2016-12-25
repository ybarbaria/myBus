import { NativeStorage } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Bus } from '../models/bus';
import 'rxjs/Rx';

@Injectable()
export class StorageService {

    constructor(private platform: Platform) {
    }

    public storeBus(idBus: string, nameBus: string, station: string, terminus: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.platform.ready().then((readySource) => {
                // Platform now ready, execute any required native code
                NativeStorage.setItem("mybus", { busNumber: idBus, stationName: station, terminusName: terminus })
                    .then(
                    () => {
                        console.log('Stored item!');
                        resolve(true);
                    },
                    error => {
                        console.error('Error storing item', error);
                        reject(false);
                    });

            }),
                error => {
                    reject(false);
                };
        });
    }

    public getBus(nameBuse: string): Promise<Bus> {
        return new Promise((resolve, reject) => {
            NativeStorage.getItem(nameBuse)
                .then(
                data => { return <Bus>data },
                error => console.error(error)
                );
        });
    }
}