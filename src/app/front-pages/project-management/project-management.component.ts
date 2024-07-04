import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../_services/ProjectManagement/project.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {

  projects: any[] = [];
  newProject: any = {};
  selectedProject: any;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }

  createProject() {
    this.projectService.createProject(this.newProject).subscribe(data => {
      this.projects.push(data);
      this.newProject = {};
    });
  }

  updateProject() {
    this.projectService.updateProject(this.selectedProject.id, this.selectedProject).subscribe(data => {
      this.loadProjects();
      this.selectedProject = null;
    });
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(id).subscribe(() => {
      this.projects = this.projects.filter(project => project.id !== id);
    });
  }

  selectProject(project: any) {
    this.selectedProject = { ...project };
  }
}
