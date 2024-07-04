// src/app/marketplace/marketplace.component.ts
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MarketplaceService } from '../../_services/ProjectManagement/marketplace.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  category: string;
  skillsRequired: string;
  budget: number;
  nbPropositions: number;
}

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
})
export class MarketplaceComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'description', 'category', 'skillsRequired', 'budget', 'nbPropositions'];
  dataSource: MatTableDataSource<ProjectData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private marketplaceService: MarketplaceService) {
    this.dataSource = new MatTableDataSource([]);
   }

   ngAfterViewInit() {
    this.marketplaceService.getAllProjects().subscribe(
      (data) => {
        const projects = data.map(project => ({
          id: project.id,
          title: project.title,
          description: project.description,
          category: project.category,
          skillsRequired: project.skillsRequired,
          budget: project.budget,
          nbPropositions: project.propositions.length
        }));
        this.dataSource.data = projects;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
