<?php
        require_once(MODELS.DS."vehiculeM.php");
class VehiculeController {
    public function __construct(){}

    public function vehicules() {
        $model = new Vehicule();
        $stmt = $model->listAllVehicule();
        $num = $stmt->rowCount();
        if($num>0){
            
          $varr = array();
          $varr["vehicules"] = array();
          while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
              $v = array(
                "V_ID" => $V_ID,
                "V_INDICATIF" => utf8_encode($V_INDICATIF),
                "V_MODELE" => utf8_encode($V_MODELE),
                "V_IMMATRICULATION" => utf8_encode($V_IMMATRICULATION),
                "V_KM" => $V_KM,
                "TV_CODE" => utf8_encode($TV_CODE),
                "V_ANNEE" => utf8_encode($V_ANNEE),
                "VP_LIBELLE" => utf8_encode($VP_LIBELLE),
                "TV_LIBELLE" => utf8_encode($TV_LIBELLE),
                "ROLE" => array()
              );
              $stmt2 = $model->listAllRole($TV_CODE);
              $num2 = $stmt2->rowCount();
              if($num2>0){
                while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)){
                  extract($row2);
                    $vR = array(
                      "ROLE_ID" => $ROLE_ID,
                      "ROLE_NAME" => utf8_encode($ROLE_NAME)
                    );
                    array_push($v["ROLE"], $vR);
                }
              }
              array_push($varr["vehicules"], $v);
          }
          header('Content-Type: application/json');
          http_response_code(200);
          echo json_encode($varr) ;
        } else {
          http_response_code(404);
          echo json_encode(
            array("message" => "Pas de vehicule.")
          );
        }
      }

      public function UnVehicule($id) {
        $model = new Vehicule();
        $stmt = $model->OneVehiculeByID($id);
        $num = $stmt->rowCount();
        if($num>0){
          $varr = array();
          $varr["vehicule"] = array();
          $row = $stmt->fetch(PDO::FETCH_ASSOC);
          extract($row);
            $v = array(
              "V_ID" => $V_ID,
              "V_INDICATIF" => utf8_encode($V_INDICATIF),
              "V_MODELE" => utf8_encode($V_MODELE),
              "V_IMMATRICULATION" => utf8_encode($V_IMMATRICULATION),
              "V_KM" => $V_KM,
              "TV_CODE" => utf8_encode($TV_CODE),
              "V_ANNEE" => utf8_encode($V_ANNEE),
              "VP_LIBELLE" => utf8_encode($VP_LIBELLE),
              "TV_LIBELLE" => utf8_encode($TV_LIBELLE),
              "ROLE" => array()
            );
            $stmt2 = $model->listAllRole($TV_CODE);
            $num2 = $stmt2->rowCount();
            if($num2>0){
              while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)){
                extract($row2);
                  $vR = array(
                    "ROLE_ID" => $ROLE_ID,
                    "ROLE_NAME" => utf8_encode($ROLE_NAME)
                  );
                  array_push($v["ROLE"], $vR);
              }
            }
            array_push($varr["vehicule"], $v);
          header('Content-Type: application/json');
          http_response_code(200);
          echo json_encode($varr) ;
        } else {
          http_response_code(404);
          echo json_encode(
            array("message" => "Pas de vehicule.")
          );
        }
      }

}
?>