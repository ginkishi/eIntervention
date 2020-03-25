<?php
require_once(MODELS . DS . "statut_interventionM.php");
class statutInterventionController
{
    public function __construct()
    {
    }

    public function statutsIntervention()
    {
        $model = new StatutIntervention();
        $stmt = $model->listAllStatut();
        $num = $stmt->rowCount();
        if ($num > 0) {

            $tiarr = array();
            $tiarr["statutIntervention"] = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $ti = array(
                    "IDStatut" => utf8_encode($IDStatus),
                    "Label" => utf8_encode($Label)
                );
                array_push($tiarr["statutIntervention"], $ti);
            }
            header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode($tiarr);
        } else {
            http_response_code(404);
            echo json_encode(
                array("message" => "Pas de statut d'intervention.")
            );
        }
    }

    public function UnStatutIntervention($id)
    {
        $model = new StatutIntervention();
        $stmt = $model->OneStatutByID($id);
        // var_dump($stmt);
        $num = $stmt->rowCount();
        if ($num > 0) {
            $tiarr = array();
            $tiarr["statutIntervention"] = array();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            extract($row);
            $ti = array(
                "IDStatut" => utf8_encode($IDStatus),
                "Label" => utf8_encode($Label),

            );
            array_push($tiarr["statutIntervention"], $ti);
            header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode($tiarr);
        } else {
            http_response_code(404);
            echo json_encode(
                array("message" => "Pas de statut d'intervention.")
            );
        }
    }
}