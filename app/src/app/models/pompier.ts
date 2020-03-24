import { Droit } from "./droit";

export interface Pompier {
  P_ID: number;
  P_CODE: string;
  P_NOM: string;
  P_PRENOM: string;
  P_PRENOM2: string;
  P_SEXE: string;
  P_CIVILITE: number;
  GP_ID: number;
  GP_ID2: number;
  ROLE: Droit[];
  ROLE2: Droit[];
  G_DESCRIPTION: string;
  P_EMAIL: string;
}
