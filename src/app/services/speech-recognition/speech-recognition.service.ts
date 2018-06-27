import { Injectable, NgZone, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as _ from "lodash";

interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

@Injectable()
export class SpeechRecognitionService {

  speechRecognition: any;
  downloadCompanySpeech: boolean = false;
  downloadCompanySpeechEmitter = new EventEmitter<any>();
  downloadUserSpeech: boolean = false;
  downloadUserSpeechEmitter = new EventEmitter<any>();

  constructor(private zone: NgZone) {}

  // *unused method
  // record(): Observable<string> {
  //
  //   return Observable.create(observer => {
  //     const { webkitSpeechRecognition }: IWindow = <IWindow>window;
  //     this.speechRecognition = new webkitSpeechRecognition();
  //     //this.speechRecognition = SpeechRecognition;
  //     this.speechRecognition.continuous = true;
  //     //this.speechRecognition.interimResults = true;
  //     this.speechRecognition.lang = 'en-us';
  //     this.speechRecognition.maxAlternatives = 1;
  //
  //     this.speechRecognition.onresult = speech => {
  //       let term: string = "";
  //       if (speech.results) {
  //         var result = speech.results[speech.resultIndex];
  //         var transcript = result[0].transcript;
  //         if (result.isFinal) {
  //           if (result[0].confidence < 0.3) {
  //             // console.log("Unrecognized result - Please try again");
  //           }
  //           else {
  //             term = _.trim(transcript);
  //           }
  //         }
  //       }
  //       this.zone.run(() => {
  //         observer.next(term);
  //       });
  //     };
  //
  //     this.speechRecognition.onerror = error => {
  //       observer.error(error);
  //     };
  //
  //     this.speechRecognition.onend = () => {
  //       observer.complete();
  //     };
  //
  //     this.speechRecognition.start();
  //   });
  // }

  // *unused method
  // DestroySpeechObject() {
  //   if (this.speechRecognition)
  //     this.speechRecognition.stop();
  // }

  // *unused method
  // downloadCompanyBuildings() {
  //   this.downloadCompanySpeech = true;
  //   this.downloadCompanySpeechEmitter.emit(this.downloadCompanySpeech);
  // }

  // *unused method
  // downloadUserBuildings() {
  //   this.downloadUserSpeech = true;
  //   this.downloadUserSpeechEmitter.emit(this.downloadUserSpeech);
  // }
}
