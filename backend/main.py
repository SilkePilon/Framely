from fastapi import FastAPI, HTTPException
import uvicorn
import time
import random
import os
from rich.console import Console
import json
import requests
import sqlite3
from fastapi.middleware.cors import CORSMiddleware
import string
import random
from fastapi import Query
from contextlib import asynccontextmanager
import shutil
from fastapi import FastAPI, HTTPException, File, UploadFile
import uvicorn
from fastapi.responses import JSONResponse
import os
from PIL import Image, ExifTags, TiffImagePlugin
from fastapi.middleware.cors import CORSMiddleware
import json
import logging
import io
from fastapi import Form
from PIL.TiffImagePlugin import IFDRational
from fastapi import Request
import PIL
console = Console()

# create a database connection
database_connection = sqlite3.connect("framely.db")
database_cursor = database_connection.cursor()
database_cursor.execute("""
    CREATE TABLE IF NOT EXISTS images (
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        image_filename TEXT,
        file_extension TEXT,
        image_path TEXT,
        code TEXT,
        metadata TEXT,
        likes INTEGER DEFAULT 0
    )
""")
database_cursor.execute("""
    CREATE TABLE IF NOT EXISTS comments (
        image_id TEXT,
        comment TEXT
        )
""")
database_cursor.execute("""
    CREATE TABLE IF NOT EXISTS comments (
        image_id TEXT,
        comment TEXT
        )
""")
database_connection.commit()
# print a happy message to the console
console.print("📁  Database connection established", style="bold green")


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        yield
    finally:
        # Close the database connection during shutdown
        database_connection.close()

app = FastAPI(lifespan=lifespan)

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# print a happy message to the console
console.print("🚀  FastAPI app started", style="bold green")


@app.middleware("http")
async def modify_request_response_middleware(request: Request, call_next):
    old_time = time.time()
    # print a happy message to the console
    console.print(f"📩  New incoming request ({
                  request.url})", style="bold green")
    response = await call_next(request)
    new_time = time.time() - old_time
    console.print(f"📨  Request send on its way hone! ({new_time}) ({
                  request.url})", style="bold green")
    return response


@app.post("/extract_metadata")
async def extract_metadata(image: UploadFile = File(...)):
    """
    Extracts metadata from an uploaded image file.

    Parameters:
    - image: UploadFile object representing the uploaded image file.

    Returns:
    - JSONResponse: Response object containing the extracted metadata as JSON.

    Raises:
    - HTTPException: If an error occurs during the metadata extraction process.
    """
    try:
        dct = {}
        # Extract metadata from the image
        image_data = await image.read()
        img = Image.open(io.BytesIO(image_data))
        for k, v in img.getexif().items():
            if k in ExifTags.TAGS:
                if isinstance(v, TiffImagePlugin.IFDRational):
                    v = float(v)
                elif isinstance(v, tuple):
                    v = tuple(float(t) if isinstance(
                        t, TiffImagePlugin.IFDRational) else t for t in v)
                elif isinstance(v, bytes):
                    v = v.decode(errors="replace")
                dct[ExifTags.TAGS[k]] = v
        outs = json.dumps(dct)
        outs = json.loads(outs)

        # print a happy message to the console
        console.print("😁  Metadata extracted successfully", style="bold green")

        # Return the metadata as JSON
        return JSONResponse(content=outs)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/upload_image")
