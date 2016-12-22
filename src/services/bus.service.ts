import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Bus } from '../models/bus'
import { Station } from '../models/station'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class BusService {

    private busUrl = 'https://api-ratp.pierre-grimaud.fr/v2/bus/';  // URL to web API
    private stationUrl = 'https://api-ratp.pierre-grimaud.fr/v2/{0}/{1}/stations';

    constructor(private http: Http) { }

    getBus(): Observable<Bus[]> {
        return this.http.get(this.busUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getStations(typeLigne: string, ligneId: string): Observable<Station[]> {
        let uri = this.stationUrl.replace("{0}", typeLigne);
        uri = uri.replace("{1}", ligneId);
        return this.http.get(uri)
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