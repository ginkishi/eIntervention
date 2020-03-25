<?php
require_once(PDO_PATH);
class Pompier
{
  public function __construct()
  {
  }

  private static function cleanUserInput($input)
  {
    $input = htmlentities($input);
    return $input;
  }


  public function getUser($code, $mp)
  {
    $code = self::cleanUserInput($code);
    $sql = "SELECT P_ID,P_CODE,P_NOM, P_PRENOM, P_GRADE, GP_ID, GP_ID2 FROM `pompier` WHERE P_CODE = \"" . $code .  "\" AND P_MDP = \"" . $mp . "\";";
    $dbh = BDD::getInstanceOfEBrigade();
    $stmt = $dbh->prepare($sql);
    $stmt->execute();
    return $stmt;
  }
  public static function getPompierID($prenom, $nom)
  {

    $sql = "SELECT P_ID FROM `pompier` WHERE P_PRENOM = \"" . $prenom .  "\" AND P_NOM = \"" . $nom . "\";";
    $dbh = BDD::getInstanceOfEBrigade();
    $stmt = $dbh->prepare($sql);
    $stmt->execute();
    return $stmt;
  }



  public function listAllPompier()
  {
    $sql = "SELECT P_ID,P_CODE,P_NOM, P_PRENOM, P_PRENOM2, P_SEXE, P_CIVILITE , P_GRADE, GP_ID, GP_ID2 FROM `pompier`;";
    $dbh = BDD::getInstanceOfEBrigade();
    $stmt = $dbh->prepare($sql);
    $stmt->execute();
    return $stmt;
  }


  public function OnePompierByID($id)
  {
    $id = self::cleanUserInput($id);
    $sql = "SELECT P_ID,P_CODE,P_NOM, P_PRENOM, P_PRENOM2, P_SEXE, P_CIVILITE , P_GRADE,G_DESCRIPTION,P_EMAIL,P_BIRTHDATE, GP_ID, GP_ID2 FROM `pompier` JOIN grade on P_GRADE = G_GRADE  WHERE P_ID = " . $id . ";";
    $dbh = BDD::getInstanceOfEBrigade();
    $stmt = $dbh->prepare($sql);
    $stmt->execute();
    return $stmt;
  }

  public function listAllRole($hab)
  {
    $sql = "SELECT h.F_ID,F_LIBELLE FROM `habilitation` h JOIN fonctionnalite f on f.F_ID = h.F_ID WHERE GP_ID = " . $hab . " ORDER BY h.F_ID ASC;";
    $dbh = BDD::getInstanceOfEBrigade();
    $stmt = $dbh->prepare($sql);
    $stmt->execute();
    return $stmt;
  }
}