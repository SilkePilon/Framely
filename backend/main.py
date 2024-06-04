from fastapi import FastAPI, HTTPException
import uvicorn
import time
import random
import os
from rich.console import Console
import json
import requests
from fastapi.middleware.cors import CORSMiddleware
import string
import random
from fastapi import Query
import shutil
from fastapi import FastAPI, HTTPException, File, UploadFile
import uvicorn
from fastapi.responses import JSONResponse
import os
from PIL import Image, ExifTags, TiffImagePlugin
from fastapi.middleware.cors import CORSMiddleware
import json
import io
from fastapi import Form
from fastapi import Request
import PIL

console = Console()
app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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

        # Save the image data in the general json file
        data_path = "data.json"
        # with open(data_path, 'x') as file:
        #     pass

        with open(data_path, "r") as f:
            data = json.load(f)

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
        outs = json.dumps(dct)
        outs = json.loads(outs)
        data[code] = image_data_dict
        image_data_dict["metadata"] = outs
        with open(data_path, "w") as f:
            json.dump(data, f)

        # Return the response
        return JSONResponse(content={"message": "Image uploaded successfully"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/get_images")
async def get_images():
    """
    Retrieves a maximum of 30 images along with their data from the uploads folder.

    Returns:
    - JSONResponse: Response object containing the images and their data as JSON.

    Raises:
    - HTTPException: If an error occurs during the retrieval process.
    """
    try:
        images = []
        count = 0
        # Iterate through the files in the uploads folder
        for file_name in os.listdir("uploads"):
            file_path = os.path.join("uploads", file_name)
            if os.path.isfile(file_path):
                # Check if the file is an image
                if file_name.endswith(".jpg") or file_name.endswith(".jpeg") or file_name.endswith(".png"):
                    # Load the image data from the data.json file
                    data_path = "data.json"
                    if os.path.isfile(data_path):
                        with open(data_path, "r") as f:
                            image_data = json.load(f)
                        # Create a dictionary with the image data and path
                        image = {
                            "image_path": file_path,
                            "image_data": image_data
                        }
                        # Add the image to the list
                        images.append(image)
                        count += 1
                        # Break the loop if the maximum number of images is reached
                        if count >= 30:
                            break
        # Return the images as JSON
        return JSONResponse(content=images)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run(app, port=8000)
