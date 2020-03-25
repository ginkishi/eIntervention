<?php

//Config for eBrigade Database
$host = "127.0.0.1";
$dbname = "ebrigade";
$dbUsername = "root";
$dbPassword = "";

define("SQL_DSN", "mysql:host=" . $host . ";dbname=" . $dbname);
define("SQL_USERNAME", $dbUsername);
define("SQL_PASSWORD", $dbPassword);

//Config for eIntervention Database
$host2 = "127.0.0.1";
$dbname2 = "eIntervention";
$dbUsername2 = "root";
$dbPassword2 = "";

define("SQL_DSN2", "mysql:host=" . $host2 . ";dbname=" . $dbname2);
define("SQL_USERNAME2", $dbUsername2);
define("SQL_PASSWORD2", $dbPassword2);