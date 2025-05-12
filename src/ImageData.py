from pydantic import BaseModel
import numpy as np
from PIL import Image
import io
import base64
import re


class ImageModel(BaseModel):
    image: str

    def process_image(self) -> np.array:
        byte_image = self.__decode_image()

        image = Image.open(io.BytesIO(byte_image)).convert('L')
        image = image.resize((28, 28))

        result = self.__normalize_image(image)

        return result

    def __decode_image(self):
        image_data = re.sub('^data:image/.+;base64,', '', self.image)
        byte_data = base64.b64decode(image_data)

        return byte_data

    def __normalize_image(self, image: Image) -> np.array:
        image_array = np.array(image)
        image_array = 255 - image_array
        image_array = image_array / 255.0
        image_array = np.expand_dims(image_array, axis=(0, -1))

        return image_array
