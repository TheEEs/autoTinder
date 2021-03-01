from keras.preprocessing import image
from mtcnn import MTCNN 
import tensorflow as tf
import numpy as np
import keras
from urllib import *
import matplotlib.pyplot as plt
import matplotlib

mtcnn = MTCNN()

def detect_face(img):
    predictions = mtcnn.detect_faces(img)
    if len(predictions) > 0:
        prediction = predictions[0]
        box = prediction['box']
        confidence = prediction['confidence']
        if confidence > 0.95:
            cropped_face = img[box[1]:box[1]+box[3],box[0]:box[0]+box[2]]
            cropped_face = image.array_to_img(cropped_face)
            resized_face = cropped_face.resize((160,160))
            return resized_face


DATA_FILE = "./data/data-0.txt"
with open(DATA_FILE) as f:
    urls = [line.rstrip() for line in f]

for url in urls:
    request.urlretrieve(url, "./training/tmp.jpg")
    img = image.load_img("./training/tmp.jpg")
    img = image.img_to_array(img)
    detected_face = detect_face(img)
    if detected_face:
        plt.imshow(detected_face)
    else:
        plt.imshow(img)
    plt.show()
    input()
    