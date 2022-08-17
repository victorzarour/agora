Rails.application.routes.draw do
  resources :grades
  resources :submissions
  resources :discussion_posts
  resources :course_students
  resources :students
  resources :discussions
  resources :announcements
  resources :assignments
  resources :syllabus_entries
  resources :syllabuses
  resources :courses
  resources :professors

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#delete'
  get '/authorized_user', to: 'professors#show'

  get '/syllabuses/:id/syllabus_entries', to: 'syllabus_entries#syllabus_syllabus_entries'
  
  get '/courses/:id/assignments', to: 'courses#course_assignments'
  get '/courses/:id/announcements', to: 'courses#course_announcements'
  get '/courses/:id/discussions', to: 'courses#course_discussions'
  get '/courses/:id/students', to: 'courses#course_course_students'

  get '/professors/:id/courses', to: 'professors#professor_courses'
  
  get '/students/:id/courses', to: 'students#student_courses'
  
  get '/discussions/:id/discussion_posts', to: 'discussions#discussion_discussion_posts'

  get '/assignments/:id/submissions', to: 'assignments#assignment_submissions'

  get '/grades/submission/:id', to: 'grades#get_grade'
  delete '/grades/submission/:id', to: 'grades#delete_grade'

  get 'submissions/:id/grades', to: 'submissions#student_submissions'

  
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end