import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { UserMarketplaceService } from "src/app/_services/UserMarketplace/user-marketplace.service";

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
  filePath?: string;
}

@Component({
  selector: "app-user-projects-management",
  templateUrl: "./user-projects-management.component.html",
  styleUrls: ["./user-projects-management.component.css"],
})
export class UserProjectsManagementComponent implements OnInit {
  projects: ProjectDTO[] = [];
  categories: string[] = [];
  projectForm: FormGroup;
  proposalForm: FormGroup;
  selectedProject: ProjectDTO | null = null;
  propositions: PropositionDTO[] = [];
  userProposals: PropositionDTO[] = [];
  isEditing = false;
  showModal = false;
  showPropositionsModal = false;
  showProposalModal = false;
  approvedProposition: PropositionDTO | null = null;
  selectedProposal: PropositionDTO | null = null;
  removeExistingFile = false;
  qrCodeUrl: string | null = null;
  qrCodeImage: any;

  @ViewChild("confirmationDialog") confirmationDialog!: TemplateRef<any>;
  @ViewChild("qrCodeDialog") qrCodeDialog!: TemplateRef<any>;

  constructor(
    private marketplaceService: UserMarketplaceService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.projectForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      category: ["", Validators.required],
      skillsRequired: ["", Validators.required],
      deadline: ["", Validators.required],
      budget: [0, [Validators.required, Validators.min(1)]],
    });

    this.proposalForm = this.fb.group({
      detail: ["", Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      file: [null],
    });
  }

  ngOnInit(): void {
    this.loadUserProjects();
    this.loadCategories();
    this.loadUserProposals();
  }

  loadUserProjects(): void {
    this.marketplaceService.getUserProjects().subscribe(
      (data: ProjectDTO[]) => {
        this.projects = data.map((project) => ({
          ...project,
          nbPropositions: project.propositions
            ? project.propositions.length
            : 0,
        }));
      },
      (error) => {
        console.error("Error fetching user projects:", error);
      }
    );
  }

  loadCategories(): void {
    this.marketplaceService.getProjectCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error("Error fetching categories", error);
      }
    );
  }

  loadUserProposals(): void {
    this.marketplaceService.getUserProposals().subscribe(
      (data: PropositionDTO[]) => {
        this.userProposals = data;
      },
      (error) => {
        console.error("Error fetching user proposals:", error);
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
      budget: project.budget,
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
      (error) => {
        console.error("Error fetching propositions:", error);
      }
    );
  }

  openProposalEditForm(proposal: PropositionDTO): void {
    this.selectedProposal = proposal;
    this.removeExistingFile = false;
    this.proposalForm.patchValue({
      detail: proposal.detail,
      amount: proposal.amount,
      file: null,
    });
    this.showProposalModal = true;
  }

  closeForm(): void {
    this.showModal = false;
  }

  closeProposalModal(): void {
    this.showProposalModal = false;
  }

  closePropositionsModal(): void {
    this.showPropositionsModal = false;
    this.approvedProposition = null;
  }

  saveProject(): void {
    if (this.projectForm.valid) {
      const projectData = this.projectForm.value;
      if (this.isEditing && this.selectedProject) {
        this.marketplaceService
          .updateProject(this.selectedProject.id, projectData)
          .subscribe(
            (response) => {
              this.loadUserProjects();
              this.selectedProject = null;
              this.isEditing = false;
              this.closeForm();
            },
            (error) => {
              console.error("Error updating project", error);
            }
          );
      } else {
        this.marketplaceService.createProject(projectData).subscribe(
          (response) => {
            this.loadUserProjects();
            this.closeForm();
          },
          (error) => {
            console.error("Error creating project", error);
          }
        );
      }
      this.projectForm.reset();
    }
  }

  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.proposalForm.patchValue({
      file: file,
    });
    this.proposalForm.get("file")?.updateValueAndValidity();
  }

  saveProposal(): void {
    if (this.proposalForm.valid && this.selectedProposal) {
      const proposalData = this.proposalForm.value;
      let file: File | null = null;

      const fileControl = this.proposalForm.get("file");
      if (fileControl && fileControl.value) {
        file = fileControl.value;
      }

      this.marketplaceService
        .updateProposal(
          this.selectedProposal.id,
          proposalData.detail,
          proposalData.amount,
          file,
          this.removeExistingFile
        )
        .subscribe(
          (response) => {
            this.loadUserProposals();
            this.selectedProposal = null;
            this.closeProposalModal();
          },
          (error) => {
            console.error("Error updating proposal", error);
          }
        );
      this.proposalForm.reset();
    }
  }

  deleteProject(projectId: number): void {
    this.marketplaceService.deleteProject(projectId).subscribe(
      (response) => {
        this.loadUserProjects();
      },
      (error) => {
        console.error("Error deleting project", error);
      }
    );
  }

  deleteUserProposition(propositionId: number): void {
    this.marketplaceService.deleteUserProposition(propositionId).subscribe(
      () => {
        this.userProposals = this.userProposals.filter(
          (p) => p.id !== propositionId
        );
      },
      (error) => {
        console.error("Error deleting proposal:", error);
      }
    );
  }

  approveProposition(propositionId: number): void {
    this.marketplaceService.approveProposition(propositionId).subscribe(
      (response) => {
        this.propositions = this.propositions.map((p) =>
          p.id === propositionId ? { ...p, status: "APPROVED" } : p
        );
        this.approvedProposition =
          this.propositions.find((p) => p.id === propositionId) || null;
      },
      (error) => {
        console.error("Error approving proposition:", error);
      }
    );
  }

  declineProposition(propositionId: number): void {
    this.marketplaceService.declineProposition(propositionId).subscribe(
      (response) => {
        this.propositions = this.propositions.map((p) =>
          p.id === propositionId ? { ...p, status: "DECLINED" } : p
        );
      },
      (error) => {
        console.error("Error declining proposition:", error);
      }
    );
  }

  openConfirmationDialog(): void {
    this.dialog.open(this.confirmationDialog);
  }

  downloadFileBtn(filePath: string): void {
    const fileName = filePath.split("/").pop() || filePath;
    this.marketplaceService.downloadFile(fileName).subscribe(
      (data) => {
        const blob = new Blob([data], { type: "application/octet-stream" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      },
      (error) => {
        console.error("Error downloading file:", error);
      }
    );
  }

  downloadFile(filePath: string): void {
    const fileName = filePath.split("/").pop() || filePath;
    this.marketplaceService.downloadFile(fileName).subscribe(
      (data) => {
        const blob = new Blob([data], { type: "application/octet-stream" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      },
      (error) => {
        console.error("Error downloading file:", error);
      }
    );
  }

  generateQRCode(propositionId: number) {
    this.marketplaceService.generateQRCode(propositionId).subscribe(
      (response) => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
          const result = reader.result;
          if (typeof result === "string") {
            this.qrCodeImage = result.split(",")[1]; // Extract base64 part
            this.openDialog();
          }
        };
      },
      (error) => {
        console.error("Error generating QR code", error);
      }
    );
  }

  openDialog(): void {
    this.dialog.open(this.qrCodeDialog);
  }
  deleteFile(propositionId: number): void {
    if (propositionId) {
      this.marketplaceService.deletePropositionFile(propositionId).subscribe(
        () => {
          console.log("File deleted successfully");
          // Remove filePath from the selected proposal
          if (this.selectedProposal) {
            this.selectedProposal.filePath = null;
          }
        },
        (error) => {
          console.error("Error deleting file:", error);
        }
      );
    } else {
      console.error("Proposition ID is not defined");
    }
  }
}
