import { Component, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Bus } from '../../models/bus'
import { BusService } from '../../services/bus.service'

@Component({
    selector: 'page-settings',
    templateUrl: 'page-settings.html'
})
export class SettingsPage implements AfterViewInit {

    listBus: Array<Bus>;
    constructor(public navCtrl: NavController, private srvSchedule: BusService) {
    }

    ngAfterViewInit() {

        let timer = Observable.timer(2000, 1000);
        timer.subscribe(t => {
            return this._refreshSchedule();
        });
    }


    private _refreshSchedule() {

        this.srvSchedule.getBus().subscribe(
            result => {
                this.listBus = result['bus']
            }, //Bind to view
            err => {
                // Log errors if any
                console.log(err);
            });
    }
}
