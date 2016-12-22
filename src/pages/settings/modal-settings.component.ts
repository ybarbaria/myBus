import { NavParams, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Bus, Destination } from '../../models/bus';
import { Station } from '../../models/station';
import { BusService } from '../../services/bus.service';

@Component({
    templateUrl: './modal-settings.component.html'
})
export class SettingsEditModal {
    public busSelected: Bus;
    public stations: Station;
    public destinationSelected: string;

    static get parameters() {
        return [[NavParams], [ViewController], [BusService]];
    }

    constructor(public params: NavParams,
        public viewCtrl: ViewController,
        private srvBus: BusService) {
        this.busSelected = this.params.get("bus")
    }

    close() {
        this.viewCtrl.dismiss();
    }

    onDestinationSelected() {
        debugger;
        this.srvBus.getStations("bus", this.destinationSelected).subscribe(
            result => {
                this.stations = result['stations']
            },
            err => {
                // Log errors if any
                console.log(err);
            });
    }

}