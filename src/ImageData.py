from pydantic import BaseModel
from PIL import Image


class ImageModel(BaseModel):
    image: Image
