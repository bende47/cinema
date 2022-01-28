import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {ActionEvent} from "./product.state";

@Injectable({providedIn:"root"})
export class EventDriverService{
  sourceEventSubjet:Subject<ActionEvent> = new Subject<ActionEvent>();
  sourceEventSubjetObservable = this.sourceEventSubjet.asObservable();

  publishEvent(event:ActionEvent){
    this.sourceEventSubjet.next(event);
  }

}
