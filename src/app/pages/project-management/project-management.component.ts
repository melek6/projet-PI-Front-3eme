import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  OnDestroy,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { MarketplaceService } from "src/app/_services/ProjectManagement/marketplace.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpParams } from "@angular/common/http";
import {
  WebsocketService,
  WSMessage,
} from "src/app/_services/Websocket/websocket.service";

export interface ProjectData {
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

export interface ProjectDataCreation {
  title: string;
  description: string;
  category: string;
  skillsRequired: string;
  budget: number;
  deadline: string;
}

@Component({
  selector: "app-project-management",
  templateUrl: "./project-management.component.html",
  styleUrls: ["./project-management.component.css"],
})
export class ProjectManagementComponent implements OnInit, OnDestroy {
  projects: ProjectData[] = [];
  dataSource: MatTableDataSource<ProjectData> =
    new MatTableDataSource<ProjectData>([]);
  displayedColumns: string[] = [
    "id",
    "title",
    "description",
    "category",
    "skillsRequired",
    "budget",
    "nbPropositions",
    "actions",
  ];

  adminMessage: string = "";

  projectForm: FormGroup;
  editMode: boolean = false;
  editProjectId: number | null = null;

  messages: WSMessage[] = [];
  broadcastText: string = "";

  categories: string[] = [];
  selectedCategory: string = "";
  minBudget: number | null = null;
  maxBudget: number | null = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("projectModal") projectModal: TemplateRef<any>;

  constructor(
    private marketplaceService: MarketplaceService,
    private websocketService: WebsocketService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.projectForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      category: ["", Validators.required],
      skillsRequired: ["", Validators.required],
      budget: [0, [Validators.required, Validators.min(1)]],
      deadline: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProjects();
    this.loadCategories();
    this.websocketService.connect();
  }

  ngOnDestroy() {
    this.websocketService.disconnect();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadProjects(): void {
    this.marketplaceService.getAllProjects().subscribe(
      (data: ProjectData[]) => {
        this.projects = data.map((project) => ({
          ...project,
          nbPropositions: project.nbPropositions || 0,
        }));
        this.dataSource.data = this.projects;
      },
      (error) => {
        console.error("Error fetching projects:", error);
      }
    );
  }

  loadCategories(): void {
    this.marketplaceService.getCategories().subscribe(
      (data: string[]) => {
        this.categories = data;
      },
      (error) => {
        console.error("Error fetching categories:", error);
      }
    );
  }

  openProjectModal(edit: boolean = false, project?: ProjectData): void {
    this.editMode = edit;
    if (edit && project) {
      this.projectForm.setValue({
        title: project.title,
        description: project.description,
        category: project.category,
        skillsRequired: project.skillsRequired,
        budget: project.budget,
        deadline: project.deadline,
      });
      this.editProjectId = project.id;
    } else {
      this.resetNewProject();
    }

    const dialogRef = this.dialog.open(this.projectModal, {
      width: "400px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.editMode && this.editProjectId !== null) {
          this.updateProject(this.editProjectId, this.projectForm.value);
        } else {
          this.addProject(this.projectForm.value);
        }
      }
    });
  }

  addProject(newProject: ProjectDataCreation): void {
    this.marketplaceService.createProjectWithParams(newProject).subscribe(
      (project: ProjectData) => {
        this.projects.push(project);
        this.dataSource.data = this.projects; // Update dataSource
        this.resetNewProject();
      },
      (error) => {
        console.error("Error adding project:", error);
      }
    );
  }

  deleteProject(id: number): void {
    if (confirm("Are you sure you want to delete this project?")) {
      this.marketplaceService.deleteProject(id).subscribe(
        () => {
          this.projects = this.projects.filter((project) => project.id !== id);
          this.dataSource.data = this.projects; // Update dataSource
        },
        (error) => {
          console.error("Error deleting project:", error);
        }
      );
    }
  }

  updateProject(id: number, projectDetails: ProjectDataCreation): void {
    const params = new HttpParams()
      .set("title", projectDetails.title)
      .set("description", projectDetails.description)
      .set("category", projectDetails.category)
      .set("skillsRequired", projectDetails.skillsRequired)
      .set("budget", projectDetails.budget.toString())
      .set("deadline", projectDetails.deadline);

    this.marketplaceService.updateProject(id, params).subscribe(
      (updatedProject: ProjectData) => {
        const index = this.projects.findIndex((p) => p.id === id);
        if (index !== -1) {
          this.projects[index] = updatedProject;
          this.dataSource.data = this.projects; // Update dataSource
        }
        this.resetNewProject();
        this.editMode = false;
        this.editProjectId = null;
      },
      (error) => {
        console.error("Error updating project:", error);
      }
    );
  }

  resetNewProject() {
    this.projectForm.reset({
      title: "",
      description: "",
      category: "",
      skillsRequired: "",
      budget: 0,
      deadline: "",
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyCategoryAndBudgetFilter() {
    console.log("Selected Category:", this.selectedCategory);
    console.log("Min Budget:", this.minBudget);
    console.log("Max Budget:", this.maxBudget);
    this.marketplaceService
      .searchProjects(this.selectedCategory, this.minBudget, this.maxBudget)
      .subscribe(
        (data: ProjectData[]) => {
          console.log("Projects fetched by category and budget:", data);
          this.projects = data.map((project) => ({
            ...project,
            nbPropositions: project.nbPropositions || 0,
          }));
          this.dataSource.data = this.projects;
        },
        (error) => {
          console.error(
            "Error fetching projects by category and budget:",
            error
          );
        }
      );
  }

  sendMessage(): void {
    const message: WSMessage = { from: "Client", text: "Hello from client" };
    this.websocketService.sendMessage(message);
  }

  broadcastMessage(): void {
    const message: WSMessage = { from: "Client", text: this.broadcastText };
    this.websocketService.sendMessage(message);
    this.broadcastText = "";
  }
}
