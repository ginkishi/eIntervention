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
    // Récupère la liste de toute les interventions
    public function listAllInterv()
    {
        $sql = 'SELECT IDIntervention,NIntervention,OPM,Commune,Adresse,TypeIntervention,DateDeclenchement,DateFin,Important,IDResponsable,Requerant, s.IDStatus, s.label FROM interventions i JOIN status s on i.IDstatus = s.IDstatus';
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }

    // Récupère le nombre d'intervention au total
    public function getNumberOfIntervention()
    {
        $sql = 'select "All",COUNT(*) Numbers FROM interventions';
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }

    // Récupère le nombre d'intervention validée
    public function getNumberOfValid()
    {
        $sql = 'select "Valid",COUNT(*) Numbers FROM interventions where IDStatus = 3';
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
    // Récupère le nombre d'intervention en attente de validation par le chef
    public function getNumberOfWaiting()
    {
        $sql = 'select "Waiting",COUNT(*) Numbers FROM interventions where IDStatus = 1';
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }

    // Récupère le nombre d'intervention non validé par le responsable ou en attente de modifiaction
    public function getNumberOfNoValid()
    {
        $sql = 'select "NoValid",COUNT(*) Numbers FROM interventions where IDStatus = 2 or IDStatus = 0';
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }

    // Récupère la liste des interventions validées par le chef
    public function listAllIntervValid()
    {
        $sql = 'SELECT IDIntervention,NIntervention,OPM,Commune,Adresse,TypeIntervention,DateDeclenchement,DateFin,Important,IDResponsable,Requerant, s.IDStatus, s.label FROM interventions i JOIN status s on i.IDstatus = s.IDstatus where i.IDstatus = 3';
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }

    // Récupère la liste des interventions en attente de validations du chef
    public function listAllIntervWaiting()
    {
        $sql = 'SELECT IDIntervention,NIntervention,OPM,Commune,Adresse,TypeIntervention,DateDeclenchement,DateFin,Important,IDResponsable,Requerant, s.IDStatus, s.label FROM interventions i JOIN status s on i.IDstatus = s.IDstatus where i.IDstatus = 1';
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }

    // Récupère la liste des interventions non validé par le responsable
    public function listAllIntervNoValid()
    {
        $sql = 'SELECT IDIntervention,NIntervention,OPM,Commune,Adresse,TypeIntervention,DateDeclenchement,DateFin,Important,IDResponsable,Requerant, s.IDStatus, s.label FROM interventions i JOIN status s on i.IDstatus = s.IDstatus where i.IDstatus = 2 OR i.IDstatus = 0';
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
    // Récupère la liste des interventions pour un utilisateur (intervention personnalisée)
    public function listAllIntervUser($id)
    {
        $sql = 'SELECT IDIntervention,NIntervention,OPM,Commune,Adresse,TypeIntervention,DateDeclenchement,DateFin,Important,IDResponsable,Requerant, s.IDStatus, s.label FROM interventions i JOIN status s on i.IDstatus = s.IDstatus where IDResponsable = ' . $id;
        $sql2 = ' UNION SELECT i.IDIntervention,NIntervention,OPM,Commune,Adresse,TypeIntervention,DateDeclenchement,DateFin,Important,IDResponsable,Requerant, s.IDStatus, s.label FROM interventions i JOIN status s on i.IDstatus = s.IDstatus JOIN personnelduvehicule pv on pv.IDIntervention = i.IDIntervention where pv.IDPersonne = ' . $id . ";";
        $sql3 = $sql . $sql2;
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql3);
        $stmt->execute();
        return $stmt;
    }
    // Récupère l'intervention avec l'id mis en paramètre
    public function OneIntervByID($id)
    {
        $id = self::cleanUserInput($id);
        $sql = "SELECT i.IDIntervention,NIntervention,OPM,Commune,Adresse,TypeIntervention,DateDeclenchement,DateFin,Important,IDResponsable,Requerant,i.IDStatus,s.label FROM interventions i JOIN status s on i.IDstatus = s.IDstatus where IDIntervention = " . $id . ";";
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }

    public function getInterventionByNum($id)
    {
        $id = self::cleanUserInput($id);
        $sql = "SELECT i.IDIntervention,NIntervention,OPM,Commune,Adresse,TypeIntervention,DateDeclenchement,DateFin,Important,IDResponsable,Requerant,i.IDStatus,s.label FROM interventions i JOIN status s on i.IDstatus = s.IDstatus where NIntervention = " . $id . ";";
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;

    }
    public function getInterventionByAdr($adr)
    {
        $adr = self::cleanUserInput($adr);
        $sql = "SELECT i.IDIntervention,NIntervention,OPM,Commune,Adresse,TypeIntervention,DateDeclenchement,DateFin,Important,IDResponsable,Requerant,i.IDStatus,s.label FROM interventions i JOIN status s on i.IDstatus = s.IDstatus where Adresse = \"" . $adr .  "\";";
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
    public function getInterventionByRedac($redac){
     
        $res = explode(" ", $redac); // $res[0] = prenom
        $result = Pompier::getPompierID($res[0], $res[1])->fetch();
        $idredac = $result[0];
       // echo $idredac;
        $sql = "SELECT i.IDIntervention,NIntervention,OPM,Commune,Adresse,TypeIntervention,DateDeclenchement,DateFin,Important,IDResponsable,Requerant,i.IDStatus,s.label FROM interventions i JOIN status s on i.IDstatus = s.IDstatus where NIntervention = " . $idredac . ";";
      //  echo $sql;
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
        

    }

    public function  getInterventionByDate($date1,$date2){
      
        $date1=$date1." 00:00:00";
        $date2=$date2." 23:59:59";
        $sql = "SELECT i.IDIntervention,NIntervention,OPM,Commune,Adresse,TypeIntervention,DateDeclenchement,DateFin,Important,IDResponsable,Requerant,i.IDStatus,s.label FROM interventions i JOIN status s on i.IDstatus = s.IDstatus where DateDeclenchement > '" . $date1 ."' and DateDeclenchement < '" . $date2."';";
        //  echo $sql;
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
    // Récupère la liste du personnel pour un véhicule donné sur une interventions
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
    // Récupère les données de la table vehiculeutilise
    public function listAllvehiculeUtilise()
    {
        $sql = "SELECT IDVehicule,DateDepart,DateArrive,DateRetour,Ronde FROM `vehiculeutilise` ;";
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
    // Ajoute une nouvelle intervention
    public function addIntervention($numIntervention, $adresse, $commune, $opm, $typeIntervention, $important, $requerant, $dateDeclenchement, $heureDeclenchement, $dateFin, $heureFin, $responsable, $idcreateur, $status)
    {


        //$this->addVehiculeFromIntervention($id);

        $res = explode(" ", $responsable); // $res[0] = prenom
        $datedec = $dateDeclenchement . " " . $heureDeclenchement;
        $result = Pompier::getPompierID($res[0], $res[1])->fetch();
        $idresp = $result[0];

        $datef = $dateFin . " " . $heureFin;


        $sql = "INSERT INTO interventions (NIntervention, OPM, Commune, Adresse, TypeIntervention, Important, Requerant, DateDeclenchement, DateFin, IDResponsable, IDCreateur,IDstatus) VALUES('$numIntervention',$opm,'$commune','$adresse','$typeIntervention',$important,'$requerant','$datedec','$datef',$idresp,$idcreateur,$status);";

        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
    }
    public function getModification($id)
    {
        $dbh = BDD::getInstanceOfEIntervention();
        $sql = "SELECT Remarques FROM  remarquemodification where IDIntervention=$id";

        $query = $dbh->prepare($sql);
        $query->execute();
        $rmk = $query->fetch();
        return $rmk['Remarques'];
    }
    public function setModification($id, $remarques)
    {
        $dbh = BDD::getInstanceOfEIntervention();
        $sql = "INSERT INTO  `remarquemodification` ( IDIntervention, Remarques) VALUES($id,'$remarques');";
        echo $sql . "<br>";
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
    // Récupère la liste des interventions sur une tranche de date 
    public function getThisInterventionId($numIntervention, $datedec, $heuredec)
    {
        $datedec = $datedec . ' ' . $heuredec;

        $dbh = BDD::getInstanceOfEIntervention();
        $sql = "SELECT IDIntervention FROM  interventions where NIntervention=$numIntervention AND DateDeclenchement='$datedec'";

        $query = $dbh->prepare($sql);
        $query->execute();
        $ID = $query->fetch();
        //return 5;
        return $ID['IDIntervention'];
    }
    // Récupère l'id de la dernières intervention créée
    public function getlastInterventionID()
    {
        $dbh = BDD::getInstanceOfEIntervention();
        $sql = "SELECT IDIntervention FROM interventions ORDER BY IDIntervention DESC LIMIT 1";
        $query = $dbh->prepare($sql);
        $query->execute();
        $ID = $query->fetch();
        return $ID['IDIntervention'];
    }
    // Ajoute un véhicule sur une intervention
    public function  addVehiculeToIntervention($IdVehicule, $IDintervention, $datedepart, $heuredepart, $datearrive, $heurearrive, $dateretour, $heureretour, $ronde)
    {
        $datedepart = $datedepart . " " . $heuredepart;

        $datearrive = $datearrive . " " . $heurearrive;



        $dateretour = $dateretour . " " . $heureretour;


        $sql = "INSERT INTO  `vehiculeutilise` (IDVehicule, IDIntervention, DateDepart, DateArrive, DateRetour,Ronde) VALUES($IdVehicule,$IDintervention,'$datedepart','$datearrive', '$dateretour',$ronde);";



        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
    // Ajoute un pompier dans un véhicule sur une intervention avec un role
    public function AddMemberToVehicule($IDvehicule, $IDintervention, $IDrole, $nom)
    {
        $dbh = BDD::getInstanceOfEIntervention();
        $pieces = explode(" ", $nom);
        $IDPompier = Pompier::getPompierID($pieces[0], $pieces[1])->fetch();
        $IDPompier = $IDPompier[0];

        $sql = "INSERT INTO  `personnelduvehicule` (IDVehicule, IDPersonne, IDIntervention, IDrole) VALUES($IDvehicule, $IDPompier,$IDintervention, $IDrole);";

        $stmt = $dbh->prepare($sql);
        $stmt->execute();
    }
    // Edite l'intervention avec l'id
    public function editIntervention($id, $numIntervention, $adresse, $commune, $opm, $typeIntervention, $important, $requerant, $dateDeclenchement, $heureDeclenchement, $dateFin, $heureFin, $responsable, $idcreateur, $status)
    {


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

    // Supprime l'intervention avec l'id
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
        $sql1 = "DELETE FROM vehiculeutilise WHERE IDIntervention = $id;";
        $stmt = $dbh->prepare($sql1);
        $stmt->execute();
        $sql2 = "DELETE FROM vehiculeutilise WHERE IDIntervention = $id;";
        $stmt = $dbh->prepare($sql2);
        $stmt->execute();
        return $stmt;
    }

    // Supprime un véhicule sur une intervention
    public function deleteVehiculeFromIntervention($id)
    {


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