import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {


  getLog(): any[] {
    return [{name: "Karen", message: "55252", ts: Math.random()*500, sender_id: "0"},
            {name: "ARtak", message: "HI", ts: Math.random()*500, sender_id: "2"}];
  }


  constructor() { }


}
