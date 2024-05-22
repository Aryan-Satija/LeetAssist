from app import app

if __name__ == "__main__":
    # code inside this if block will
    # start to execute if we run this file.
    # In python if we import something from some file, then the file from which we import is run first.
    # hence this if block prevents this code to be executed again and again in each import.
    app.run(debug = True)