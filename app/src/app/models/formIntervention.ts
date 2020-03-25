export interface FormIntervention 
{
    numeroIntervention: number;
    commune: string;
    adresse: string;
    typeIntervention: string;
    requerant: string;
    opm: boolean;
    important: boolean;
    dateDeclenchement: Date;
    heureDeclenchement: Date;
    dateFin: Date;
    heureFin: Date;
    responsable: string;



}