
# Hospital Api

Hello there!! 
 
I designed an API for the doctors of a Hospital which has been allocated by the
govt for testing and quarantine + well being of COVID-19 patients

- Each time patient visits doctor , he will register the patient. 
-  If already exists then doctor can see his report


## How to setup project locally:

To setup the files locally on a system follow these simple steps.

step 1: 

Visit this url: https://github.com/Arun-kumar-95/HospitalAPI

Step: 2

- Download the zip file and extract it 
- Open the file with your favourite editor

Step: 3

- Open the open and terminal, use npm install to install all dependencies packages
- Then Go to the directory: src/config. There Create a file config.env. 


Note: file name must be same dont try to change it.


Step: 4

- Inside config.env set few parameters as
- PORT = 4000 or your own port
- DATABASE_NAME = 'HospitalApi' or you can set you own database name here
- JWT_SECRET = 'somerandomtext' or you can add your own secret key
- DATABASE_URL = 'mongodb://localhost:27017' 

Note: don't try to change this url





## How to start server

- Go to package.json file
- Add script such as:  
"start": "nodemon ./src/index.js"

- Finally go on the terminal to start the server use npm start
## Let's Talk About Routes
Well the required routes are:
 
- /doctors/register → To register the doctor with username and password
- /doctors/login → login routes for the doctor which returns the JWT to be used later for accessing the other routes
- /patients/register : To register the patients
- /patients/:id/create_report : This route will create a report of a patient.
- /patients/:id/all_reports → List all the reports of a patient oldest to latest
- /reports/:status → List all the reports of all the patients filtered by a specific status
## Authors

- Arun kumar: https://github.com/Arun-kumar-95

- It was an awesome exprerience :) to create an hospital api for helping doctors


