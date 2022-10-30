
# AGORA

## OVERVIEW

Agora is a centralized application that facilitates all aspects of course planning and management by allowing professors to share materials with students, create discussion boards, post assignments, and much more.

The app is currently deployed here: https://agora-learn.herokuapp.com/

You can also find a demo here: https://www.youtube.com/watch?v=Dhp_wXP7T28

![image](https://user-images.githubusercontent.com/79528112/189627957-1da69e46-7d63-470d-a75a-2c6c5a27ee5b.png)

## Features

### Professors

Any given professor user will be able to create multiple courses and add the following to each:

- Syllabus

- Assignments 

- Announcements (every time an announcement is posted, students who are enrolled in the class will receive an email).

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

![Agora  Syllabus](https://user-images.githubusercontent.com/79528112/189645311-facc9488-4388-4b9d-aab8-4d490d362370.JPG)

![Agora  Assignments](https://user-images.githubusercontent.com/79528112/189645369-8c1d97bc-7ba3-4d5c-a738-705ec2ef7f39.JPG)

![Agora  Course Documents](https://user-images.githubusercontent.com/79528112/189645422-e434e1e9-3f86-4b20-978a-239fe2b9c9d9.JPG)

![Agora  Discussion Board](https://user-images.githubusercontent.com/79528112/189645460-00321b1e-8da5-4509-b19d-f922e21e62b5.JPG)

![Agora  Students](https://user-images.githubusercontent.com/79528112/189645516-d1330282-8ae5-41b3-9638-4f6d6790296f.JPG)

![Agora  Student](https://user-images.githubusercontent.com/79528112/189645568-9358701c-da67-4d1c-b90a-c6909dec7101.JPG)


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




