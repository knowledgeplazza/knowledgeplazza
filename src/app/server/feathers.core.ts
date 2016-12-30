import { Injectable } from '@angular/core';

import * as RxJS from 'rxjs';

import * as io from 'socket.io-client';
import * as feathers from 'feathers';
import * as hooks from 'feathers-hooks';
import * as socketio from 'feathers-socketio/client';
import * as reactive from 'feathers-reactive';
import * as authentication from 'feathers-authentication/client';

// const HOST = 'https://wizzardlizzard-server-datboricua.c9users.io';
const HOST = 'http://localhost:8080';

@Injectable()
export class FeathersCore {
  private _socket: any;
  private _app: any;

  constructor() {
    this._socket = io(HOST);

    this._app = feathers()
      .configure(socketio(this.socket))
      .configure(hooks())
      .configure(reactive(RxJS, {
        idField: '_id'
      }))
      .configure(authentication({
        storage: window.localStorage
      }));
  }

  /// get the shared feathers app
  public get app() {
    return this._app;
  }

  /// get the shared socketio reference
  public get socket() {
    return this._socket;
  }
}

export const feathersCore = new FeathersCore();
