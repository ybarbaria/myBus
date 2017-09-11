import { Component, AfterViewInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Bus } from '../../models/bus'
import { BusService } from '../../services/bus.service'
import { AlertController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service'
import { SettingsEditModal } from './modal-settings.component';
import { Favorite } from '../../models/favorite';

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
        private alertController: AlertController,
        private storage: StorageService,
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
        favoriteBusModal.onDidDismiss((data: Favorite) => {
            if (data) {
                this.srvStorage.storeBus(data.idBus, data.idBus, data.idStation, data.idDestination);
            }
        });
    }
}
