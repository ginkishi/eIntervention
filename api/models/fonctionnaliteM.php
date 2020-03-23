<?php
require_once(PDO_PATH);
class TypeIntervention {
  public function construct(){}

  private static function cleanUserInput($input)
	{
		$input = htmlentities($input);
		return $input;
	}

  public function listAllFonct() {
    $sql='SELECT F_ID, F_LIBELLE FROM fonctionnalite';
    $dbh = BDD::getInstance();
    $stmt=$dbh->prepare($sql);
    $stmt->execute();
    return $stmt;
  }

  public function OneFonctByID($id) {
    $id = self::cleanUserInput($id);
    $sql="SELECT F_ID, F_LIBELLE FROM fonctionnalite WHERE F_ID = " . $id . ";";
    $dbh = BDD::getInstance();
    $stmt=$dbh->prepare($sql);
    $stmt->execute();
    return $stmt;
  }


}
?>
