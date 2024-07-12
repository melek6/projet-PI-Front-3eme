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
  deadline: string;
  budget: number;
  user: User;
}

@Component({
  selector: "app-user-marketplace",
  templateUrl: "./user-marketplace.component.html",
  styleUrls: ["./user-marketplace.component.css"],
})
export class UserMarketplaceComponent implements OnInit {
  projects: ProjectDTO[] = [];
  approvedPropositions: { [projectId: number]: boolean } = {};
  proposalForm: FormGroup;
  selectedProjectId: number | null = null;
  @ViewChild("confirmationDialog") confirmationDialog!: TemplateRef<any>;

  constructor(
    private marketplaceService: UserMarketplaceService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.proposalForm = this.fb.group({
      detail: ["", Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      file: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.marketplaceService.getAllProjects().subscribe(
      (data) => {
        this.projects = data;
        this.loadApprovedPropositions();
      },
      (error) => {
        console.error("Error fetching projects", error);
      }
    );
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.proposalForm.patchValue({
        file: file,
      });
    }
  }

  submitProposal(projectId: number): void {
    if (this.proposalForm.valid) {
      const { detail, amount, file } = this.proposalForm.value;
      this.marketplaceService
        .submitProposal(projectId, detail, amount, file)
        .subscribe(
          (response) => {
            console.log("Proposal submitted successfully", response);
            this.openConfirmationDialog(); // Open the confirmation dialog
            this.closeProposalForm(); // Close the form after submission
          },
          (error) => {
            console.error("Error submitting proposal", error);
          }
        );
    }
  }

  openConfirmationDialog(): void {
    this.dialog.open(this.confirmationDialog);
  }

  openProposalForm(projectId: number): void {
    this.selectedProjectId = projectId;
  }

  closeProposalForm(): void {
    this.selectedProjectId = null;
    this.proposalForm.reset(); // Reset the form after closing
  }

  loadApprovedPropositions(): void {
    this.marketplaceService.getApprovedPropositions().subscribe(
      (data) => {
        data.forEach((proposition) => {
          if (proposition.status === "APPROVED") {
            this.approvedPropositions[proposition.project.id] = true;
          }
        });
      },
      (error) => {
        console.error("Error fetching approved propositions", error);
      }
    );
  }
}
