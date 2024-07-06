import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { GeolocationServiceService } from 'src/app/_services/GeolocationService/geolocation-service.service';
import { StorageService } from 'src/app/_services/storage.service';
import { UserupdateService } from 'src/app/_services/updateuser/userupdate.service';
import { EventBusService } from 'src/app/_shared/event-bus.service';
import * as L from 'leaflet';
import 'src/assets/leaflet/leaflet-config'; // Assurez-vous que ce chemin est correct

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {
  userLatitude: number;
  userLongitude: number;
  moderators: any[] = [];

  constructor(
    private moderatorService: UserupdateService,
    private geolocationService: GeolocationServiceService
  ) {}

  ngOnInit(): void {
    this.geolocationService.getLocation().then(position => {
      this.userLatitude = position.coords.latitude;
      this.userLongitude = position.coords.longitude;
      console.log(this.userLatitude);
      console.log(this.userLongitude);

      // Fetch nearest moderators after obtaining user's location
      this.moderatorService.getNearestModerators(this.userLatitude, this.userLongitude)
        .subscribe((data) => {
          this.moderators = data;
          this.loadMap();
        });
    }).catch(error => {
      console.error('Error getting location', error);
    });
  }

  loadMap(): void {
    const map = L.map('map').setView([this.userLatitude, this.userLongitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const userMarker = L.marker([this.userLatitude, this.userLongitude]).addTo(map)
      .bindPopup('You are here')
      .openPopup();

    const markers = [userMarker];

    this.moderators.forEach(moderator => {
      const marker = L.marker([moderator.latitude, moderator.longitude]).addTo(map)
        .bindPopup(moderator.name);
      markers.push(marker);
    });

    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.1)); // Adjust padding as necessary
  }
}