async def upload_image(title: str = Form(...), description: str = Form(...), image: UploadFile = File(...)):
    """
    Uploads an image file along with title, description, and settings.

    Parameters:
    - title: The title of the image.
    - description: The description of the image.
    - image: UploadFile object representing the uploaded image file.

    Returns:
    - JSONResponse: Response object confirming the successful upload.

    Raises:
    - HTTPException: If an error occurs during the upload process.
    """
    try:
        # Get the file extension of the image
        file_extension = image.filename.split(".")[-1]

        # Process the image file
        image_data_dict = {
            "title": title,
            "description": description,
            "image_filename": image.filename,
            "file_extension": file_extension,
        }

        # Generate a random code for the image
        code = ''.join(random.SystemRandom().choice(
            string.ascii_uppercase + string.digits) for _ in range(8))
        image_data_dict["image_path"] = f"uploads/"

        # Save the image file with the code as the filename
        image_path = os.path.join(image_data_dict["image_path"], f"{code}.jpg")
        with open(image_path, 'x') as file:
            pass
        with open(image_path, "wb") as f:
            shutil.copyfileobj(image.file, f)

        image_data_dict["image_path"] = image_path
        image_data_dict["code"] = code
        dct = {}

        # Extract metadata from the image
        img = Image.open(image_path)
        for k, v in img.getexif().items():
            if k in ExifTags.TAGS:
                if isinstance(v, TiffImagePlugin.IFDRational):
                    v = float(v)
                elif isinstance(v, tuple):
                    v = tuple(float(t) if isinstance(
                        t, TiffImagePlugin.IFDRational) else t for t in v)
                elif isinstance(v, bytes):
                    v = v.decode(errors="replace")
                dct[ExifTags.TAGS[k]] = v
                # dct[str(Image.open(image_path).getexif()[k])] = str(v)
        outs = str(dct)
        image_data_dict["metadata"] = outs

        # Insert the image data into the SQLite table
        database_cursor.execute("""
            INSERT INTO images (id, title, description, image_filename, file_extension, image_path, code, metadata)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (code, image_data_dict["title"], image_data_dict["description"], image_data_dict["image_filename"],
              image_data_dict["file_extension"], image_data_dict["image_path"], image_data_dict["code"],
              image_data_dict["metadata"]))
        database_connection.commit()

        # print a happy message to the console
        console.print("📁  Image uploaded successfully", style="bold green")

        # Return the response
        return {"message": "Image uploaded successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/get_images")
async def get_images():
    """
    Retrieves a maximum of 30 images along with their data, likes, and comments from the database.

    Returns:
    - JSONResponse: Response object containing the images and their data as JSON.

    Raises:
    - HTTPException: If an error occurs during the retrieval process.
    """
    try:
        # Fetch the image data from the SQLite table
        database_cursor.execute(
            "SELECT * FROM images ORDER BY id DESC LIMIT 30")
        image_data = database_cursor.fetchall()

        images = []
        for row in image_data:
            image_id = row[0]

            # Fetch the comments from the comments table
            database_cursor.execute(
                "SELECT comment FROM comments WHERE image_id=?", (image_id,))
            comments_data = database_cursor.fetchall()
            comments = [comment[0] for comment in comments_data]

            image = {
                "id": image_id,
                "title": row[1],
                "description": row[2],
                "image_filename": row[3],
                "file_extension": row[4],
                "image_path": row[5],
                "code": row[6],
                "metadata": row[7],
                "likes": row[8],
                "comments": comments
            }
            images.append(image)

        # print a happy message to the console
        console.print("🔍  Someone is watching the master feed?!",
                      style="bold green")

        # Return the images as JSON
        return images
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/add_comment")
async def add_comment(image_id: str, comment: str):
    """
    Adds a comment to an image.

    Parameters:
    - image_id: The ID of the image.
    - comment: The comment to be added.

    Returns:
    - JSONResponse: Response object confirming the successful addition of the comment.

    Raises:
    - HTTPException: If an error occurs during the comment addition process.
    """
    try:
        # Check if the image exists in the database
        database_cursor.execute("SELECT * FROM images WHERE id=?", (image_id,))
        image_data = database_cursor.fetchone()
        if image_data is None:
            raise HTTPException(status_code=404, detail="Image not found")

        # Add the comment to the database
        database_cursor.execute("""
            INSERT INTO comments (image_id, comment)
            VALUES (?, ?)
        """, (image_id, comment))
        database_connection.commit()

        # print a happy message to the console
        console.print(f"💬  Someone has some nice things to say about image `{
                      image_id}`", style="bold green")

        # Return the response
        return {"message": "Comment added successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/like_image/{image_id}")
async def like_image(image_id: str):
    """
    Likes an image.

    Parameters:
    - image_id: The ID of the image to be liked.

    Returns:
    - JSONResponse: Response object confirming the successful like.

    Raises:
    - HTTPException: If an error occurs during the like process.
    """
    try:
        # Check if the image exists in the database
        database_cursor.execute("SELECT * FROM images WHERE id=?", (image_id,))
        image_data = database_cursor.fetchone()
        if image_data is None:
            raise HTTPException(status_code=404, detail="Image not found")

        # Increment the like count in the database
        database_cursor.execute(
            "UPDATE images SET likes = likes + 1 WHERE id=?", (image_id,))
        database_connection.commit()

        # print a happy message to the console
        console.print(f"👍  Someone liked image `{
                      image_id}`", style="bold green")

        # Return the response
        return {"message": "Image liked successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run(app, port=8000, log_level="critical")
