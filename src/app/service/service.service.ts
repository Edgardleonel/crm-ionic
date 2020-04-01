import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public selected: object;
  public messageSelected: object;
  public select: Array<Object>;
  public list: Array<Object>;
  public messageList: Array<object>;

constructor() {
  this.select = [];
  this.list = [];
  this.messageList = [];
}

}
