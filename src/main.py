import numpy as np

from image_data import ImageModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from keras.models import load_model
from assets.constants import CNN_NAME

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

network = load_model(CNN_NAME)


@app.post("/predict")
def predict(image: ImageModel):
    processing_image = image.process_image()

    predictions = network.predict(processing_image)
    digit = int(np.argmax(predictions))
    confidence = float(np.max(predictions))

    return {"digit": digit, "confidence": confidence, "full_predict": predictions}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", reload=True)