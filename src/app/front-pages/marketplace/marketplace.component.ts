// src/app/marketplace/marketplace.component.ts
import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../../_services/ProjectManagement/marketplace.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'category', 'skillsRequired', 'budget', 'nbPropositions'];
  projects: any[] = [];
  displayedProjects: any[] = [];
  filteredProjects = new MatTableDataSource<any>(this.displayedProjects);
  loading = false;
  private filterSubject: Subject<string> = new Subject();
  private currentIndex = 0;
  private readonly batchSize = 10;

  constructor(private marketplaceService: MarketplaceService,private scrollDispatcher: ScrollDispatcher) { }

  ngOnInit(): void {
    this.getProjects();
    this.filterSubject.pipe(debounceTime(300)).subscribe(filterValue => {
      this.filteredProjects.filter = filterValue.trim().toLowerCase();
    });

    this.scrollDispatcher.scrolled().subscribe((event: CdkScrollable) => {
      if (event.measureScrollOffset('bottom') === 0) {
        this.onScroll();
      }
    });
  }

  getProjects(): void {
    this.loading = true;
    this.marketplaceService.getAllProjects().subscribe(
      (data) => {
        this.projects = data;
        this.loadMoreProjects();
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching projects:', error);
        this.loading = false;
      }
    );
  }

  loadMoreProjects(): void {
    const nextBatch = this.projects.slice(this.currentIndex, this.currentIndex + this.batchSize);
    this.displayedProjects = [...this.displayedProjects, ...nextBatch];
    this.filteredProjects.data = this.displayedProjects;
    this.currentIndex += this.batchSize;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterSubject.next(filterValue);
  }

  onScroll(): void {
    if (this.currentIndex < this.projects.length) {
      this.loadMoreProjects();
    }
  }
}
