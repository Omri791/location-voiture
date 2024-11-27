export interface Car {
  id?: number;
  marque: string;
  modele: string;
  prixParJour: number;
}

export interface Client {
  id?: number;
  nom: string;
  email: string;
  telephone: string;
}

export interface Agency {
  id?: number;
  nom: string;
  adresse: string;
}

export interface location {
  id?: number;
  dateDebut: string;
  dateFin: string;
  client_id: number;
  voiture_id: number;
  client?: Client;
  voiture?: Car;
}