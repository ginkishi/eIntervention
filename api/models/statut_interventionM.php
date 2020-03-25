<?php
require_once(PDO_PATH);
class StatutIntervention
{
    public function construct()
    {
    }

    private static function cleanUserInput($input)
    {
        $input = htmlentities($input);
        return $input;
    }

    public function listAllStatut()
    {
        $sql = 'SELECT IDStatus,label Label FROM status';
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }

    public function OneStatutByID($id)
    {
        $id = self::cleanUserInput($id);
        $sql = "SELECT IDStatus,label Label FROM status where IDStatus = " . $id . ";";
        $dbh = BDD::getInstanceOfEIntervention();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
}