# **eIntevention**

![npm](https://img.shields.io/badge/npm-v6.14.2-blue)
![License](https://img.shields.io/badge/licence-none-inactive)
![Angular](https://img.shields.io/badge/Angular-v9-orange)

<hr/>

![alt text](https://cdn.dribbble.com/users/11621/screenshots/3615710/pipetocats.jpg)

_eIntervention est actuellement en développement !_

## **Description**

**eIntervention** est une application web réalisée en Angular 9.

Cette application est réalisée dans le cadre d'un projet de Master M1 MIAGE (_Master en Méthodes Informatiques Appliquées à la Gestion des Entreprises_).

Cette application à terme permettra à la caserne de pompier de Kembs, voire à d'autre caserne de pouvoir gérer leur intervention

## **Dependencies**

- **Angular7-csv** => (https://www.code-sample.com/2019/02/angular-7-export-to-csv-pdf-excel.html)
- **Xlsx** (https://levelup.gitconnected.com/export-data-to-excel-sheet-in-angular-8-7a8e0342643d)

## **Installation**

### **Installation requirements**

- Angular >= 9
- Nodejs >= 12.16.1
- NPM >= 6.14.2
- GIT

<hr/>

### **Clone repository**

#### Clone with HTTPS

```bash
git clone https://github.com/Ginkishi/eIntervention.git
```

#### or Clone with SSH

```bash
git clone git@github.com:Ginkishi/eIntervention.git
```

**Install node_module**

```bash
$ cd app
```

```bash
npm install or npm i
```

<hr/>

## **Getting Started**

- Open a terminal
- Go to eIntervention folder
- Into eIntervention folder :

```bash
$ cd app
```

```bash
ng serve
```

Wait compilation ending...

Now the application is launched
Go to http://localhost:4200

## **Deployement**

- Open a terminal
- Go to eIntervention folder
- Into eIntervention folder :

```bash
$ cd app
```

```bash
ng build --base-href /app/ --prod
```

with /app/ your baseurl (ex: http://localhost/app/) by default it was "/" <br>
we use "http://localhost/eintervention/app/"

When the compilation is ended

Go to eIntevention/app/dist and copy/paste in your web server

Paste also an .htaccess file if you use apache server

```bash
<IfModule mod_rewrite.c>
	RewriteEngine On

 	# -- REDIRECTION to https (optional):
	# If you need this, uncomment the next two commands
	# RewriteCond %{HTTPS} !on
  	# RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI}
	# --

	RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
	RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d

	RewriteRule ^.*$ - [NC,L]
	RewriteRule ^(.*) index.html [NC,L]
</IfModule>
```

Create a folder (ex: eIntervention) and inside

Create an "app" folder

Paste the contents of the "dist" folder into the "app" folder created previously

Then paste the "api" folder in your folder (ex: eIntervention)

For more help, see the deployment video in the "[video](video)" folder
