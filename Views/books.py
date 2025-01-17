from flask import jsonify, request, Blueprint
from models import db, Books ,User
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity


books_bp = Blueprint("books_bp", __name__)
#@add_book
@books_bp.route("/books", methods=["POST"])
@jwt_required()
def add_books():
    data = request.get_json ()
    Genre = data['Genre']
    Title = data['Title']
    current_user_id=get_jwt_identity()
    borrowed_at = datetime.strptime(data['borrowed_at'], '%Y-%m-%d')
    returned_at = datetime.strptime(data['returned_at'], '%Y-%m-%d')



    if not current_user_id:
        return jsonify({"error":"Book not found"})
        print(current_user_id)
    else:
        new_book=Books(Title=Title,Genre=Genre,borrowed_at=borrowed_at,returned_at=returned_at,user_id=current_user_id)
        db.session.add(new_book)
        db.session.commit()
        return jsonify({"success":"Book added successfully"})
#get all_books
@books_bp.route("/books",methods=["GET"])
@jwt_required()
def fetch_books():
    current_user_id=get_jwt_identity()
    books = Books.query.filter_by(user_id = current_user_id)

    book_list=[]
    for book in books:
       book_list.append({
        
                "id":book.id,
                "Title":book.Title,
                "Genre":book.Genre,
                "borrowed_at":book.borrowed_at,
                "returned_at":book.returned_at,
                "user":{
                     "id": book.user.id,
                    "email":book.user.email,
                    "role":book.user.role,
                    "grade":book.user.grade,
                }
    })
    #get book by id 
    return jsonify(book_list)
@books_bp.route("/books/<int:book_id>",methods=["GET"])
@jwt_required()
def get_book(book_id):
      current_user_id = get_jwt_identity()
      book = Books.query.filter_by(id=book_id, user_id=current_user_id).first()
      if book:
          book_details={
              "id":book.id,
                "Title":book.Title,
                "Genre":book.Genre,
                "borrowed_at":book.borrowed_at,
                "returned_at":book.returned_at,
          }
          return jsonify(book_details)
      else:
          return jsonify({"error":"Book not found"})
      
#update Book
@books_bp.route("/books/<int:book_id>", methods=["PATCH"])
@jwt_required()
def update_book(book_id):
    current_user_id = get_jwt_identity()
    
    
    data = request.get_json()
    book = Books.query.filter_by(id=book_id, user_id=current_user_id).first()
    if not book:
      return jsonify({"error": "Book not found or unauthorized"}), 404


    if book and book.user_id == current_user_id:

        Title = data.get('Title', book.Title)
        Genre = data.get('Genre', book.Genre)
        borrowed_at = data.get('borrowed_at', book.borrowed_at)
        returned_at = data.get('returned_at', book.returned_at)
        
        # Parse string values to datetime objects
    if isinstance(borrowed_at, str):
        borrowed_at = datetime.strptime(borrowed_at, '%Y-%m-%d')
    if isinstance(returned_at, str):
        returned_at = datetime.strptime(returned_at, '%Y-%m-%d')


        
        book.Title = Title
        book.Genre = Genre
        book.borrowed_at = borrowed_at
        book.returned_at = returned_at

        db.session.commit()
        return jsonify({"success": "Book updated successfully"}), 200

    else:
        return jsonify({"error": "Book not found/Unauthorized"}), 406
#delete book 
@books_bp.route("/books/<int:book_id>", methods=["DELETE"])
@jwt_required()
def delete_book(book_id):
    current_user_id = get_jwt_identity()

    book = Books.query.filter_by(id=book_id, user_id=current_user_id).first()
    if not book:
      return jsonify({"error": "Book not found or unauthorized"}), 404



    db.session.delete(book)
    db.session.commit()
    return jsonify({"success": "Book deleted successfully"}), 200

    