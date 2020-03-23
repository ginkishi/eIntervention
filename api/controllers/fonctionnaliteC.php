<?php
        require_once(MODELS.DS."fonctionnaliteM.php");
class FonctionnaliteController {
    public function __construct(){}

    public function fonctionnalites() {
        $model = new TypeIntervention();
        $stmt = $model->listAllFonct();
        $num = $stmt->rowCount();
        if($num>0){
            
          $farr = array();
          $farr["fonctionnalites"] = array();
          while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
              $f = array(
                "F_ID" =>utf8_encode( $F_ID),
                "F_LIBELLE" => utf8_encode($F_LIBELLE)
              );
              array_push($farr["fonctionnalites"], $f);
          }
          header('Content-Type: application/json');
          http_response_code(200);
          echo json_encode($farr) ;
        } else {
          http_response_code(404);
          echo json_encode(
            array("message" => "Pas de type d'intervention.")
          );
      }
    }

    public function UneFonctionnalite($id) {
      $model = new TypeIntervention();
      $stmt = $model->OneFonctByID($id);
      $num = $stmt->rowCount();
      if($num>0){
        $farr = array();
        $farr["fonctionnalite"] = array();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        extract($row);
        $f = array(
            "F_ID" =>utf8_encode( $F_ID),
            "F_LIBELLE" => utf8_encode($F_LIBELLE)
        );
        array_push($farr["fonctionnalite"], $f);
        header('Content-Type: application/json');
        http_response_code(200);
        echo json_encode($farr) ;
        } else {
            http_response_code(404);
            echo json_encode(
            array("message" => "Pas de type d'intervention.")
            );
        }
    }

}
?>
