import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-front-layout',
  templateUrl: './front-layout.component.html',
  styleUrls: ['./front-layout.component.css']
})
export class FrontLayoutComponent implements OnInit {
  user: any;
  image: any;
  username: any;

  constructor(private tokenStorage: StorageService, private utilisateurService: UserService) { }
  logout() {
    this.tokenStorage.signOut();
  }
  getUserbyid() {
    this.utilisateurService.findByUsername(this.username).subscribe(data => {
      this.user = data;
    });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.username = this.tokenStorage.getUser().username;
      this.getUserbyid();
      console.log(this.user);
    }
  }


}
