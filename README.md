## Backend Project on Library Management System

------------

## Project Setup:
1. Goto your suitable folder where you want to keep your project
2. Open the folder in destop poweshell.
3. Now open it in code editor like vs code by following command:

       code .
4. When your code editor opend, at first install npm by following command:

       npm init 
   
5. Now install library and package step by step by following commands:    
       Express

       npm install express
    TypeScript

       npm install -g typescript
    MongoDB

       npm install mongodb
    Mongoose

       npm install mongoose --save
   
6. Now configure typeScript by following:  
   - Initiate

            tsc -init
   - A file be created as name tsconfig.json.  
   - Create two folder on root directory as name "dist" and "src  
   - Open the file tsconfig.json. Search rootDir. You will find "rootDir": "./",. Uncomment it and set folder path as follows

            "rootDir": "./src",
   - Similary search outDir and and set folder fath as follows:

            "outDir": "./dist",
7. Now the project setup complete to writng code.
8. You can follow the folder structure as bellows

          dist
          src----  
                 |-app---
                        |-modules
                               |-interface
                               |-model
                               |-controller
                        |-middlewire
                        |-utilis
                                      
                 |-app.ts  
                 |-server.ts
   
9. In app.ts and server.ts file you setup your server
10. In server.ts file you connect your mongDB databse via mongoose
11. After completed your porjcet nedd to deploy. You can deploy in vercel
12. To deploy in vercel you create a vercel.json file in root dirctory.
13. The vercel.json file configure as follows:

              {
                "version": 2,
                "builds": [
                  {
             "src": "dist/server.js",
             "use": "@vercel/node"
           }
                ],
                "routes": [
                  {
                    "src": "/(.*)",
                    "dest": "dist/server.js"
                  }
                ]
              }
   14. Now install vercel in your machine as globally as following command:

              npm i -g vercel
   15. Login vercel

                  vercel login
   16. After login run the command

              vercel --prod
   17. You will get two links. Click one any
   18. Open in browser. Here you can see domon. Click on domain and collect  live link of your project.
       













