import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/_services/auth.service";
import { ProjectNotificationService } from "src/app/_services/Notification/project-notification.service";
import { StorageService } from "src/app/_services/storage.service";
import { UserService } from "src/app/_services/user.service";
import {
  WebsocketService,
  WSMessage,
} from "src/app/_services/Websocket/websocket.service";

@Component({
  selector: "app-front-layout",
  templateUrl: "./front-layout.component.html",
  styleUrls: ["./front-layout.component.css"],
})
export class FrontLayoutComponent implements OnInit, OnDestroy {
  user: any;
  image: any;
  username: any;
  notifications: WSMessage[] = [];
  message: string;
  messages: WSMessage[] = [];
  private messagesSubscription: Subscription;

  constructor(
    private tokenStorage: StorageService,
    private utilisateurService: UserService,
    private authService: AuthService,
    router: Router,
    private notificationService: ProjectNotificationService,
    private websocketService: WebsocketService
  ) {}

  /* getUserbyid() {
    this.utilisateurService.findByUsername(this.username).subscribe(data => {
      console.log(data)
      this.user = data;
    });
  }*/

  ngOnInit(): void {
    this.websocketService.connect();
    this.messagesSubscription = this.websocketService.messages$.subscribe(
      (msg: WSMessage) => {
        this.messages.push(msg);
        this.notifications.push(msg);
      }
    );
    if (this.tokenStorage.getToken()) {
      //this.getUserbyid();
      this.username = this.tokenStorage.getUser().username;
      this.loadNotifications();
    }
  }
  logout(): void {
    this.authService.logout().subscribe(
      (response) => {
        console.log("Logout successful", response);
        localStorage.removeItem("authToken"); // Remove token or other session data
        sessionStorage.clear(); // Clear session storage
        //   this.router.navigate(['/login']); // Navigate to the login page after logout
      },
      (error) => {
        console.error("Logout failed", error);
      }
    );
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe(
      (data) => {
        this.notifications = data;
      },
      (error) => {
        console.error("Error fetching notifications", error);
      }
    );
  }

  ngOnDestroy() {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
    this.websocketService.disconnect();
  }

  clearNotifications(): void {
    this.notificationService.clearNotifications().subscribe(() => {
      this.notifications = [];
      console.log("Notifications cleared");
    });
  }
}
