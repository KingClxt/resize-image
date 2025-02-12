from fastapi import FastAPI, UploadFile, File, Form
from PIL import Image
from io import BytesIO
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get('/')
def index():
    return {"message": "Hello"}

@app.post('/upload_image')
async def upload_image(largeur: int = Form(...), hauteur: int = Form(...), file: UploadFile = File(...)):
    try:
        # Lire le contenu du fichier uploadé
        contents = await file.read()
        
        # Ouvrir l'image depuis le flux de bytes
        img = Image.open(BytesIO(contents))
        
        # Redimensionner l'image
        nouvelle_taille = (largeur, hauteur)
        image_redimensionnee = img.resize(nouvelle_taille)
        
        # Convertir l'image redimensionnée en bytes
        img_byte_arr = BytesIO()
        image_redimensionnee.save(img_byte_arr, format='PNG')
        img_byte_arr = img_byte_arr.getvalue()
        
        # Renvoyer l'image sous forme de réponse HTTP
        return Response(content=img_byte_arr, media_type='image/png')
    
    except Exception as e:
        # Gérer les erreurs (par exemple, si le fichier n'est pas une image valide)
        return {"error": str(e)}