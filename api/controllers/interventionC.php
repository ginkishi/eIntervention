<?php
require_once(MODELS . DS . "interventionM.php");
require_once(MODELS . DS . "role_vehiculeM.php");
require_once(MODELS . DS . "vehiculeM.php");
class InterventionController
{
    public function __construct()
    {
    }
    public function vehiculeUtilise()
    {

        $model = new Intervention();
        $stmt = $model->listAllvehiculeUtilise();
        $num = $stmt->rowCount();
        if ($num > 0) {

            $farr = array();
            $farr["vehiculeutilise"] = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $v = array(
                    "IDVehicule" => $IDVehicule,
                    "DateDepart" => utf8_encode($DateDepart),
                    "DateArrive" => utf8_encode($DateArrive),
                    "DateRetour" => utf8_encode($DateRetour),
                    "Ronde" => utf8_encode($Ronde),
                );
                array_push($farr["vehiculeutilise"], $v);
            }
            header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode($farr);
        } else {
            http_response_code(404);
            echo json_encode(
                array("message" => "Pas de vehicule.")
            );
        }
    }


    public function interventions()
    {
        $model = new Intervention();
        $stmt = $model->listAllInterv();
        $num = $stmt->rowCount();
        if ($num > 0) {

            $farr = array();
            $farr["interventions"] = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $f = array(
                    "IDIntervention" => utf8_encode($IDIntervention),
                    "NIntervention" => utf8_encode($NIntervention),
                    "OPM" => utf8_encode($OPM),
                    "Commune" => utf8_encode($Commune),
                    "Adresse" => utf8_encode($Adresse),
                    "TypeIntervention" => utf8_encode($TypeIntervention),
                    "DateDeclenchement" => utf8_encode($DateDeclenchement),
                    "DateFin" => utf8_encode($DateFin),
                    "Important" => utf8_encode($Important),
                    "IDResponsable" => utf8_encode($IDResponsable),
                    "Requerant" => utf8_encode($Requerant),
                    "IDStatut" => utf8_encode($IDStatus),
                    "Statut" => utf8_encode($label)
                );
                array_push($farr["interventions"], $f);
            }
            header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode($farr);
        } else {
            http_response_code(404);
            echo json_encode(
                array("message" => "Pas d'intervention.")
            );
        }
    }
  
    public function interventionsForUser($id)
    {
        $model = new Intervention();
        $stmt = $model->listAllIntervUser($id);
        $num = $stmt->rowCount();
        if ($num > 0) {

            $farr = array();
            $farr["interventions"] = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $f = array(
                    "IDIntervention" => utf8_encode($IDIntervention),
                    "NIntervention" => utf8_encode($NIntervention),
                    "OPM" => utf8_encode($OPM),
                    "Commune" => utf8_encode($Commune),
                    "Adresse" => utf8_encode($Adresse),
                    "TypeIntervention" => utf8_encode($TypeIntervention),
                    "DateDeclenchement" => utf8_encode($DateDeclenchement),
                    "DateFin" => utf8_encode($DateFin),
                    "Important" => utf8_encode($Important),
                    "IDResponsable" => utf8_encode($IDResponsable),
                    "Requerant" => utf8_encode($Requerant),
                    "IDStatut" => utf8_encode($IDStatus),
                    "Statut" => utf8_encode($label)
                );
                array_push($farr["interventions"], $f);
            }
            header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode($farr);
        } else {
            http_response_code(404);
            echo json_encode(
                array("message" => "Pas d'intervention.")
            );
        }
    }
    public function setModification($id,$remarques){
        $model = new Intervention();
    
        $stmt = $model->setModification($id,$remarques);

    }
    public function getModification($id)
    {
        $model = new Intervention();
    
        $stmt = $model->getModification($id);
        $farr = array();
        $farr["modification"] = $stmt;
      
    
    header('Content-Type: application/json');
    http_response_code(200);
    echo json_encode($farr);
    }
    public function getInterventionByNum($id){
        $model = new Intervention();
        $stmt = $model->getInterventionByNum($id);
        $num = $stmt->rowCount();
        if ($num > 0) {

            $farr = array();
            $farr["interventions"] = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $f = array(
                    "IDIntervention" => utf8_encode($IDIntervention),
                    "NIntervention" => utf8_encode($NIntervention),
                    "OPM" => utf8_encode($OPM),
                    "Commune" => utf8_encode($Commune),
                    "Adresse" => utf8_encode($Adresse),
                    "TypeIntervention" => utf8_encode($TypeIntervention),
                    "DateDeclenchement" => utf8_encode($DateDeclenchement),
                    "DateFin" => utf8_encode($DateFin),
                    "Important" => utf8_encode($Important),
                    "IDResponsable" => utf8_encode($IDResponsable),
                    "Requerant" => utf8_encode($Requerant),
                    "IDStatut" => utf8_encode($IDStatus),
                    "Statut" => utf8_encode($label)
                );
                array_push($farr["interventions"], $f);
            }
            header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode($farr);
        } else {
            http_response_code(404);
            echo json_encode(
                array("message" => "Pas d'intervention.")
            );
        }
    }
    
    public function getInterventionID($numIntervention,$datedec,$heuredec){
        $model = new Intervention();
       // echo $numIntervention;
        // echo $datedec."coucou";
        // echo $heuredec;
        $stmt = $model-> getThisInterventionId($numIntervention,$datedec,$heuredec);
       
       
            $farr = array();
            $farr["intervention"] = $stmt;
          
        
        header('Content-Type: application/json');
        http_response_code(200);
        echo json_encode($farr);
    
}
    public function UneIntervention($id)
    {
        $model = new Intervention();
        $modelP =  new Pompier();
        $modelV =  new Vehicule();
        $stmt = $model->OneIntervByID($id);
        $num = $stmt->rowCount();
        if ($num > 0) {
            $farr = array();
            $farr["intervention"] = array();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            extract($row);
            $f = array(
                "IDIntervention" => utf8_encode($IDIntervention),
                "NIntervention" => utf8_encode($NIntervention),
                "OPM" => utf8_encode($OPM),
                "Commune" => utf8_encode($Commune),
                "Adresse" => utf8_encode($Adresse),
                "TypeIntervention" => utf8_encode($TypeIntervention),
                "DateDeclenchement" => utf8_encode($DateDeclenchement),
                "DateFin" => utf8_encode($DateFin),
                "Important" => utf8_encode($Important),
                "IDResponsable" => utf8_encode($IDResponsable),
                "Requerant" => utf8_encode($Requerant),
                "IDStatut" => utf8_encode($IDStatus),
                "Statut" => utf8_encode($label),
                "Vehicules" => array(),
            );

            $stmt2 = $model->listVehiculesForOneIntervention($IDIntervention);
            $numV = $stmt2->rowCount();
            if ($numV > 0) {
                while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
                    extract($row2);
                    $stmt22 = $modelV->OneVehiculeByID($IDVehicule);
                    $vehicule = $stmt22->fetch(PDO::FETCH_ASSOC);
                    extract($vehicule);
                    $v = array(
                        "IDVehicule" => $IDVehicule,
                        "V_IMMATRICULATION" => $V_IMMATRICULATION,
                        "V_MODELE" => $V_MODELE,
                        "V_INDICATIF" => $V_INDICATIF,
                        "DateDepart" => utf8_encode($DateDepart),
                        "DateArrive" => utf8_encode($DateArrive),
                        "DateRetour" => utf8_encode($DateRetour),
                        "Ronde" => utf8_encode($Ronde),
                        "Personnels" => array()
                    );
                    $stmt3 = $model->listPersonalForOneVehicule($IDIntervention, $IDVehicule);



                    while ($row3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
                        extract($row3);
                        $stmt4 = $modelP->OnePompierByID($IDPersonne);
                        $idr = "";
                        if ($IDrole != "0") {
                            $stmt5 = $modelV->listOneRole($TV_CODE, $IDrole);
                            $role = $stmt5->fetch(PDO::FETCH_ASSOC);
                            extract($role);
                            $idr = $ROLE_NAME;
                        } else {
                            $idr = "apprenti";
                        }


                        //echo $ROLE_NAME . "\n";

                        $pompier = $stmt4->fetch(PDO::FETCH_ASSOC);

                        extract($pompier);
                        $p = array(
                            "IDPersonne" => $IDPersonne,
                            "Personne" => utf8_encode($P_PRENOM . " " . $P_NOM),
                            "IDrole" => $IDrole,
                            "Role" => utf8_encode($idr)

                        );
                        array_push($v["Personnels"], $p);
                    }
                    array_push($f["Vehicules"], $v);
                }
            }
            array_push($farr["intervention"], $f);
            header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode($farr);
        } else {
            http_response_code(404);
            echo json_encode(
                array("message" => "Pas d'intervention.")
            );
        }
    }
    public function getlastInterventionID(){
        $model = new Intervention();
        $stmt = $model->getlastInterventionID();
        $farr = array();
        $farr["ID"] = $stmt;
      
    
    header('Content-Type: application/json');
    http_response_code(200);
    echo json_encode($farr);


    }
  
    public function AddMemberToVehicule($IDvehicule, $IDintervention,$IDrole,$nom)
    {
        $model = new Intervention();
        // echo $IDintervention ;
        $stmt = $model->AddMemberToVehicule($IDvehicule, $IDintervention,$IDrole,$nom);
    }

    public function addVehiculeToIntervention($IdVehicule, $IDintervention, $DateDepart, $HeureDepart, $DateArrive, $HeureArrive, $DateRetour, $HeureRetour, $Ronde)
    {
        $model = new Intervention();
   // echo $IDintervention ;
        $stmt = $model->addVehiculeToIntervention($IdVehicule, $IDintervention, $DateDepart, $HeureDepart, $DateArrive, $HeureArrive, $DateRetour, $HeureRetour, $Ronde);
    }
    public function addIntervention($numIntervention, $adresse, $commune, $opm, $typeIntervention, $important, $requerant, $dateDeclenchement, $heureDeclenchement, $dateFin, $heureFin, $responsable, $idcreateur, $status)
    {
        $model = new Intervention();
        $stmt = $model->addIntervention($numIntervention, $adresse, $commune, $opm, $typeIntervention, $important, $requerant, $dateDeclenchement, $heureDeclenchement, $dateFin, $heureFin, $responsable, $idcreateur, $status);
    }
    public function editIntervention($id, $numIntervention, $adresse, $commune, $opm, $typeIntervention, $important, $requerant, $dateDeclenchement, $heureDeclenchement, $dateFin, $heureFin, $responsable, $idcreateur, $status)
    {
        $model = new Intervention();
        $stmt = $model->editIntervention($id, $numIntervention, $adresse, $commune, $opm, $typeIntervention, $important, $requerant, $dateDeclenchement, $heureDeclenchement, $dateFin, $heureFin, $responsable, $idcreateur, $status);
    }

    public function deleteIntervention($id)
    {
        $model = new Intervention();
        $stmt = $model->deleteIntervention($id);
    }
  
    public function deleteVehiculeFromIntervention($idIntervention, $idVehicule)
    {
        $model = new Intervention();
        $stmt = $model->deleteVehiculeFromIntervention($idIntervention, $idVehicule);
    }
}