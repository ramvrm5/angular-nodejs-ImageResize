# angular-nodejs-ImageResize
This project consist of two folders server and client                                                                                                                                                                                                                                           
--SERVER FOLDER is our Backendend which is in Node.js(Express.js) with database used mongoDB                                                                a.)In mongoDB database is with live url you not have to create anything                                                                  
CLIENT FOLDER is our Frontendend which is in Angular version 9.                                                                                                                                                                                                                                                                                                  
--To start This project you have to follow these below steps:-                                                                                  
1.Install node on your machine        https://nodejs.org/en/                                                                                    
2.Install Angular on your machine     npm install -g @angular/cli                                                                               
3.Install express.js on your machine  npm install express -g                                                                                    
                                      npm install express-generator -g                                                                          
4.Install mongodb if you need to see the data or table structure. https://www.mongodb.com/try/download/compass                                  
    a.) simply copy this link mongodb+srv://ramverma:<password>@traversymedia.77b2f.mongodb.net/test                                            
    b.) mongoDB compass will detect this link and dialog box will open you have select yes                                                      
    c.) in password section you have write ram123456.                                                                                           
                                                                                                                                                
--After installing Clone this repository. with commant  git clone https://github.com/ramvrm5/angular-nodejs-ImageResize.git                     
enter in folder server like this   cd server                                                                                                    
    a.)Install npm if node modules folder is not present by command npm install                                                                 
enter similarly in client folder like this cd client                                                                                            
    a.)Install npm if node modules folder is not present by command npm install                                                                 
                                                                                                                                                
--After Installing npm in each folder you have run this command npm start one by one in both folders.                                           
                                                                                                                                                
--If every thing works good. Then you can check                                                                                                 
    a.) Backend service on url http://localhost:3000/                                                                                           
    a.) Frontend on url http://localhost:4200/                                                                                                  
                                                                                                                                                
----NOW HOW APP FUNTIONALITY IS WORKING------                                                                                                   
1.you can login with and email and password like this                                                                                           
    a.)email---theo@gmail.com (validation is that valid email like this sample@gmail.com any its registered or not)                             
    b.)password---12sdsd@ (validation is that minimum 5 words any numeric,alphabet,special-character)                                           
2.After login you will get home page on that you will get one input                                                                             
3.On that input you have pass your image public url like this https://upload.wikimedia.org/wikipedia/en/5/5f/TomandJerryTitleCardc.jpg          
4.click on Resize Image button it will give you resized image of 50x50.                                                                         
5.On click on resize thumbnail you can check your original image.                                                                               
6.on logout you will redirect to login page where you have again login with any email and password if you want to login.                        
                                                                                                                                                
---FOR UNIT TEST---                                                                                                                             
1.you have first run backend service like in server folder npm start                                                                            
2.in same folder open command prompt and run this command npm test                                                                              
                                                                                                                                                
-------Important to Know-----                                                                                                                   
1.if first time you have logged in and resize any image it will always get you on after every login untill you change it by same                
resizing process. It always get last resize image.                                                                                              
                                                                                                                                                
-------THAT'S ALL-------
