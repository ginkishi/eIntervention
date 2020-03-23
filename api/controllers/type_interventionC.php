<?php
require_once(MODELS . DS . "type_interventionM.php");
class typeInterventionController
{
  public function __construct()
  {
  }

  public function typesIntervention()
  {
    $model = new TypeIntervention();
    $stmt = $model->listAll();
    $num = $stmt->rowCount();
    if ($num > 0) {

      $tiarr = array();
      $tiarr["typeIntervention"] = array();
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $ti = array(
          "TI_CODE" => utf8_encode($TI_CODE),
          "TI_DESCRIPTION" => utf8_encode($TI_DESCRIPTION),
          "CI_CODE" => utf8_encode($CI_CODE)
        );
        array_push($tiarr["typeIntervention"], $ti);
      }
      header('Content-Type: application/json');
      http_response_code(200);
      echo json_encode($tiarr);
    } else {
      http_response_code(404);
      echo json_encode(
        array("message" => "Pas de type d'intervention.")
      );
    }
  }

  public function UnTypeIntervention($id)
  {
    $model = new TypeIntervention();
    $stmt = $model->OneTIByID($id);
    // var_dump($stmt);
    $num = $stmt->rowCount();
    if ($num > 0) {
      $tiarr = array();
      $tiarr["typeIntervention"] = array();
      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      extract($row);
      $ti = array(
        "TI_CODE" => utf8_encode($TI_CODE),
        "TI_DESCRIPTION" => utf8_encode($TI_DESCRIPTION),
        "CI_CODE" => utf8_encode($CI_CODE)
      );
      array_push($tiarr["typeIntervention"], $ti);
      header('Content-Type: application/json');
      http_response_code(200);
      echo json_encode($tiarr);
    } else {
      http_response_code(404);
      echo json_encode(
        array("message" => "Pas de type d'intervention.")
      );
    }
  }
}