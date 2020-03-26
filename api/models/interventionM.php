<?php
require_once(PDO_PATH);
require_once(MODELS . DS . "pompierM.php");
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


    public function addIntervention($numeroIntervention,$commune, $adresse, $opm, $typeIntervention, $important, $requerant, $dateDeclenchement, $heureDeclenchement, $dateFin, $heureFin, $responsable, $idcreateur, $status)
    {
        //DELETE FROM personnelduvehicule WHERE IDIntervention = $id;
        //DELETE FROM vehiculeutilise WHERE IDIntervention = $id;
        //DELETE FROM interventions WHERE IDIntervention = $id;

        //$this->addVehiculeFromIntervention($id);
        $res = explode(" ", $responsable); // $res[0] = prenom
        $datedec = $dateDeclenchement . " " . $heureDeclenchement;
        $idresp = Pompier::getPompierID($res[0], $res[1]);
        $datef = $dateFin . " " . $heureFin;
        $sql = "INSERT INTO interventions (NIntervention, OPM, Commune, Adresse, TypeIntervention, Important, Requerant, DateDeclenchement, DateFin, IDResponsable, IDCreateur,IDstatus) VALUES($numeroIntervention,$opm,'$commune','$adresse', '$typeIntervention',$important,'$requerant','$datedec','$datef',$idresp,$idcreateur, $status);";
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }


    public function deleteIntervention($id)
    {
        //DELETE FROM personnelduvehicule WHERE IDIntervention = $id;
        //DELETE FROM vehiculeutilise WHERE IDIntervention = $id;
        //DELETE FROM interventions WHERE IDIntervention = $id;
        $id = self::cleanUserInput($id);
        $this->deleteVehiculeFromIntervention($id);
        $sql = "DELETE FROM interventions WHERE IDIntervention = " . $id . ";";
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
    public function deleteVehiculeFromIntervention($id)
    {
        //DELETE FROM personnelduvehicule WHERE IDIntervention = $id;
        //DELETE FROM vehiculeutilise WHERE IDIntervention = $id;

        $id = self::cleanUserInput($id);
        $sql = "DELETE FROM personnelduvehicule WHERE IDIntervention = " . $id . ";";
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        $sql = "DELETE FROM vehiculeutilise WHERE IDIntervention = " . $id . ";";
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
}