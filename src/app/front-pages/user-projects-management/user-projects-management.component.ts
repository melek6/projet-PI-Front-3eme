import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserMarketplaceService } from 'src/app/_services/UserMarketplace/user-marketplace.service';

interface User {
  id: number;
  username: string;
  email: string;
}

interface ProjectDTO {
  id: number;
  title: string;
  description: string;
  category: string;
  skillsRequired: string;
  budget: number;
  deadline: string;
  propositions: any[];
  nbPropositions?: number;
}

interface PropositionDTO {
  id: number;
  detail: string;
  amount: number;
  status: string;
  user: User;
}

@Component({
  selector: 'app-user-projects-management',
  templateUrl: './user-projects-management.component.html',
  styleUrls: ['./user-projects-management.component.css']
})
export class UserProjectsManagementComponent implements OnInit {
  projects: ProjectDTO[] = [];
  categories: string[] = [];
  projectForm: FormGroup;
  selectedProject: ProjectDTO | null = null;
  propositions: PropositionDTO[] = [];
  isEditing = false;
  showModal = false;
  showPropositionsModal = false;
  approvedProposition: PropositionDTO | null = null; // Store the approved proposition for chat

  @ViewChild('confirmationDialog') confirmationDialog!: TemplateRef<any>;

  constructor(
    private marketplaceService: UserMarketplaceService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      skillsRequired: ['', Validators.required],
      deadline: ['', Validators.required],
      budget: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadUserProjects();
    this.loadCategories();
  }

  loadUserProjects(): void {
    this.marketplaceService.getUserProjects().subscribe(
      (data: ProjectDTO[]) => {
        this.projects = data.map(project => ({
          ...project,
          nbPropositions: project.propositions ? project.propositions.length : 0
        }));
      },
      error => {
        console.error('Error fetching user projects:', error);
      }
    );
  }

  loadCategories(): void {
    this.marketplaceService.getProjectCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  openCreateForm(): void {
    this.isEditing = false;
    this.selectedProject = null;
    this.projectForm.reset();
    this.showModal = true;
  }

  openEditForm(project: ProjectDTO): void {
    this.isEditing = true;
    this.selectedProject = project;
    this.projectForm.patchValue({
      title: project.title,
      description: project.description,
      category: project.category,
      skillsRequired: project.skillsRequired,
      deadline: project.deadline,
      budget: project.budget
    });
    this.showModal = true;
  }

  openDetails(project: ProjectDTO): void {
    this.selectedProject = project;
    this.marketplaceService.getPropositionsByProjectId(project.id).subscribe(
      (data: PropositionDTO[]) => {
        this.propositions = data;
        this.showPropositionsModal = true;
      },
      error => {
        console.error('Error fetching propositions:', error);
      }
    );
  }

  closeForm(): void {
    this.showModal = false;
  }

  closePropositionsModal(): void {
    this.showPropositionsModal = false;
    this.approvedProposition = null; // Reset the approved proposition when closing the modal
  }

  saveProject(): void {
    if (this.projectForm.valid) {
      const projectData = this.projectForm.value;
      if (this.isEditing && this.selectedProject) {
        this.marketplaceService.updateProject(this.selectedProject.id, projectData).subscribe(
          (response) => {
            this.loadUserProjects();
            this.selectedProject = null;
            this.isEditing = false;
            this.closeForm();
          },
          (error) => {
            console.error('Error updating project', error);
          }
        );
      } else {
        this.marketplaceService.createProject(projectData).subscribe(
          (response) => {
            this.loadUserProjects();
            this.closeForm();
          },
          (error) => {
            console.error('Error creating project', error);
          }
        );
      }
      this.projectForm.reset();
    }
  }

  deleteProject(projectId: number): void {
    this.marketplaceService.deleteProject(projectId).subscribe(
      (response) => {
        this.loadUserProjects();
      },
      (error) => {
        console.error('Error deleting project', error);
      }
    );
  }

  approveProposition(propositionId: number): void {
    this.marketplaceService.approveProposition(propositionId).subscribe(
      (response) => {
        this.propositions = this.propositions.map(p => p.id === propositionId ? { ...p, status: 'APPROVED' } : p);
        this.approvedProposition = this.propositions.find(p => p.id === propositionId) || null;
      },
      (error) => {
        console.error('Error approving proposition:', error);
      }
    );
  }

  declineProposition(propositionId: number): void {
    this.marketplaceService.declineProposition(propositionId).subscribe(
      (response) => {
        this.propositions = this.propositions.map(p => p.id === propositionId ? { ...p, status: 'DECLINED' } : p);
      },
      (error) => {
        console.error('Error declining proposition:', error);
      }
    );
  }

  openConfirmationDialog(): void {
    this.dialog.open(this.confirmationDialog);
  }
}
