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
    public function listAllIntervUser($id)
    {
        $sql = 'SELECT IDIntervention,NIntervention,OPM,Commune,Adresse,TypeIntervention,DateDeclenchement,DateFin,Important,IDResponsable,Requerant, s.IDStatus, s.label FROM interventions i JOIN status s on i.IDstatus = s.IDstatus where IDResponsable = ' . $id . ";";
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
        $sql = "SELECT IDVehicule,DateDepart,DateArrive,DateRetour,Ronde FROM `vehiculeutilise` WHERE IDIntervention = " . $id;
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

    public function listAllvehiculeUtilise()
    {
        $sql = "SELECT IDVehicule,DateDepart,DateArrive,DateRetour,Ronde FROM `vehiculeutilise` ;";
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
    public function addIntervention($numIntervention, $adresse, $commune, $opm, $typeIntervention, $important, $requerant, $dateDeclenchement, $heureDeclenchement, $dateFin, $heureFin, $responsable, $idcreateur, $status)
    {
        //DELETE FROM personnelduvehicule WHERE IDIntervention = $id;
        //DELETE FROM vehiculeutilise WHERE IDIntervention = $id;
        //DELETE FROM interventions WHERE IDIntervention = $id;

        //$this->addVehiculeFromIntervention($id);

        $res = explode(" ", $responsable); // $res[0] = prenom
        $datedec = $dateDeclenchement . " " . $heureDeclenchement;
        $result = Pompier::getPompierID($res[0], $res[1])->fetch();
        $idresp = $result[0];

        $datef = $dateFin . " " . $heureFin;

        //$sql = "INSERT INTO interventions (NIntervention, OPM, Commune, Adresse, TypeIntervention, Important, Requerant, DateDeclenchement, DateFin, IDResponsable, IDCreateur,IDstatus) VALUES($numIntervention,$opm,'$commune','$adresse', '$typeIntervention',$important,'$requerant','$datedec','$datef',$idresp,$idcreateur, $status);";
        $sql = "INSERT INTO interventions (NIntervention, OPM, Commune, Adresse, TypeIntervention, Important, Requerant, DateDeclenchement, DateFin, IDResponsable, IDCreateur,IDstatus) VALUES('$numIntervention',$opm,'$commune','$adresse','$typeIntervention',$important,'$requerant','$datedec','$datef',$idresp,$idcreateur,$status);";
        //echo $sql;
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        
    }

    public function getThisInterventionId($numIntervention,$datedec,$heuredec)
    {   
       $datedec=$datedec.' '.$heuredec;
      
      // $numIntervention=2515;
      //  echo"hello".   $datedec. "<br>";
    //  echo $numIntervention;
    //  echo $datedec;
    //  echo $heuredec.'c';
        $dbh = BDD::getInstanceOfEIntervention();
        $sql="SELECT IDIntervention FROM  interventions where NIntervention=$numIntervention AND DateDeclenchement='$datedec'";
     //  echo $sql. "<br>";
        $query = $dbh->prepare($sql);
        $query->execute();
        $ID = $query->fetch();
        //return 5;
        return $ID['IDIntervention'];
    }
    
    public function getlastInterventionID()
    { 
        $dbh = BDD::getInstanceOfEIntervention();
        $sql="SELECT IDIntervention FROM interventions ORDER BY IDIntervention DESC LIMIT 1";
        $query = $dbh->prepare($sql);
        $query->execute();
        $ID = $query->fetch();
        return $ID['IDIntervention'];

    }

    public function  addVehiculeToIntervention($IdVehicule, $IDintervention, $datedepart, $heuredepart, $datearrive, $heurearrive, $dateretour, $heureretour, $ronde)
    {
        $datedepart = $datedepart . " " . $heuredepart;

        //	echo $datearrive . "<br>";
        //	echo $heurearrive . "<br>";
        $datearrive = $datearrive . " " . $heurearrive;
        //	echo $ronde . "<br>";

        //	echo $heureretour . "<br>";


        $dateretour = $dateretour . " " . $heureretour;


        $sql = "INSERT INTO  `vehiculeutilise` (IDVehicule, IDIntervention, DateDepart, DateArrive, DateRetour,Ronde) VALUES($IdVehicule,$IDintervention,'$datedepart','$datearrive', '$dateretour',$ronde);";


     // echo $sql;
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
    public function AddMemberToVehicule($IDvehicule, $IDintervention,$IDrole,$nom){
             $dbh = BDD::getInstanceOfEIntervention();
             $pieces = explode(" ", $nom);
             $IDPompier =Pompier::getPompierID($pieces[0], $pieces[1])->fetch();
             $IDPompier = $IDPompier[0];
            
            $sql="INSERT INTO  `personnelduvehicule` (IDVehicule, IDPersonne, IDIntervention, IDrole) VALUES($IDvehicule, $IDPompier,$IDintervention, $IDrole);";
      //  echo $sql;
            $stmt = $dbh->prepare($sql);
            $stmt->execute();

    }

    public function editIntervention($id, $numIntervention, $adresse, $commune, $opm, $typeIntervention, $important, $requerant, $dateDeclenchement, $heureDeclenchement, $dateFin, $heureFin, $responsable, $idcreateur, $status)
    {
        //DELETE FROM personnelduvehicule WHERE IDIntervention = $id;
        //DELETE FROM vehiculeutilise WHERE IDIntervention = $id;
        //DELETE FROM interventions WHERE IDIntervention = $id;

        //$this->addVehiculeFromIntervention($id);
        $this->deleteVehiculeFromIntervention($id);
        $res = explode(" ", $responsable); // $res[0] = prenom
        $datedec = $dateDeclenchement . " " . $heureDeclenchement;
        $idresp = Pompier::getPompierID($res[0], $res[1]);
        $datef = $dateFin . " " . $heureFin;
        $sql = "UPDATE interventions SET NIntervention = $numIntervention,OPM = $opm, Commune = '$commune', Adresse = '$adresse', TypeIntervention = '$typeIntervention', Important = $important, Requerant = '$requerant', DateDeclenchement = '$datedec', DateFin = '$datef', IDResponsable = $idresp WHERE IDIntervention = $id";
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
        $sql1="DELETE FROM vehiculeutilise WHERE IDIntervention = $id;";
        $stmt = $dbh->prepare($sql1);
        $stmt->execute();
        $sql2="DELETE FROM vehiculeutilise WHERE IDIntervention = $id;";
        $stmt = $dbh->prepare($sql2);
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