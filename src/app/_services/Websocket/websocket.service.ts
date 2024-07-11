import { Injectable } from "@angular/core";
import { StompService } from "@stomp/ng2-stompjs";
import { StompConfig } from "@stomp/ng2-stompjs";
import { Message } from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class WebsocketService {
  private stompService: StompService;

  constructor() {
    const backendUrl = "http://localhost:8081/ws"; // Replace with your Spring Boot backend URL
    const stompConfig: StompConfig = {
      url: () => new SockJS(backendUrl),
      headers: {},
      heartbeat_in: 0,
      heartbeat_out: 20000,
      reconnect_delay: 5000,
      debug: true,
    };

    this.stompService = new StompService(stompConfig);
    this.stompService.initAndConnect();
  }

  public subscribeToMessages(): Observable<WSMessage> {
    return this.stompService
      .subscribe("/all/WSmessage")
      .pipe(map((message: Message) => JSON.parse(message.body) as WSMessage));
  }

  public sendMessage(wsMessage: WSMessage): void {
    this.stompService.publish({
      destination: "/app/application",
      body: JSON.stringify(wsMessage),
    });
  }
}

export interface WSMessage {
  from: string;
  text: string;
}
