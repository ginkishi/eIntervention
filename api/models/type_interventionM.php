<?php
require_once(PDO_PATH);
class TypeIntervention {
  public function construct(){}

  private static function cleanUserInput($input)
	{
		$input = htmlentities($input);
		return $input;
	}

  public function listAll() {
    $sql='SELECT * FROM type_intervention';
    $dbh = BDD::getInstance();
    $stmt=$dbh->prepare($sql);
    $stmt->execute();
    return $stmt;
  }

  public function OneTIByID($id) {
    $id = self::cleanUserInput($id);
    $sql="SELECT * FROM type_intervention WHERE TI_CODE = \"" . $id . "\";";
    $dbh = BDD::getInstance();
    $stmt=$dbh->prepare($sql);
    $stmt->execute();
    return $stmt;
  }


}
?>