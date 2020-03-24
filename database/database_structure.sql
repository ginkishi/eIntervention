-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  Dim 02 fév. 2020 à 14:43
-- Version du serveur :  5.7.19
-- Version de PHP :  5.6.31
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

SET
  AUTOCOMMIT = 0;

START TRANSACTION;

SET
  time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!40101 SET NAMES utf8mb4 */
;

--
-- Base de données :  `einterventions`
--
-- --------------------------------------------------------
--
-- Structure de la table `interventions`
--
DROP TABLE IF EXISTS `interventions`;

CREATE TABLE IF NOT EXISTS `interventions` (
  `IDIntervention` int(11) NOT NULL AUTO_INCREMENT,
  `NIntervention` int(11) NOT NULL,
  `OPM` tinyint(1) NOT NULL,
  `Commune` varchar(50) NOT NULL,
  `Adresse` varchar (100) NOT NULL,
  `TypeIntervention` varchar (30) NOT NULL,
  `Important` tinyint (1) NOT NULL,
  `Requerant` varchar (15) NOT NULL,
  `DateDeclenchement` timestamp NOT NULL,
  `DateFin` timestamp NOT NULL,
  `IDResponsable` int (11) NOT NULL,
  `IDCreateur` int (11) NOT NULL,
   `IDstatus` int(11) NOT NULL,
  PRIMARY KEY (`IDIntervention`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS  `status` ( 
  `IDstatus` INT NOT NULL , 
  `label` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`IDstatus`)
   ) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- validé par le chef
-- validé par le responsable
-- en cours de validation du chef
-- chef demande modification 
-- en cours de validation du responsable
-- --------------------------------------------------------
--
-- Structure de la table `personnelduvehicule`
--
DROP TABLE IF EXISTS `personnelduvehicule`;

CREATE TABLE IF NOT EXISTS `personnelduvehicule` (
  `IDVehicule` int (11) NOT NULL,
  `IDPersonne` int (11) NOT NULL,
  `IDIntervention` int (11) NOT NULL,
  `IDrole` tinyint (4) NOT NULL,
  PRIMARY KEY (`IDVehicule`, `IDPersonne`, `IDIntervention`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- --------------------------------------------------------
--
-- Structure de la table `vehiculeutilise`
--
DROP TABLE IF EXISTS `vehiculeutilise`;

CREATE TABLE IF NOT EXISTS `vehiculeutilise` (
  `IDVehicule` int (11) NOT NULL,
  `IDIntervention` int (11) NOT NULL,
  `DateDepart` timestamp NOT NULL,
  `DateArrive` timestamp NOT NULL,
  `DateRetour` timestamp NOT NULL,
  `Ronde` tinyint (1) NOT NULL,
  PRIMARY KEY (`IDVehicule`, `IDIntervention`, `DateDepart`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;


INSERT INTO `status` (`IDstatus`, `label`) VALUES 
    ('0', 'En cours de validation du responsable'),
    ('1', 'Validé par le responsable'), 
    ('2', 'En cours de validation du chef'),
    ('3', 'Chef demande modification '),
    ('4', 'Validé par le chef');

ALTER TABLE `vehiculeutilise` 
ADD FOREIGN KEY (IDIntervention) REFERENCES interventions(IDIntervention);

ALTER TABLE `personnelduvehicule` 
ADD FOREIGN KEY (IDIntervention) REFERENCES interventions(IDIntervention);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;