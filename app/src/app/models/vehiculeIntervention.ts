import { PersonnelIntervention } from "./personnelIntervention";

export class VehiculeIntervention {
  constructor(
    public IDVehicule: number,
    public DateDepart: Date,
    public DateArrive: Date,
    public DateRetour: Date,
    public Ronde: number,
    public Personnels: PersonnelIntervention[]
  ) {}
}
