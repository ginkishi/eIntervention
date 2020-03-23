<?php
	include('configpdo.php');
	
	class BDD extends PDO
	{
		private static $instance = null;
		
		function __construct()
		{}
		
		public static function getInstance()
		{
			if(is_null(self::$instance))
			{
				try
				{
					self::$instance = new PDO(SQL_DSN, SQL_USERNAME, SQL_PASSWORD);
				}
				catch(PDOException $e)
				{
					echo $e;
				}
			}
			return self::$instance;
		}
	}
?>