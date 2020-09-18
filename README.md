# Summary

This is a web app that reads data from GitHub API and displays it on the front-end. Currently, the data consists of my repositories. 
It is possible to edit a single table row and save it in a json file. However, after editing and saving, no changes will be visible in the table, nor in the popup form.
Edited data is saved only to local json file. I might change this part of the app and have it save all the data that has been edited and display it with the most recent changes.

# Stack

Bootstrap theme Materia from Bootswatch is used for the UI. 
I used vanilla JavaScript for front-end logic. The app reads the data with fetch API and it inserts a new table row for each repo.
PHP is used for saving json files locally. It simply creates a new array of the submitted inputs and encodes it in json format.

# Installation

In order to run it, just install XAMPP on your machine and clone this repo.