from fastapi import FastAPI, UploadFile, File, Form
import os
from PIL import Image
import shutil
from fastapi.responses import Response
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.get('/')
def index():
    return {"message":"hello"}

@app.post('/upload_image')
async def uploadImage(largeur:int=Form(...), hauteur:int = Form(...), file:UploadFile = File(...)):
    
    directory = f"/static/img/{file.filename}"
    resize_img = None
    # print(directory)
    with open(directory, 'wb') as f:
        shutil.copyfileobj(file.file, f)
        
        
    resize_img = Image.open(directory)
    nouvelle_taille = (largeur, hauteur)
    image_redimensionnee = resize_img.resize(nouvelle_taille)
    
    # Convertir l'image en bytes
    img_byte_arr = BytesIO()
    image_redimensionnee.save(img_byte_arr, format='PNG')
    img_byte_arr = img_byte_arr.getvalue()
    
    os.remove(directory)
    
    return Response(content=img_byte_arr, media_type='image/png')
        
        

