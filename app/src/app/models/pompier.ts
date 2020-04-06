import { Droit } from "./droit";

export class Pompier {
  constructor(
    public P_ID: number,
    public P_CODE: string,
    public P_NOM: string,
    public P_PRENOM: string,
    public P_PRENOM2: string,
    public P_SEXE: string,
    public P_CIVILITE: number,
    public GP_ID: number,
    public GP_ID2: number,
    public ROLE: Droit[],
    public ROLE2: Droit[],
    public G_DESCRIPTION: string,
    public P_EMAIL: string
  ) {}
}
