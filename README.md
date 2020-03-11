# FoodFactory

To run the FoodFactory Server , run "node server" in cmd line from the root of project.
The server will run on port 8080 and it is connected to Mongo Database hosted on Atlas.

It comprises of four models
* User
* Ingredient
* Food
* Order

For resetPassword Mail will be sent to user's mail.For that function to work, update helper.js file with your email and password.

The API Documentation for users and foods routes is available on https://styker-github.github.io/swaggerDocs/index.html 
The query params and body params are not visible in the above documentation.Please use the below method until this link is updated.

swagger.yaml is a file attached along with the project.Copy and paste it on editor.swagger.io for api documentation.
