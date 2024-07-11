import { Component, OnInit } from "@angular/core";
import {
  WebsocketService,
  WSMessage,
} from "src/app/_services/Websocket/websocket.service";

@Component({
  selector: "app-project-notifications",
  templateUrl: "./project-notifications.component.html",
  styleUrls: ["./project-notifications.component.css"],
})
export class ProjectNotificationsComponent implements OnInit {
  notifications: WSMessage[] = [];

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.websocketService.subscribeToMessages().subscribe(
      (message: WSMessage) => {
        console.log("Received notification:", message); // Log received message
        this.notifications.push(message);
      },
      (error) => {
        console.error("Error receiving messages:", error);
      }
    );
  }
}
