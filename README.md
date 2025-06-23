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
       
## API Details

**Base API:** https://basic-library-management-server.vercel.app/  
**Local API:** http://localhost:5000/  

**End-Points:**  

------------
1. Insert Book:  
   You can insert a book data by using following endpoint   
   End Point: /api/books  
   Mathod: POST  
   Params: NA  
   Query: Na  
   Body:  
       
        {
           "title": "The Silent Patient",
           "author": "World Management",
           "genre": "FICTION",
           "isbn": "9781250301668",
           "description": "A psychological thriller about a woman's act of violence.",
           "copies": 10,
           "available": true,
           "createdAt": "2025-06-01T10:00:00Z",
           "updatedAt": "2025-06-01T10:00:00Z"
         }

   Response:

       {
           "success": true,
           "message": "Book created successfully",
           "data": {
               "title": "The Silent Patient",
               "author": "World Management",
               "genre": "FICTION",
               "isbn": "9781250301668",
               "description": "A psychological thriller about a woman's act of violence.",
               "copies": 10,
               "available": true,
               "_id": "6858f3627898b27e508d8ce8",
               "createdAt": "2025-06-01T10:00:00.000Z",
               "updatedAt": "2025-06-01T10:00:00.000Z",
               "__v": 0
           }
       }
------------
2. Get all Book:
   You can got all books by using following endpoint   
   End Point: /api/books  
   Mathod: GET  
   Params: NA  
   Query: Optional  
   Body: NA  

   Response:

       {
           "success": true,
           "message": "Books retrieved successfully",
           "data": [
               {
                   "_id": "6858962f31b87928c802ca4c",
                   "title": "Cosmos",
                   "author": "Carl Sagan",
                   "genre": "SCIENCE",
                   "isbn": "9780345331359",
                   "description": "Exploring the universe.",
                   "copies": 1,
                   "available": true,
                   "createdAt": "2025-06-17T12:50:00.000Z",
                   "updatedAt": "2025-06-23T03:28:44.997Z"
               },
               {
                   "_id": "6858962f31b87928c802ca43",
                   "title": "Educated",
                   "author": "Tara Westover",
                   "genre": "BIOGRAPHY",
                   "isbn": "9780399590504",
                   "description": "A memoir about growing up off the grid.",
                   "copies": 3,
                   "available": true,
                   "createdAt": "2025-06-08T17:20:00.000Z",
                   "updatedAt": "2025-06-08T17:20:00.000Z"
               },
               ------------------------------------------------------
               -----------------------------------------------------
       ]
------------
3. Get a Single Book:
   You can get a specific book by using following endpoint   
   End Point: /api/books/:bookId  
   Mathod: GET  
   Params: Book Id (ObjectId)  
   Query: NA  
   Body: NA  

   Response:

       {
           "success": true,
           "message": "Book retrieved successfully",
           "data": {
               "_id": "6858962f31b87928c802ca4c",
               "title": "Cosmos",
               "author": "Carl Sagan",
               "genre": "SCIENCE",
               "isbn": "9780345331359",
               "description": "Exploring the universe.",
               "copies": 1,
               "available": true,
               "createdAt": "2025-06-17T12:50:00.000Z",
               "updatedAt": "2025-06-23T03:28:44.997Z"
           }
       }
------------
4. Update a Single Book:  
   You can update a specific book by using following endpoint   
   End Point: /api/books/:bookId  
   Mathod: PUT  
   Params: Book Id (ObjectId)  
   Query: NA  
   Body: As need  
   
          {
           "author": "Subin Sarma",
           "copies": 12
          }
   
   Response:
   
       {
           "success": true,
           "message": "Book updated successfully",
           "data": {
               "_id": "6858962f31b87928c802ca4c",
               "title": "Cosmos",
               "author": "Subin Sarma",
               "genre": "SCIENCE",
               "isbn": "9780345331359",
               "description": "Exploring the universe.",
               "copies": 12,
               "available": true,
               "createdAt": "2025-06-17T12:50:00.000Z",
               "updatedAt": "2025-06-23T06:46:24.938Z"
           }
       }
------------
5. Delete a Single Book:  
   You can delete a specific book by using following endpoint   
   End Point: /api/books/:bookId  
   Mathod: DELETE  
   Params: Book Id (ObjectId)  
   Query: NA  
   Body: NA  

   Response:

       {
           "success": true,
           "message": "Book deleted successfully",
           "data": null
       }
------------
6. Borrow a Book:  
   You can borrow a book data by using following endpoint   
   End Point: /api/borrow  
   Mathod: POST  
   Params: NA  
   Query: Na  
   Body:  
       
       {
         "book": "6858962f31b87928c802ca4b",
         "quantity": 3,
         "dueDate": "2025-07-18T00:00:00.000Z"
       }

   Response:

       {
           "success": true,
           "message": "Books borrwed successfully",
           "data": {
               "book": "6858962f31b87928c802ca4b",
               "quantity": 3,
               "dueDate": "2025-07-18T00:00:00.000Z",
               "_id": "6858fa377898b27e508d8cf3",
               "createdAt": "2025-06-23T06:54:47.063Z",
               "updatedAt": "2025-06-23T06:54:47.063Z",
               "__v": 0
           }
       }
------------
7. Borrowed Book Summary:  
   You can see how many copies of a specific book already borrowed by using following endpoint   
   End Point: /api/borrow  
   Mathod: GET  
   Params: NA  
   Query: NA  
   Body: NA  
   
   Response:

       {
           "success": true,
           "message": "Borrowed books summary retrieved successfully",
           "data": [
               {
                   "totalQuantity": 3,
                   "book": [
                       {
                           "title": "Homo Deus",
                           "isbn": "9780062464316"
                       }
                   ]
               },
               {
                   "totalQuantity": 15,
                   "book": [
                       {
                           "title": "The Diary of a Young Girl",
                           "isbn": "9780553296983"
                       }
                   ]
               },
               {
                   "totalQuantity": 4,
                   "book": [
                       {
                           "title": "The Silent Patient",
                           "isbn": "9781250301697"
                       }
                   ]
               },
               {
                   "totalQuantity": 2,
                   "book": [
                       {
                           "title": "Cosmos",
                           "isbn": "9780345331359"
                       }
                   ]
               }
           ]
       }
------------







