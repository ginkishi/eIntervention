<?php
include('configpdo.php');

class BDD extends PDO
{
	private static $instanceOfEBrigade = null;
	private static $instanceOfEIntervention = null;

	function __construct()
	{
	}

	public static function getInstanceOfEBrigade()
	{
		if (is_null(self::$instanceOfEBrigade)) {
			try {
				self::$instanceOfEBrigade = new PDO(SQL_DSN, SQL_USERNAME, SQL_PASSWORD);
			} catch (PDOException $e) {
				echo $e;
			}
		}
		return self::$instanceOfEBrigade;
	}
	public static function getInstanceOfEIntervention()
	{
		if (is_null(self::$instanceOfEIntervention)) {
			try {
				self::$instanceOfEIntervention = new PDO(SQL_DSN2, SQL_USERNAME2, SQL_PASSWORD2);
			} catch (PDOException $e) {
				echo $e;
			}
		}
		return self::$instanceOfEIntervention;
	}
}