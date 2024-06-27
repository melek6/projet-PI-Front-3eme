import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MarketplaceService } from 'src/app/_services/ProjectManagement/marketplace.service';

export interface Proposition {
  id: number;
  detail: string;
  amount: number;
  date: string;
  status: string;
}

export interface ProjectData {
  id: number;
  title: string;
  description: string;
  category: string;
  skillsRequired: string;
  budget: number;
  propositions: Proposition[];
  nbPropositions?: number;
}

export interface ProjectDataCreation {
  title: string;
  description: string;
  category: string;
  skillsRequired: string;
  budget: number;
  deadline: string;
}

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css'],
})
export class ProjectManagementComponent implements OnInit {
  projects: ProjectData[] = [];
  dataSource: MatTableDataSource<ProjectData> = new MatTableDataSource<ProjectData>([]);
  displayedColumns: string[] = ['id', 'title', 'description', 'category', 'skillsRequired', 'budget', 'nbPropositions', 'actions'];

  newProject: ProjectDataCreation = {
    title: '',
    description: '',
    category: '',
    skillsRequired: '',
    budget: 0,
    deadline: ''
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('projectModal') projectModal: TemplateRef<any>;

  constructor(private marketplaceService: MarketplaceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadProjects(): void {
    this.marketplaceService.getAllProjects().subscribe(
      (data: ProjectData[]) => {
        this.projects = data.map(project => ({
          ...project,
          nbPropositions: project.propositions ? project.propositions.length : 0
        }));
        this.dataSource.data = this.projects;
      },
      error => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  openProjectModal(): void {
    const dialogRef = this.dialog.open(this.projectModal, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addProject(this.newProject);
      }
    });
  }

  addProject(newProject: ProjectDataCreation): void {
    this.marketplaceService.createProject(newProject).subscribe(
      (project: ProjectData) => {
        this.projects.push(project);
        this.dataSource.data = this.projects; // Update dataSource
        this.resetNewProject();
      },
      error => {
        console.error('Error adding project:', error);
      }
    );
  }

  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.marketplaceService.deleteProject(id).subscribe(
        () => {
          this.projects = this.projects.filter(project => project.id !== id);
          this.dataSource.data = this.projects; // Update dataSource
        },
        error => {
          console.error('Error deleting project:', error);
        }
      );
    }
  }

  updateProject(project: ProjectData): void {
    this.marketplaceService.updateProject(project.id, project).subscribe(
      () => {
        const index = this.projects.findIndex(p => p.id === project.id);
        if (index !== -1) {
          this.projects[index] = { ...project };
          this.dataSource.data = this.projects; // Update dataSource
        }
      },
      error => {
        console.error('Error updating project:', error);
      }
    );
  }

  resetNewProject() {
    this.newProject = {
      title: '',
      description: '',
      category: '',
      skillsRequired: '',
      budget: 0,
      deadline: ''
    };
  }
}
