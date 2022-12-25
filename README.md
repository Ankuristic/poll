PollingAPI
An API where anyone can create questions with options.

Demo Video:
Link to the Demo Video :https://youtu.be/u3fu5K_lAw8.


Key Features:
Create a question
Add options to a question
Add a vote to an option of question

Delete a question → A question can’t be deleted if one of it’s options has votes

Delete an option → An option can’t be deleted if it has even one vote given to it

View a question with it’s options and all the votes given to it

Routes & URL :
/questions/create : To create a new question hit the following URL with a post request: http://localhost:9000/questions/create

/options/:id/create : To create a new option for a question hit the following URL with a post request: http://localhost:9000/options/:idOfQuestion/create

/options/:id/add_vote: To increment the count of votes on an option, hit the following URL with a get 

/questions/:id: To view a question and it’s options, hit the following URL with a get request: http://localhost:9000/questions/:idOfQuestion

/options/:id/delete: To delete an option, hit the following URL with a delete request: http://localhost:9000/options/:idOfOption/delete

/questions/:id/delete : To delete a question, hit the following URL with a delete request: http://localhost:9000/questions/:idOfQuestion/delete

To run the project on your local machine:
Open terminal.

Change the current working directory to the location where you want the cloned directory.

Install all the dependencies by running :

npm install

Run npm start to run the project at local host, port 9000:npm start

Create a new question , by sending a post request on the following URL : http://localhost:9000/questions/create
