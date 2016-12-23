import { NavParams, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Bus, Destination } from '../../models/bus';
import { Station } from '../../models/station';
import { BusService } from '../../services/bus.service';
import { Favorite } from '../../models/favorite';

@Component({
    templateUrl: './modal-settings.component.html'
})
export class SettingsEditModal {
    public busSelected: Bus;
    public stations: Station;
    public destinationSelected: string;
    public stationSelected: string;
    private _favorite: Favorite;

    static get parameters() {
        return [[NavParams], [ViewController], [BusService]];
    }

    constructor(public params: NavParams,
        public viewCtrl: ViewController,
        private srvBus: BusService) {
        this.busSelected = this.params.get("bus")
    }

    close(): void {
        this.viewCtrl.dismiss();
    }

    onDestinationSelected(): void {
        this.srvBus.getStations("bus", this.busSelected.line).subscribe(
            result => {
                this.stations = result['stations']
            },
            err => {
                // Log errors if any
                console.log(err);
            });
    }

    save(): void {
        this._favorite = new Favorite();
        this._favorite.idBus = this.busSelected.line;
        this._favorite.idStation = this.stationSelected;
        this._favorite.idDestination = this.destinationSelected;

        this.viewCtrl.dismiss(this._favorite);
    }

}