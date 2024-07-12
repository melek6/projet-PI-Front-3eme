import { Injectable } from "@angular/core";
import {
  Client,
  IMessage,
  Message,
  Stomp,
  StompSubscription,
} from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class WebsocketService {
  private client: Client;
  private messagesSubject: Subject<WSMessage> = new Subject<WSMessage>();
  public messages$: Observable<WSMessage> = this.messagesSubject.asObservable();
  constructor() {
    this.client = new Client({
      brokerURL: undefined,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      webSocketFactory: () => new SockJS("http://localhost:8081/ws"),
    });

    this.client.onConnect = (frame) => {
      console.log("Connected: " + frame);
      this.client.subscribe("/all/WSmessage", (message: IMessage) => {
        this.onMessageReceived(message);
      });
    };

    this.client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };
  }

  // constructor() {
  //   const backendUrl = "http://localhost:8081/ws";
  //   const stompConfig: StompConfig = {
  //     url: () => new SockJS(backendUrl),
  //     headers: {},
  //     heartbeat_in: 0,
  //     heartbeat_out: 20000,
  //     reconnect_delay: 5000,
  //     debug: true,
  //   };
  //   this.stompService = new StompService(stompConfig);
  //   this.stompService.initAndConnect();
  // }

  // public subscribeToMessages(): Observable<WSMessage> {
  //   return this.stompService
  //     .subscribe("/app/broadcast")
  //     .pipe(map((message: Message) => JSON.parse(message.body) as WSMessage));
  // }

  // public broadcastMessage(wsMessage: WSMessage): void {
  //   this.stompService.publish({
  //     destination: "/app/broadcast",
  //     body: JSON.stringify(wsMessage),
  //   });
  // }

  connect() {
    this.client.activate();
  }

  disconnect() {
    if (this.client.active) {
      this.client.deactivate();
      console.log("Disconnected");
    }
  }

  sendMessage(wsMessage: WSMessage) {
    this.client.publish({
      destination: "/app/application",
      body: JSON.stringify(wsMessage),
    });
  }

  onMessageReceived(message: Message) {
    console.log("Message received from server: ", message.body);
    const wsMessage: WSMessage = JSON.parse(message.body);
    this.messagesSubject.next(wsMessage);
  }
}

export interface WSMessage {
  from: string;
  text: string;
}
