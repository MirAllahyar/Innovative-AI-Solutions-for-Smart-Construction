from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import tensorflow as tf
import numpy as np
import os
from PIL import Image
import io
import base64
from flask_cors import CORS

# Initialize Flask application
app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from different origins

# Path to the pre-trained generator model
MODEL_PATH = "generator_final.keras"

# Verify if the model file exists
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found at: {os.path.abspath(MODEL_PATH)}")

# Load the pre-trained generator model
generator = load_model(MODEL_PATH)

# Function to generate a front elevation image
def generate_elevation():
    # Generate random noise vector
    noise = tf.random.normal([1, 100])

    # Use the generator model to create an image
    generated_image = generator(noise, training=False)

    # Rescale image from [-1, 1] to [0, 255]
    generated_image = (generated_image[0] + 1) / 2.0 * 255
    generated_image = np.array(generated_image, dtype=np.uint8)

    # Convert image to PIL format
    pil_image = Image.fromarray(generated_image)

    return pil_image

# Route to generate the front elevation image
@app.route('/generate', methods=['POST'])
def generate():
    try:
        # Generate an image
        generated_image = generate_elevation()

        # Save the image to an in-memory buffer
        img_io = io.BytesIO()
        generated_image.save(img_io, format='PNG')
        img_io.seek(0)

        # Convert the image to Base64 format
        img_base64 = base64.b64encode(img_io.read()).decode('utf-8')

        # Return the image as a JSON response
        return jsonify({"image": img_base64})
    except Exception as e:
        # Return the error message if generation fails
        return jsonify({"error": str(e)}), 500

# Route for health check
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "Running", "message": "Model server is up and running!"})

# Main entry point to run the Flask application
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
