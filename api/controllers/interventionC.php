<?php
require_once(MODELS . DS . "interventionM.php");
require_once(MODELS . DS . "vehiculeM.php");

class InterventionController
{
    public function __construct()
    {
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
                    "IDStatus" => utf8_encode($IDStatus),
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

    public function UneIntervention($id)
    {
        $model = new Intervention();
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
                "IDStatus" => utf8_encode($IDStatus),
                "Statut" => utf8_encode($label),
                "Vehicules" => array(),
            );

            $stmt2 = $model->listVehiculesForOneIntervention($IDIntervention);
            $numV = $stmt2->rowCount();
            if ($numV > 0) {
                while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
                    extract($row2);

                    $v = array(
                        "IDVehicule" => $IDVehicule,
                        "DateDepart" => utf8_encode($DateDepart),
                        "DateArrive" => utf8_encode($DateArrive),
                        "DateRetour" => utf8_encode($DateRetour),
                        "Ronde" => utf8_encode($Ronde),
                        "Personnels" => array()
                    );
                    $stmt3 = $model->listPersonalForOneVehicule($IDIntervention, $IDVehicule);
                    while ($row3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
                        extract($row3);
                        $p = array(
                            "IDPersonne" => $IDPersonne,
                            "IDRole" => $IDrole
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

    public function addIntervention($nummeroIntervention, $adresse, $commune, $opm, $typeIntervention, $important, $requerant, $dateDeclenchement, $heureDeclenchement, $dateFin, $heureFin, $responsable, $idcreateur, $status)
    {
        $model = new Intervention();
        $stmt = $model->addIntervention($numeroIntervention, $adresse, $commune, $opm, $typeIntervention, $important, $requerant, $dateDeclenchement, $heureDeclenchement, $dateFin, $heureFin, $responsable, $idcreateur, $status);
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