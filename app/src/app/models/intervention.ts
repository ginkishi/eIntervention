import { VehiculeIntervention } from "./vehiculeIntervention";

export class Intervention {
  constructor(
    public IDIntervention: number,
    public NIntervention: number,
    public OPM: number,
    public Commune: string,
    public Adresse: string,
    public TypeIntervention: string,
    public DateDeclenchement: Date,
    public DateFin: Date,
    public Important: number,
    public IDResponsable: number,
    public IDCreateur: number,
    public Requerant: string,
    public IDStatut: number,
    public Statut: string,
    public Vehicules: VehiculeIntervention[]
  ) { }
}
