
# AGORA

## OVERVIEW

Agora is a centralized application that facilitates all aspects of course planning and management by allowing professors to share materials with students, create discussion boards, post assignments, and more.

The app is currently deployed here: https://agora-learn.herokuapp.com/

You can also find a demo here: https://www.youtube.com/watch?v=Dhp_wXP7T28

![image](https://user-images.githubusercontent.com/79528112/189627957-1da69e46-7d63-470d-a75a-2c6c5a27ee5b.png)

## Features

### Professors

Any given professor user will be able to create multiple courses and add the following to each:

- Syllabus

- Assignments 

- Announcements (every time an announcement is posted, all students who are enrolled in the class will receive an email).

- Discussion Board

- Course Documents

Professors will be able to access a full roster of students who have enrolled in their class. They can also grade assignments that students have submitted.

Professors will also have full CRUD capability for every one of these models.

### Students

Any given student user will be able to enroll in multiple courses and access the following:

- Syllabus

- Assignments - Students are able to upload their assignments, and they will receive an email every time an assignment of theirs has been graded.

- Announcements

- Discussion Board

- Course Documents

- Grades

![Course Details](https://user-images.githubusercontent.com/79528112/189628679-a956ef80-989d-40a9-a82e-965b9a5b3331.JPG)

## Setup

To setup the app, first fork and cd into the directory, then run:

```
bundle install
rails db:create
npm install --prefix client
```

You can use the following commands to run the application:

- ```rails s```: run the backend on http://localhost:3000
- ```npm start``` --prefix client: run the frontend on http://localhost:4000




