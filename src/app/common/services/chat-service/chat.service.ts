import { Injectable } from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Constant} from '../../constant';
import {AuthRequest} from '../../interfaces/auth-request';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private _http: HttpClient) { }

  getMessages(params: any) {
    return new Promise((resolve, reject) => {
      this._http
        .post(Constant.API_URL + 'getMessages', params)
        .subscribe((response: any) => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }
}
