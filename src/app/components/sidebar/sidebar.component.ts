import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
   /* { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },*/
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/offre', title: 'Gestion des offres',  icon:'ni-bell-55 text-red', class: '' },
    { path: '/listecondidat', title: 'Liste des candidats',  icon:'ni-planet text-blue', class: '' },
    { path: '/gestformation', title: 'Gestion des formations',  icon:'ni-bell-55 text-red', class: '' },
    { path: '/gestevalformation', title: 'Gestion des evaluations formation',  icon:'ni-bell-55 text-red', class: '' },
    { path: '/quiz', title: 'Gestion des quiz',  icon:'ni-planet text-blue', class: '' },
    { path: '/questions', title: 'Gestion des questions ',  icon:'ni-planet text-blue', class: '' },

    { path: '/project-management', title: 'Project Management',  icon:'ni-archive-2 text-orange', class: '' },
    { path: '/marketplace', title: 'Marketplace',  icon:'ni-shop text-green', class: '' },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/gestionuser', title: 'gestion User',  icon:'ni-planet text-blue', class: '' },



];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
