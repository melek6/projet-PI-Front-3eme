import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MarketplaceService } from 'src/app/_services/ProjectManagement/marketplace.service';

export interface ProjectData {
  id: number;
  title: string;
  description: string;
  category: string;
  skillsRequired: string;
  budget: number;
  nbPropositions: number;
}

export interface ProjectDataCreation {
  title: string;
  description: string;
  category: string;
  skillsRequired: string;
  budget: number;
}

@Component({
  selector: 'app-project-management',
  styleUrls: ['project-management.component.css'],
  templateUrl: 'project-management.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class ProjectManagementComponent {
  displayedColumns: string[] = ['id', 'title', 'description', 'category', 'skillsRequired', 'budget', 'nbPropositions', 'actions'];
  dataToDisplay: ProjectData[] = [];

  dataSource = new ExampleDataSource(this.dataToDisplay);

  constructor(private marketplaceService: MarketplaceService) {
    this.fetchProjects();
  }

  fetchProjects() {
    this.marketplaceService.getAllProjects().subscribe((data) => {
      this.dataToDisplay = data.map((project) => ({
        id: project.id,
        title: project.title,
        description: project.description,
        category: project.category,
        skillsRequired: project.skillsRequired,
        budget: project.budget,
        nbPropositions: project.propositions.length,
      }));
      this.dataSource.setData(this.dataToDisplay);
    });
  }

  addData(newProject: ProjectDataCreation) {
    this.marketplaceService.createProject(newProject).subscribe((project) => {
      this.fetchProjects();
    });
  }

  removeData(id: number) {
    this.marketplaceService.deleteProject(id).subscribe(() => {
      this.dataToDisplay = this.dataToDisplay.filter((project) => project.id !== id);
      this.dataSource.setData(this.dataToDisplay);
    });
  }
}

class ExampleDataSource extends DataSource<ProjectData> {
  private _dataStream = new ReplaySubject<ProjectData[]>();

  constructor(initialData: ProjectData[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<ProjectData[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: ProjectData[]) {
    this._dataStream.next(data);
  }
}
