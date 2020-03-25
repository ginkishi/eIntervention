<?php
error_reporting(E_STRICT | E_ALL);
date_default_timezone_set('Europe/Paris');
setlocale(LC_TIME, 'fr_FR.utf8', 'fra');


// =====================  Initialisation
define('DS', DIRECTORY_SEPARATOR);
define('ROOT', dirname(__FILE__));
define('CONTROLLERS', ROOT . DS . 'controllers');
define('MODELS', ROOT . DS . 'models');
define('CLASSES', ROOT . DS . 'classes');
define('PDO_PATH', ROOT . DS . 'pdo.php');


// =====================  Détermination du controleur à utiliser: Est-ce que j'ai un paramètre 'url' dans mon URL?
require_once CLASSES . DS . 'router.php';
$router = new Routeur($_GET['url']);

//Route for eBrigade

// Check authentification
$router->post('/auth', function () {
    require_once CONTROLLERS . DS . 'pompierC.php';
    $p = new PompierController();
    $data = json_decode(file_get_contents('php://input'), true);
    $p->authentification($data['code'], $data['mp']);
});

// Get list of all firefighter
$router->get('/pompier', function () {
    require_once CONTROLLERS . DS . 'pompierC.php';
    $p = new PompierController();
    $p->pompiers();
});

// Get one firefighter by id
$router->get('/pompier/:id', function ($id) {
    require_once CONTROLLERS . DS . 'pompierC.php';
    $p = new PompierController();
    $p->UnPompier($id);
});

// Get list of all vehicules
$router->get('/vehicule', function () {
    require_once CONTROLLERS . DS . 'vehiculeC.php';
    $v = new VehiculeController();
    $v->vehicules();
});

// Get one vehicule by id
$router->get('/vehicule/:id', function ($id) {
    require_once CONTROLLERS . DS . 'vehiculeC.php';
    $v = new VehiculeController();
    $v->UnVehicule($id);
});

// Get list of all type of intervention
$router->get('/typeIntervention', function () {
    require_once CONTROLLERS . DS . 'type_interventionC.php';
    $ti = new typeInterventionController();
    $ti->typesIntervention();
});

// Get one type of intervention by id
$router->get('/typeIntervention/:id', function ($id) {
    require_once CONTROLLERS . DS . 'type_interventionC.php';
    $ti = new typeInterventionController();
    $ti->UnTypeIntervention($id);
});

// Get list of all role 
$router->get('/fonctionnalite', function () {
    require_once CONTROLLERS . DS . 'fonctionnaliteC.php';
    $ti = new FonctionnaliteController();
    $ti->fonctionnalites();
});

// Get one role by id
$router->get('/fonctionnalite/:id', function ($id) {
    require_once CONTROLLERS . DS . 'fonctionnaliteC.php';
    $f = new FonctionnaliteController();
    $f->UneFonctionnalite($id);
});




$router->run();