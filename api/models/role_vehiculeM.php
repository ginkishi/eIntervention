<?php
require_once(PDO_PATH);
class RoleVehicule
{
    public function construct()
    {
    }

    private static function cleanUserInput($input)
    {
        $input = htmlentities($input);
        return $input;
    }

    public function listAll()
    {
        $sql = 'ROLE_ID,ROLE_NAME FROM type_vehicule_role';
        $dbh = BDD::getInstanceOfEBrigade();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }

    public function OneRoleByID($id)
    {
        $id = self::cleanUserInput($id);
        $sql = "SELECT ROLE_ID,ROLE_NAME FROM type_vehicule_role WHERE ROLE_ID = " . $id . ";";
        $dbh = BDD::getInstanceOfEBrigade();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
}