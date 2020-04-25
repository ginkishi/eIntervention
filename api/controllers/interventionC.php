<?php
require_once(MODELS . DS . "interventionM.php");
require_once(MODELS . DS . "role_vehiculeM.php");
require_once(MODELS . DS . "vehiculeM.php");
class InterventionController
{
    public function __construct()
    {
    }

    // Retourne le json avec tout les véhicules utilisées
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

    // Retourne le json avec toute les interventions
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
                    "IDCreateur" => utf8_encode($IDCreateur),
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
    // Retourne le json avec le nombre d'intervention de chaque statut
    public function numberOfIntervention()
    {
        $model = new Intervention();
        $farr = array("Intervention" => array("All" => "0", "Valid" => "0", "Waiting" => "0", "NoValid" => "0"));
        $stmt = $model->getNumberOfIntervention();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        extract($row);
        $farr["Intervention"]["All"] = $Numbers;

        $stmt = $model->getNumberOfValid();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        extract($row);
        $farr["Intervention"]["Valid"] = $Numbers;

        $stmt = $model->getNumberOfWaiting();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        extract($row);
        $farr["Intervention"]["Waiting"] = $Numbers;

        $stmt = $model->getNumberOfNoValid();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        extract($row);
        $farr["Intervention"]["NoValid"] = $Numbers;

        header('Content-Type: application/json');
        http_response_code(200);
        echo json_encode($farr);
    }
    // Retourne le json avec toute les interventions validées
    public function interventionsValid()
    {
        $model = new Intervention();
        $stmt = $model->listAllIntervValid();
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
                    "IDCreateur" => utf8_encode($IDCreateur),
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
            http_response_code(200);
            echo json_encode(
                array("message" => "Pas d'intervention.")
            );
        }
    }
    // Retourne le json avec toute les interventions en attentes
    public function interventionsWaiting()
    {
        $model = new Intervention();
        $stmt = $model->listAllIntervWaiting();
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
                    "IDCreateur" => utf8_encode($IDCreateur),
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
            http_response_code(200);
            echo json_encode(
                array("message" => "Pas d'intervention.")
            );
        }
    }
    // Retourne le json avec toute les interventions non validées par le responsable
    public function interventionsNoValid()
    {
        $model = new Intervention();
        $stmt = $model->listAllIntervNoValid();
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
                    "IDCreateur" => utf8_encode($IDCreateur),
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
            http_response_code(200);
            echo json_encode(
                array("message" => "Pas d'intervention.")
            );
        }
    }
    // Retourne le json avec toute les interventions en lien avec l'id mis en paramètre
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
    // Rajoute les remarques à l'intervention
    public function setModification($id, $remarques)
    {
        $model = new Intervention();

        $stmt = $model->setModification($id, $remarques);
    }

    // Récupère les remarques sur l'intervention
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

    //// recherche
    public function getInterventionByNum($id)
    {
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
    public function getInterventionByAdr($adr)
    {
        $model = new Intervention();
        $stmt = $model->getInterventionByAdr($adr);
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
    public function getInterventionByRedac($redac)
    {
        $model = new Intervention();
        $stmt = $model->getInterventionByRedac($redac);
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
    public function getInterventionByDate($date1, $date2)
    {
        $model = new Intervention();
        $stmt = $model->getInterventionByDate($date1, $date2);
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
    public function getInterventionID($numIntervention, $datedec, $heuredec)
    {

        $model = new Intervention();
        $stmt = $model->getThisInterventionId($numIntervention, $datedec, $heuredec);


        $farr = array();
        $farr["intervention"] = $stmt;


        header('Content-Type: application/json');
        http_response_code(200);
        echo json_encode($farr);
    }

    // Retourne le json avec l'intervention avec l'id en paramètre
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

    // Retourne le json avec le dernier identifiant d'intervention 
    public function getlastInterventionID()
    {
        $model = new Intervention();
        $stmt = $model->getlastInterventionID();
        $farr = array();
        $farr["ID"] = $stmt;


        header('Content-Type: application/json');
        http_response_code(200);
        echo json_encode($farr);
    }
    // Rajoute les membres du personnel dans le véhicules en paramètre sur l'intervention 
    public function AddMemberToVehicule($IDvehicule, $IDintervention, $IDrole, $nom)
    {
        $model = new Intervention();
        $stmt = $model->AddMemberToVehicule($IDvehicule, $IDintervention, $IDrole, $nom);
    }
    // Rajoute le véhicule à l'intervention mis en paramètre
    public function addVehiculeToIntervention($IdVehicule, $IDintervention, $DateDepart, $HeureDepart, $DateArrive, $HeureArrive, $DateRetour, $HeureRetour, $Ronde)
    {
        $model = new Intervention();
        $stmt = $model->addVehiculeToIntervention($IdVehicule, $IDintervention, $DateDepart, $HeureDepart, $DateArrive, $HeureArrive, $DateRetour, $HeureRetour, $Ronde);
    }

    // Rajoute l'intervention
    public function addIntervention($numIntervention, $adresse, $commune, $opm, $typeIntervention, $important, $requerant, $dateDeclenchement, $heureDeclenchement, $dateFin, $heureFin, $responsable, $idcreateur, $status)
    {
        $model = new Intervention();
        $stmt = $model->addIntervention($numIntervention, $adresse, $commune, $opm, $typeIntervention, $important, $requerant, $dateDeclenchement, $heureDeclenchement, $dateFin, $heureFin, $responsable, $idcreateur, $status);
    }
    // Edite l'intervention avec l'id en paramètre
    public function editIntervention($id, $numIntervention, $adresse, $commune, $opm, $typeIntervention, $important, $requerant, $dateDeclenchement, $heureDeclenchement, $dateFin, $heureFin, $responsable, $idcreateur, $status)
    {
        $model = new Intervention();
        $stmt = $model->editIntervention($id, $numIntervention, $adresse, $commune, $opm, $typeIntervention, $important, $requerant, $dateDeclenchement, $heureDeclenchement, $dateFin, $heureFin, $responsable, $idcreateur, $status);
    }
    // Supprime l'intervention avec l'id mis en paramètre
    public function deleteIntervention($id)
    {
        $model = new Intervention();
        $stmt = $model->deleteIntervention($id);
    }
    // Supprime le véhicule de l'intervention mis en paramètre
    public function deleteVehiculeFromIntervention($idIntervention, $idVehicule)
    {
        $model = new Intervention();
        $stmt = $model->deleteVehiculeFromIntervention($idIntervention, $idVehicule);
    }
}