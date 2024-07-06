import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PropositionService } from 'src/app/_services/PropositionManagement/proposition.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface PropositionData {
  id: number;
  detail: string;
  amount: number;
  status: string;
  project: {
    id: number;
    title: string;
  };
  user: {
    id: number;
    username: string;
  };
}

@Component({
  selector: 'app-proposition-management',
  templateUrl: './proposition-management.component.html',
  styleUrls: ['./proposition-management.component.css'],
})
export class PropositionManagementComponent implements OnInit {
  propositions: PropositionData[] = [];
  dataSource: MatTableDataSource<PropositionData> = new MatTableDataSource<PropositionData>([]);
  displayedColumns: string[] = ['detail', 'amount', 'status', 'project', 'user', 'actions'];

  propositionForm: FormGroup;
  projects: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('propositionModal') propositionModal: TemplateRef<any>;

  constructor(
    private propositionService: PropositionService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.propositionForm = this.fb.group({
      detail: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      projectId: [null, Validators.required],
      file: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPropositions();
    this.loadProjects();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadPropositions(): void {
    this.propositionService.getAllPropositions().subscribe(
      (data: PropositionData[]) => {
        this.propositions = data;
        this.dataSource.data = this.propositions;
      },
      error => {
        console.error('Error fetching propositions:', error);
      }
    );
  }

  loadProjects(): void {
    this.propositionService.getProjects().subscribe(
      (data: any[]) => {
        this.projects = data;
      },
      error => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  openPropositionModal(): void {
    const dialogRef = this.dialog.open(this.propositionModal, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addProposition();
      }
    });
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    this.propositionForm.patchValue({
      file: file
    });
    this.propositionForm.get('file').updateValueAndValidity();
  }

  addProposition(): void {
    if (this.propositionForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('detail', this.propositionForm.get('detail').value);
    formData.append('amount', this.propositionForm.get('amount').value);
    formData.append('projectId', this.propositionForm.get('projectId').value);
    formData.append('file', this.propositionForm.get('file').value);

    this.propositionService.createProposition(this.propositionForm.get('projectId').value, formData).subscribe(
      (proposition: PropositionData) => {
        this.propositions.push(proposition);
        this.dataSource.data = this.propositions; // Update dataSource
        this.resetForm();
      },
      error => {
        console.error('Error adding proposition:', error);
      }
    );
  }

  deleteProposition(id: number): void {
    if (confirm('Are you sure you want to delete this proposition?')) {
      this.propositionService.deleteProposition(id).subscribe(
        () => {
          this.propositions = this.propositions.filter(proposition => proposition.id !== id);
          this.dataSource.data = this.propositions; // Update dataSource
        },
        error => {
          console.error('Error deleting proposition:', error);
        }
      );
    }
  }

  approveProposition(id: number): void {
    this.propositionService.approveProposition(id).subscribe(
      () => {
        this.loadPropositions(); // Refresh the list
      },
      error => {
        console.error('Error approving proposition:', error);
      }
    );
  }

  declineProposition(id: number): void {
    this.propositionService.declineProposition(id).subscribe(
      () => {
        this.loadPropositions(); // Refresh the list
      },
      error => {
        console.error('Error declining proposition:', error);
      }
    );
  }

  resetForm() {
    this.propositionForm.reset({
      detail: '',
      amount: 0,
      projectId: null,
      file: null
    });
  }
}
