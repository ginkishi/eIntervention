<?php
require_once(PDO_PATH);
class Intervention
{
    public function construct()
    {
    }

    private static function cleanUserInput($input)
    {
        $input = htmlentities($input);
        return $input;
    }

    public function listAllInterv()
    {
        $sql = 'SELECT IDIntervention,NIntervention,OPM,Commune,Adresse,TypeIntervention,DateDeclenchement,DateFin,Important,IDResponsable,Requerant, s.IDStatus, s.label FROM interventions i JOIN status s on i.IDstatus = s.IDstatus';
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }

    public function OneIntervByID($id)
    {
        $id = self::cleanUserInput($id);
        $sql = "SELECT i.IDIntervention,NIntervention,OPM,Commune,Adresse,TypeIntervention,DateDeclenchement,DateFin,Important,IDResponsable,Requerant,i.IDStatus,s.label FROM interventions i JOIN status s on i.IDstatus = s.IDstatus where IDIntervention = " . $id . ";";
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
    public function listVehiculesForOneIntervention($id)
    {
        $id = self::cleanUserInput($id);
        $sql = "SELECT IDVehicule,DateDepart,DateArrive,DateRetour,Ronde FROM `vehiculeutilise` WHERE IDIntervention = " . $id . ";";
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
    public function listPersonalForOneVehicule($idIntervention, $idVehicule)
    {
        $idIntervention = self::cleanUserInput($idIntervention);
        $idVehicule = self::cleanUserInput($idVehicule);
        $sql = "SELECT IDPersonne,IDrole FROM `personnelduvehicule` WHERE IDIntervention = " . $idIntervention . " AND IDVehicule = " . $idVehicule . ";";
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
}