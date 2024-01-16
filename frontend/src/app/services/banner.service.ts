import { Injectable } from '@angular/core';
import { Banner } from '../shared/models/Banner';
import { BANNERS } from '../../data';

@Injectable({
    providedIn: 'root'
})
export class BannerService {

    constructor() { }

    getAll(): Banner[] {
        return BANNERS;
    }
}
