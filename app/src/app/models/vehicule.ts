import { RoleVhicule } from './rolevehicule';

export class Vehicule {
  constructor(
    public V_ID: number,
    public TV_CODE: string,
    public V_IMMATRICULATION: string,
    public V_INDICATIF: string,
    public V_MODELE: string,
    public V_ANNEE: number,
    public V_KM: number,
    public VP_LIBELLE: string,
    public TV_LIBELLE: string,
    public ROLE: RoleVhicule[]
  ) { }
}
