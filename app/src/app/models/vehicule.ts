import { RoleVhicule } from './rolevehicule';

export class Vehicule {
  constructor(
    public V_ID: number,
    public TV_CODE: String,
    public V_IMMATRICULATION: String,
    public V_INDICATIF: String,
    public V_MODELE: String,
    public V_ANNEE: number,
    public V_KM: number,
    public VP_LIBELLE: string,
    public TV_LIBELLE: String,
    public ROLE: RoleVhicule []
  ) {}
}
