export interface InscriptionFormation {
  id: number;
  user: any;  // Remplacez par votre modèle utilisateur
  formation: any;  // Remplacez par votre modèle formation
  etat: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  registrationDate: Date;
}
