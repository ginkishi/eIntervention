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

// ==================== Route for eBrigade ==================== //

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


// ==================== Route for eIntervention ==================== //


// Get list of all statut of intervention
$router->get('/statutIntervention', function () {
    require_once CONTROLLERS . DS . 'statut_interventionC.php';
    $s = new statutInterventionController();
    $s->statutsIntervention();
});

// Get one statut of intervention by id
$router->get('/statutIntervention/:id', function ($id) {
    require_once CONTROLLERS . DS . 'statut_interventionC.php';
    $s = new statutInterventionController();
    $s->UnStatutIntervention($id);
});

// Get list of all intervention
$router->get('/intervention', function () {
    require_once CONTROLLERS . DS . 'interventionC.php';
    $s = new InterventionController();
    $s->interventions();
});
$router->get('/vehicule', function () {
    require_once CONTROLLERS . DS . 'interventionC.php';
    $s = new InterventionController();
    $s->vehiculeUtilise();
});
$router->get('/vehicule', function () {
    require_once CONTROLLERS . DS . 'interventionC.php';
    $s = new InterventionController();
    $s->vehiculeUtilise();
});
$router->post('/vehicule', function () {
    require_once CONTROLLERS . DS . 'interventionC.php';
    $s = new InterventionController();
    $data = json_decode(file_get_contents('php://input'), true);
    $s->addVehiculeToIntervention($data["IdVehicule"], $data["IDintervention"], $data["DateDepart"], 1, $data["HeureDepart"], $data["DateArrive"], $data["HeureArrive"], $data["DateRetour"], $data["HeureRetour"], $data["Ronde"]);
});





// Get list of all intervention
$router->post('/intervention', function () {
    require_once CONTROLLERS . DS . 'interventionC.php';
    $s = new InterventionController();
    $data = json_decode(file_get_contents('php://input'), true);


    $s->addIntervention($data["numeroIntervention"], $data["adresse"], $data["commune"], 1, $data["typeIntervention"], $data["important"], $data["requerant"], $data["dateDeclenchement"], $data["heureDeclenchement"], $data["dateFin"], $data["heureFin"], $data["responsable"], $data["idcreateur"], "0");

});

// Get one intervention by id
$router->get('/intervention/:id', function ($id) {
    require_once CONTROLLERS . DS . 'interventionC.php';
    $s = new InterventionController();
    $s->UneIntervention($id);
});

// Delete one intervention by id
$router->delete('/intervention/:id', function ($id) {
    require_once CONTROLLERS . DS . 'interventionC.php';
    $s = new InterventionController();
    $s->deleteIntervention($id);
});

// Delete one intervention by id
$router->delete('/vehicule', function ($id) {
    require_once CONTROLLERS . DS . 'interventionC.php';
    $s = new InterventionController();
    $s->deleteIntervention($id);
});


// Get list of all intervention
$router->post('/intervention/:id', function ($id) {
    require_once CONTROLLERS . DS . 'interventionC.php';
    $s = new InterventionController();
    $data = json_decode(file_get_contents('php://input'), true);
    $s->addIntervention($data["Nintervention"], $data["adresse"], $data["commune"], $data["opm"], $data["typeIntervention"], $data["important"], $data["requerant"], $data["datedeclenchement"], $data["heuredeclenchement"], $data["datefin"], $data["heurefin"], $data["responsable"], $data["idcreateur"], $data["idstatus"]);
});

$router->run();