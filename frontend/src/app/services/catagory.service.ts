import { Injectable } from '@angular/core';
import { Catagory } from '../shared/models/Catagory';
import { CATAGORYS } from '../../data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CATEGORIES_URL } from '../shared/constants/urls';

@Injectable({
    providedIn: 'root'
})
// export class CatagoryService {

//     constructor(private http:HttpClient) { }

//     getAll(): Catagory[] {
//         var data: Catagory[] = [];
//         this.http.get<Catagory[]>(CATEGORIES_URL).subscribe(response => {
//             data = response;
//         });

//         return data;
//     } 
    
// }
export class CatagoryService {

    constructor() { }

    getAll(): Catagory [] {
        return CATAGORYS;
    }
}