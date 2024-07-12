import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import {
  WebsocketService,
  WSMessage,
} from "src/app/_services/Websocket/websocket.service";

@Component({
  selector: "app-project-notifications",
  templateUrl: "./project-notifications.component.html",
  styleUrls: ["./project-notifications.component.css"],
})
export class ProjectNotificationsComponent implements OnInit, OnDestroy {
  message: string;
  messages: WSMessage[] = [];
  private messagesSubscription: Subscription;

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.websocketService.connect();
    this.messagesSubscription = this.websocketService.messages$.subscribe(
      (msg: WSMessage) => {
        this.messages.push(msg);
      }
    );
  }

  ngOnDestroy() {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
    this.websocketService.disconnect();
  }
}
