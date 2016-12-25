import { Component, AfterViewInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Schedule } from '../../models/schedule'
import { ScheduleService } from '../../services/schedule.service'
import { SettingsPage } from '../settings/settings.component';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {

  nomArret = "Mairie du 19ème";
  listSchedule: Array<Schedule>;

  constructor(public navCtrl: NavController,
    private srvSchedule: ScheduleService,
    private stirageSrv: StorageService) {
  }

  ngAfterViewInit() {

    let timer = Observable.timer(2000, 1000);
    timer.subscribe(t => {
      return this._refreshSchedule();
    });
  }


  private _refreshSchedule() {
    this.stirageSrv.getBus("mybus").then((bus) => {
      this.srvSchedule.getSchedule().subscribe(
        result => {
          this.listSchedule = result['schedules']
        }, //Bind to view
        err => {
          // Log errors if any
          console.log(err);
        });

    });

  }

  onLoadSettings(): void {
    this.navCtrl.push(SettingsPage);
  }

}
