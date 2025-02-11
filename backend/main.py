from fastapi import FastAPI, UploadFile, File, Form
import os
from PIL import Image
import shutil


app = FastAPI()


@app.post('/upload_image')
async def uploadImage(largeur:int=Form(...), longueur:int = Form(...), file:UploadFile = File(...)):
    print(file)
    directory = f"./static/img/{file.filename}"
    resize_img = None
    # print(directory)
    with open(directory, 'wb') as f:
        shutil.copyfileobj(file.file, f)
        resize_img = Image.open(directory)
        nouvelle_taille = (largeur, longueur)
        image_redimanetionnee = resize_img.resize(nouvelle_taille)
        return image_redimanetionnee
        
        

