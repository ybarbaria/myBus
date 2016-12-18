import { Component, AfterViewInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Schedule } from '../../models/schedule'
import { ScheduleService } from '../../services/schedule.service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {

  private _idStationMairie19eme = 3009;
  private _idBus = 48;
  private _idDestinationPalaisRoyal = 195;
  nomArret = "Mairie du 19ème";
  listSchedule: Array<Schedule>;
  private _ticks = 0;

  constructor(public navCtrl: NavController, private srvSchedule: ScheduleService) {
  }

  ngAfterViewInit() {

    let timer = Observable.timer(2000, 1000);
    timer.subscribe(t => {
      return this._refreshSchedule();
    });
  }


  private _refreshSchedule() {

    this.srvSchedule.getSchedule().subscribe(
      result => {
        this.listSchedule = result['schedules']
      }, //Bind to view
      err => {
        // Log errors if any
        console.log(err);
      });
  }
}
