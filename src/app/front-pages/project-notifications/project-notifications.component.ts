import { Component, OnInit } from '@angular/core';
import { ProjectNotificationService } from '../../_services/Notification/project-notification.service';

@Component({
  selector: 'app-project-notifications',
  templateUrl: './project-notifications.component.html',
  styleUrls: ['./project-notifications.component.css']
})
export class ProjectNotificationsComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notificationService: ProjectNotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe(
      (data) => {
        this.notifications = data;
      },
      (error) => {
        console.error('Error fetching notifications', error);
      }
    );
  }
}
