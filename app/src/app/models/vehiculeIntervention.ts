import { PersonnelIntervention } from "./personnelIntervention";

export class VehiculeIntervention {
  constructor(
    public IDVehicule: number,
    public V_IMMATRICULATION: string,
    public V_MODELE: string,
    public V_INDICATIF: string,
    public DateDepart: Date,
    public DateArrive: Date,
    public DateRetour: Date,
    public Ronde: number,
    public Personnels: PersonnelIntervention[]
  ) {}
}
