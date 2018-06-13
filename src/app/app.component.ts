import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {
  title = 'app';
  private BASE_URL = 'http://localhost:4000/';
  public socket: any;

  constructor() {
    this.socket = {id: ''};
  }

  fnTest() {
    this.socket = io(this.BASE_URL);
    this.socket.on('connect', function () {
      console.log('working');
    });
    this.socket.on('test1', function (test) {
      console.log('working=-', test);
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    /* this.socket.on('connect', function () {
       console.log('working');
     });*/
  }

  ngAfterViewChecked() {
    /* console.log('working==');
     */
  }

}
