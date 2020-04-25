 les outils necessaires au lancement de l'application en mode developper:

 installer node.js 
 installer d'angular
 installer WampServeur

-----------------------------
 apres l'installation et le lancement du WampServeur il faudra creer la base de données ebrigade 
 , disponible en ligne

 apres avoir importer la base de données ebrigade, il faut importer le fichier updateEbrigade.sql 
 (disponible dans le repertoire database) qui mettra à jours les droits des utilisateurs.

 Ensuite faudra creer la base de donnée eintervention sur http://127.0.0.1/phpmyadmin/ 
 et importer le fichier database_structure.sql

 commandes a lancer sur l'invite de commande dans le repertoire eIntervention/app/src/app 
 npm install
 ng serve

L’envoie de requête HTTP pour récupérer des donnés d’une API car l’adresse était en cross-origin ce 
qui ne convenait pas pour la nouvelle politique web de Google sur la Same-Origin qui stipule que les 
requêtes doivent être envoyer d’une adresse web à une autre via le même domaine,
 sinon il faut le configurer dans le serveur web du site.
 
 a cause de ça il faut lancer chrome sans la securité 
comment faire cela: 
windows + r
chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security