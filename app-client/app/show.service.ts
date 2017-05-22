import { Injectable } from '@angular/core';
import {AppConfig} from "./app.config";
import {URLSearchParams} from "@angular/http";
import {AuthHttp} from "angular2-jwt";
import {Observable} from "rxjs/Observable";
import {Show} from "./_models/show";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ShowService {

    constructor(
        private config: AppConfig,
        private authHttp: AuthHttp
    ) { }

    search(params: any): Observable<Show[]> {
        let httpparams = new URLSearchParams();
        httpparams.set('limit', '24');
        if (params.page)
            httpparams.set('page', params.page.toString());
        if (params.query_term)
            httpparams.set('query_term', params.query_term);
        if (params.genres && params.genres != 'all')
            httpparams.set('genres', params.genres);
        if (params.years)
            httpparams.set('years', params.years);
        if (params.rating)
            httpparams.set('rating', params.rating);
        if (params.order && params.order !== 'default')
            httpparams.set('order', params.order);

        console.log(httpparams);

        return this.authHttp.get(this.config.apiUrl + '/shows', { search: httpparams })
            .map(res => res.json() as Show[])
    }

    getOne(slug: string): Promise<Show> {
        return this.authHttp.get(this.config.apiUrl + '/show/' + slug)
            .toPromise()
            .then(movie => movie.json() as Show)
    }

    yearsRange(): Promise<any> {
        return this.authHttp.get(this.config.apiUrl + '/shows/years')
            .toPromise()
            .then(range => range.json());
    }

}