import numpy as np

from image_data import ImageModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from keras.models import load_model
from src.tools.constants import CNN_PATH

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

network = load_model(CNN_PATH)


@app.post("/predict")
def predict(image: ImageModel):
    processed_image = image.process_image()

    predictions = network.predict(processed_image)
    digit = int(np.argmax(predictions))

    return {
        "digit": digit,
        "full_predict": predictions[0].tolist()
    }


app.mount("/", StaticFiles(directory="./static", html=True), name="static")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", reload=True)
