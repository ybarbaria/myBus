import { Component, AfterViewInit } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Bus } from '../../models/bus';
import { BusService } from '../../services/bus.service';
import { StorageService } from '../../services/storage.service';
import { SettingsEditModal } from './modal-settings.component';

@Component({
    selector: 'settings',
    templateUrl: 'settings.component.html'
})
export class SettingsPage implements AfterViewInit {

    private _listBusStorage: Array<Bus>;
    private _busSelected: Bus;
    listBus: Array<Bus>;

    constructor(public navCtrl: NavController,
        private srvSchedule: BusService,
        private srvStorage: StorageService,
        public modalCtrl: ModalController) {
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
        this._busSelected = bus;
        let favoriteBusModal = this.modalCtrl.create(SettingsEditModal, { bus: bus });

        favoriteBusModal.present();

        //this.srvStorage.storeBus(bus.line, bus.line, "", "");
        //console.log(bus);
    }
}
