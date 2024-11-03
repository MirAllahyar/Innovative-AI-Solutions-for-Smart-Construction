from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import torch
from torchvision import transforms
from PIL import Image
import io

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS to allow cross-origin requests

# Load your trained Generator model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Define your Generator model (same architecture as in training)
class GeneratorUNet(torch.nn.Module):
    def __init__(self):
        super(GeneratorUNet, self).__init__()
        self.encoder = torch.nn.Sequential(
            torch.nn.Conv2d(3, 64, kernel_size=4, stride=2, padding=1),
            torch.nn.LeakyReLU(0.2, inplace=True),
            torch.nn.Conv2d(64, 128, kernel_size=4, stride=2, padding=1),
            torch.nn.BatchNorm2d(128),
            torch.nn.LeakyReLU(0.2, inplace=True),
            torch.nn.Conv2d(128, 256, kernel_size=4, stride=2, padding=1),
            torch.nn.BatchNorm2d(256),
            torch.nn.LeakyReLU(0.2, inplace=True),
            torch.nn.Conv2d(256, 512, kernel_size=4, stride=2, padding=1),
            torch.nn.BatchNorm2d(512),
            torch.nn.LeakyReLU(0.2, inplace=True),
            torch.nn.Conv2d(512, 512, kernel_size=4, stride=2, padding=1),
            torch.nn.BatchNorm2d(512),
            torch.nn.LeakyReLU(0.2, inplace=True)
        )
        self.decoder = torch.nn.Sequential(
            torch.nn.ConvTranspose2d(512, 512, kernel_size=4, stride=2, padding=1),
            torch.nn.BatchNorm2d(512),
            torch.nn.ReLU(inplace=True),
            torch.nn.ConvTranspose2d(512, 256, kernel_size=4, stride=2, padding=1),
            torch.nn.BatchNorm2d(256),
            torch.nn.ReLU(inplace=True),
            torch.nn.ConvTranspose2d(256, 128, kernel_size=4, stride=2, padding=1),
            torch.nn.BatchNorm2d(128),
            torch.nn.ReLU(inplace=True),
            torch.nn.ConvTranspose2d(128, 64, kernel_size=4, stride=2, padding=1),
            torch.nn.BatchNorm2d(64),
            torch.nn.ReLU(inplace=True),
            torch.nn.ConvTranspose2d(64, 3, kernel_size=4, stride=2, padding=1),
            torch.nn.Tanh()
        )

    def forward(self, x):
        enc = self.encoder(x)
        out = self.decoder(enc)
        return out

# Initialize and load the model
netG = GeneratorUNet().to(device)
netG.load_state_dict(torch.load('Pix2Pix_netG_epoch_49.pth', map_location=device), strict=False)
netG.eval()

# Define image preprocessing transformations
transform = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.ToTensor(),
    transforms.Normalize([0.5] * 3, [0.5] * 3)
])

# Define a route to handle image generation
@app.route('/generate', methods=['POST'])
def generate_image():
    try:
        # Get the uploaded image from the request
        file = request.files['image']
        image = Image.open(file).convert('RGB')
        input_image = transform(image).unsqueeze(0).to(device)

        # Generate the image using the trained model
        with torch.no_grad():
            generated_image = netG(input_image).cpu().squeeze(0)
            generated_image = (generated_image * 0.5 + 0.5).clamp(0, 1)

        # Convert the generated image to a PIL image
        generated_image = transforms.ToPILImage()(generated_image)

        # Save the generated image to a byte stream
        img_byte_arr = io.BytesIO()
        generated_image.save(img_byte_arr, format='PNG')
        img_byte_arr.seek(0)

        # Send the generated image as a response
        return send_file(img_byte_arr, mimetype='image/png')

    except Exception as e:
        return jsonify({'error': str(e)})

# Run the Flask app
if __name__ == '__main__':
    app.run(port=5000)
