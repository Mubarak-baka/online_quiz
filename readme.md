# Online_Quiz App



## Overview
The Quiz API allows users to register, log in, create and attempt quizzes, and view results. This API is built with Flask and utilizes JWT for authentication.

## Errors encountered 
Due to how the render delays when loading when an admin tries to add a quiz and  fetch it responds with an error but after refreshing the page everything goes well 
And also When fetching the quiz .. after i deployed it takes a great amount of time when loading ...although in the video i demonstrated that it worked successfully

## Features
- User authentication (registration, login, logout)
- Create and fetch quizzes
- Attempt quizzes
- Retrieve quiz results

## Installation
Ensure you have Python 3.8 installed. Then, install the required dependencies:

```sh
pip install -r requirements.txt
```

### Required Packages
```
[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[packages]
flask-migrate = "*"
flask-jwt-extended = "*"
flask = "*"
mail = "*"
flask-mail = "*"
psycopg2-binary = "*"

[dev-packages]

[requires]
python_version = "3.8"
```

## API Endpoints

### Users
- `GET /current_user` - Get details of the logged-in user
- `GET /Get_all_users` - Retrieve all users
- `GET /login` - User login
- `GET /logout` - User logout

### Quiz
- `GET /read_all_quize` - Retrieve all quizzes
- `GET /read_quiz_id` - Retrieve quiz by ID
- `GET /Add Quiz` - Create a new quiz

### Attempt
- `GET /Attempt` - Start a new quiz attempt
- `GET /get_current_attempt` - Retrieve the current attempt
- `GET /get_all_attempts` - Retrieve all quiz attempts

### Question
- `GET /Adding a Question` - Add a new question to a quiz
- `GET /reading_a_question` - Retrieve a question

### Results
- `GET /results` - Retrieve quiz results

## User Stories
1. As a user, you can  register and log in to the system so that you can access quizzes.
2. As a user, you  can view all available quizzes.
3. As a user, you can to attempt a quiz and submit my answers.
4. As a user, you  can view my quiz results after completing an attempt.
5. as a Admin you can add a quiz and  question
6. as an admin you can view all the results for all users 


## Errors encountered 
Due to how the render delays when loading when an admin tries to add a quiz and  fetch it responds with an error but after refreshing the page everything goes well 


## Links
- **Video Demonstration:** [Watch Here](https://www.veed.io/view/f7a09c82-4a39-41c9-8339-4270c11c0301?panel=share)
- **Postman Endpoints:** is included in the repository 
- **Frontend (Netlify):** [Quiz App](https://679d14b0f3ac3800bcb769fc--fanciful-sopapillas-1be567.netlify.app/)
- **Backend (Render):** [(https://online-quiz-4.onrender.com/)

## Contribution
If you'd like to contribute:
1. Fork the repository.
2. Clone your forked repository.
3. Create a new branch.
4. Make your changes.
5. Submit a pull request.

## License
This project is licensed under the MIT License.
