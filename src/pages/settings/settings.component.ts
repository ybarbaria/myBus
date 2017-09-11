import { Component, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Bus } from '../../models/bus'
import { BusService } from '../../services/bus.service'
import { AlertController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service'

@Component({
    selector: 'settings',
    templateUrl: 'settings.html'
})
export class SettingsPage implements AfterViewInit {

    private _searchQuery: string = '';
    private _listBusStorage: Array<Bus>;
    listBus: Array<Bus>;

    constructor(public navCtrl: NavController,
        private srvSchedule: BusService,
        private alertController: AlertController,
        private storage: StorageService) {
        this._initializeItemsBus();
    }

    ngAfterViewInit() {
    }


    private _initializeItemsBus() {

        this.srvSchedule.getBus().subscribe(
            result => {
                this._listBusStorage = result['bus']
            }, //Bind to view
            err => {
                // Log errors if any
                console.log(err);
            });
    }


    public getItems(ev: any) {

        // Reset selected 
        this.listBus = this._listBusStorage;

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.listBus = this.listBus.filter((item) => {
                return (item.line.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }


    public onAddToFavorite(bus: Bus) {

        //this.storage.storeBus(bus.line)
        let alert = this.alertController.create({
            title: 'Bus' + bus.line + ' ajouté'
        });
        alert.present();
    }

}
