# Books Management API

This API allows users to manage books, including adding, updating, deleting, and retrieving books associated with their accounts. JWT-based authentication ensures that users can only access and manipulate their own data.

---

## Features

- **Add Books**: Users can add books with attributes like title, genre, and borrowing/returning dates.
- **Retrieve Books**: Fetch all books for the authenticated user or retrieve a specific book by its ID.
- **Update Books**: Modify details of a book.
- **Delete Books**: Remove a book from the database.
- **JWT Authentication**: Ensures secure and personalized access for users.

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. Install dependencies using `pipenv`:

   ```bash
   pipenv install
   ```

3. Activate the environment:

   ```bash
   pipenv shell
   ```

4. Set up the database:

   Open a Python shell and run the following commands:

   ```python
   from app import db
   db.create_all()
   ```

---

## Environment Variables

Create a `.env` file in the root of your project and add the following:

```env
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret_key
```

---

## Running the Application

Start the Flask development server:

```bash
flask run
```

---

## Endpoints

### Authentication

1. **Login**
   - **POST** `/auth/login`
   - Request body:

     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```

2. **Register**
   - **POST** `/auth/register`
   - Request body:

     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```

---

### Books Management

1. **Add a Book**
   - **POST** `/books`
   - Request body:

     ```json
     {
       "Title": "Book Title",
       "Genre": "Fiction",
       "borrowed_at": "2025-01-01",
       "returned_at": "2025-01-15"
     }
     ```

2. **Get All Books**
   - **GET** `/books`

3. **Get a Specific Book**
   - **GET** `/books/<book_id>`

4. **Update a Book**
   - **PATCH** `/books/<book_id>`
   - Request body:

     ```json
     {
       "Title": "Updated Title",
       "Genre": "Updated Genre",
       "borrowed_at": "2025-01-02",
       "returned_at": "2025-01-16"
     }
     ```

5. **Delete a Book**
   - **DELETE** `/books/<book_id>`

---

## Error Handling

The API returns appropriate error messages and HTTP status codes for invalid requests, including:

- Unauthorized access (401)
- Book not found (404)
- Validation errors (400)

---

## Dependencies

- Flask
- Flask-JWT-Extended
- Flask-SQLAlchemy
- pipenv

Install them using:

```bash
pipenv install flask flask-jwt-extended flask-sqlalchemy
```

---

## Contributing

Contributions are welcome! Fork the repository, make changes, and submit a pull request.

---

## License

This project is licensed under the MIT License.

