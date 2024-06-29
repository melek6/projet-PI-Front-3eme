import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminService } from 'src/app/_services/admin/admin.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  availableRoles = ['admin', 'moderateur', 'user']; // Liste des rôles disponibles

  @Input() user: any = { roles: [] };  // Initialize roles as an empty array
  @Input() isEditing: boolean;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  ngOnInit(): void {
    if (!this.user.roles) {
      this.user.roles = []; // Initialiser les rôles s'ils ne sont pas définis
    }
    console.log(this.user);
  }

  onSave(): void {
    this.save.emit(this.user);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
