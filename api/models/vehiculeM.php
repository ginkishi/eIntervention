<?php
require_once(PDO_PATH);
class Vehicule {
  public function __construct(){}

  private static function cleanUserInput($input)
	{
		$input = htmlentities($input);
		return $input;
	}

  public function listAllVehicule() {
    //V_ID ,V_INDICATIF ,V_MODELE ,V_IMMATRICULATION ,V_ANNEE ,V_KM ,VP_LIBELLE ,TV_LIBELLE
    $sql="SELECT V_ID ,V_INDICATIF ,V_MODELE ,V_IMMATRICULATION ,V_ANNEE ,V_KM ,VP_LIBELLE ,TV_LIBELLE, v.TV_CODE FROM `vehicule` v JOIN vehicule_position vp on v.VP_ID = vp.VP_ID JOIN type_vehicule tv on tv.TV_CODE = v.TV_CODE";
    $dbh = BDD::getInstance();
    $stmt=$dbh->prepare($sql);
    $stmt->execute();
    return $stmt;
  }

  
  public function OneVehiculeByID($id) {
    $id = self::cleanUserInput($id);
    $sql="SELECT V_ID ,V_INDICATIF ,V_MODELE ,V_IMMATRICULATION ,V_ANNEE ,V_KM ,VP_LIBELLE ,TV_LIBELLE, v.TV_CODE FROM `vehicule` v JOIN vehicule_position vp on v.VP_ID = vp.VP_ID JOIN type_vehicule tv on tv.TV_CODE = v.TV_CODE WHERE V_ID = " . $id . ";";
    $dbh = BDD::getInstance();
    $stmt=$dbh->prepare($sql);
    $stmt->execute();
    return $stmt;
  }


  public function listAllRole($tvCode) {
    $sql="SELECT ROLE_ID, ROLE_NAME FROM `type_vehicule_role` WHERE TV_CODE = \"". $tvCode . "\" ORDER BY ROLE_ID ASC;";
    $dbh = BDD::getInstance();
    $stmt=$dbh->prepare($sql);
    $stmt->execute();
    return $stmt;
  }


}
?>