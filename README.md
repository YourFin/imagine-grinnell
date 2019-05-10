Running Node + Rails

1. $ Bundle Install
2. $ nvm install 10.15.3
3. $ nvm alias default 10.15.3
4. $ cd client 
5. $ npm install
6. $ npm install mapbox-gl
7. Go to Home.js in Client Folder. Then change fetch urls to {ur main url}:8081/{whatever it is} for all. You'll see.
8. CORS chrome extension enabled.
9. (from cd client) $ npm run start
10. $ rails s -b $IP -p 8081
11. go to {ur main url}

*** url/garden_produces is empty for seed data so you can't see available produce. Ask Hunain for dummy data, or you can post your own thru api-docs.


----

Ruby Rails Project for CSC-324 Software Design and Development

Imagine Grinnell Giving Gardens

This is the code for creation of the giving gardens webpage associated with Imagine Grinnell.
Documentation for the API can be found when the project is ran at /api-docs.
The documentation utilized Swagger.

DB and Documentation Rake Commands
To change the DB settings:

Change the code.

```
rake db:drop
rake db:migrate
rake db:seed
```
    
DB Seed data can be found at /db/seed_data/
    
To change the Swagger documentation:

Change the specs at /spec/"spec you want to change".

```
rake rswag:specs:swaggerize
```

Last Active Group: Spring 2019
For Next Group:
Fully develop and fix test cases