import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Schedule } from '../models/schedule'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ScheduleService {

    private scheduleUrl = 'https://api-ratp.pierre-grimaud.fr/v2/{TypeLigne}/{LigneId}/stations/{StationId}?destination={DestinationId}';  // URL to web API
    private scheduleUrlTest = 'https://api-ratp.pierre-grimaud.fr/v2/bus/48/stations/3009?destination=195';  // URL to web API

    constructor(private http: Http) { }

    getSchedule(typeLigne: string, ligneId: string, stationId: string, destinationId: string): Observable<Schedule[]> {
        this.scheduleUrl.replace("{TypeLigne}", typeLigne);
        this.scheduleUrl.replace("{LigneId}", ligneId);
        this.scheduleUrl.replace("{StationId}", stationId);
        this.scheduleUrl.replace("{DestinationId}", destinationId);
        
        return this.http.get(this.scheduleUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.response || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}