import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ServerLinkService {

  serverURL:string;

  constructor() { }

  serverURLFunc(){
    if(environment.production){
      this.serverURL = ``;
    } else {
      this.serverURL = `http://localhost:8083`;
    }
    return this.serverURL;
  }

}
