<?php
require_once(MODELS . DS . "pompierM.php");
class PompierController
{
    public function __construct()
    {
    }

    public function authentification($code, $mp)
    {
        $model = new Pompier();
        $mp = md5($mp);
        $stmt = $model->getUser($code, $mp);
        $num = $stmt->rowCount();
        if ($num > 0) {

            $parr = array();
            $parr["pompier"] = array();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            extract($row);
            $p = array(
                "P_ID" => $P_ID,
                "P_CODE" => utf8_encode($P_CODE),
                "P_NOM" => utf8_encode($P_NOM),
                "P_PRENOM" => utf8_encode($P_PRENOM),
                "P_GRADE" => utf8_encode($P_GRADE),
                "ROLE" => array(),
                "ROLE2" => array()
            );
            $stmt2 = $model->listAllRole($GP_ID);
            $num2 = $stmt2->rowCount();
            if ($num2 > 0) {
                while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
                    extract($row2);
                    array_push($p["ROLE"], $F_ID);
                }
            }
            $stmt3 = $model->listAllRole($GP_ID2);
            $num3 = $stmt3->rowCount();
            if ($num3 > 0) {
                while ($row3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
                    extract($row3);
                    array_push($p["ROLE2"], $F_ID);
                }
            }
            array_push($parr["pompier"], $p);
            //header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode($parr);
        } else {
            http_response_code(200);
            echo json_encode(
                array("message" => "Pas de pompier.")
            );
        }
    }


    public function pompiers()
    {
        $model = new Pompier();
        $stmt = $model->listAllPompier();
        $num = $stmt->rowCount();
        if ($num > 0) {

            $parr = array();
            $parr["pompiers"] = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $p = array(
                    "P_ID" => $P_ID,
                    "P_CODE" => utf8_encode($P_CODE),
                    "P_NOM" => utf8_encode($P_NOM),
                    "P_PRENOM" => utf8_encode($P_PRENOM),
                    "P_PRENOM2" => utf8_encode($P_PRENOM2),
                    "P_SEXE" => utf8_encode($P_SEXE),
                    "P_CIVILITE" => utf8_encode($P_CIVILITE),
                    "P_GRADE" => utf8_encode($P_GRADE),
                    "GP_ID" => $GP_ID,
                    "GP_ID2" => $GP_ID2,
                    "ROLE" => array(),
                    "ROLE2" => array()
                );
                $stmt2 = $model->listAllRole($GP_ID);
                $num2 = $stmt2->rowCount();
                if ($num2 > 0) {
                    while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
                        extract($row2);
                        array_push($p["ROLE"], $F_ID);
                    }
                }
                $stmt3 = $model->listAllRole($GP_ID2);
                $num3 = $stmt3->rowCount();
                if ($num3 > 0) {
                    while ($row3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
                        extract($row3);
                        array_push($p["ROLE2"], $F_ID);
                    }
                }
                array_push($parr["pompiers"], $p);
            }
            //header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode($parr);
        } else {
            http_response_code(404);
            echo json_encode(
                array("message" => "Pas de pompier.")
            );
        }
    }


    public function UnPompier($id)
    {
        $model = new Pompier();
        $stmt = $model->OnePompierByID($id);
        $num = $stmt->rowCount();
        if ($num > 0) {

            $parr = array();
            $parr["pompier"] = array();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            extract($row);
            $p = array(
                "P_ID" => $P_ID,
                "P_CODE" => utf8_encode($P_CODE),
                "P_NOM" => utf8_encode($P_NOM),
                "P_PRENOM" => utf8_encode($P_PRENOM),
                "P_PRENOM2" => utf8_encode($P_PRENOM2),
                "P_SEXE" => utf8_encode($P_SEXE),
                "P_CIVILITE" => utf8_encode($P_CIVILITE),
                "P_GRADE" => utf8_encode($P_GRADE),
                "P_EMAIL" => utf8_encode($P_EMAIL),
                "P_BIRTHDATE" => utf8_encode($P_BIRTHDATE),
                "G_DESCRIPTION" => utf8_encode($G_DESCRIPTION),
                "GP_ID" => $GP_ID,
                "GP_ID2" => $GP_ID2,
                "ROLE" => array(),
                "ROLE2" => array()
            );
            $stmt2 = $model->listAllRole($GP_ID);
            $num2 = $stmt2->rowCount();
            if ($num2 > 0) {
                while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
                    extract($row2);

					$f = array(
					"F_ID" => $F_ID,
					"F_LIBELLE" => utf8_encode($F_LIBELLE)
					);
                    array_push($p["ROLE"], $f);
                }
            }
            $stmt3 = $model->listAllRole($GP_ID2);
            $num3 = $stmt3->rowCount();
            if ($num3 > 0) {
                while ($row3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
                    extract($row3);
					$f = array(
					"F_ID" => $F_ID,
					"F_LIBELLE" => utf8_encode($F_LIBELLE)
					);
                    array_push($p["ROLE2"], $f);
                }
            }
            array_push($parr["pompier"], $p);
            //header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode($parr);
        } else {
            http_response_code(404);
            echo json_encode(
                array("message" => "Pas de pompier.")
            );
        }
    }
}