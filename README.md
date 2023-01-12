# ListEasy

ListEasy is a smart TODO list categorizer that takes away the hassle of having to categorize movies or series you wish to watch, books or comics you might want to read, food or restaurants to try and products you want to buy. 

This project was developed by [Hillary Forget](https://github.com/hillaryforget), [Liam Naylor](https://github.com/niamlaylor), and [Lucas Sahota](https://github.com/lucasw4).

<br>

## Getting Started

To run the following project on your machine please follow the steps below:

<br>

1. Create the `.env` file by using `.env.example` as a reference. You will be required to request multiple API keys from a few sites. So good luck!

2. Install all dependencies.
```
npm install
```
3. Fix to binaries for sass.
```
npm rebuild node-sass
```
4. Reset the database.
```
npm run db:reset
```
5. Run the server.
```
npm start
```
6. And finally, visit the following.
```
http://localhost:8080/
```

<br>

## Final Product

!["Screenshot of Login Page"](...)
!["Screenshot of Add Task Page"](...)
!["Screenshot of Edit/Delete Task"](...)
!["Screenshot of Mobile Version"](...)

## STRETCH

- Have tasks saved to appropriate user accounts
- charCounter for addTask with error if characters go over
- Pull task details from API and have displayed in a modal when specific task is clicked
- Check off completed active tasks and remove from list (place deactivated tasks in a different place OR just remove completely?)
- Add relevant login/register errors
- Add ability to prioritize tasks OR change list order (drag and drop) whatever is easier

## Dependencies

- nodemon
- axios
- bcrypt
- body-parser
- bootstrap
- cookie-session
- dotenv
- ejs
- express
- morgan
- request
- sass
- chalk
- pg
- mocha
- chai