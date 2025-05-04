import torch
import torch.nn as nn
import torch.optim as optim
import pandas as pd
from PIL import Image
import torchvision.transforms as transforms
from torch.utils.data import Dataset, DataLoader
import numpy as np

# Custom Dataset Class
class ImageTextDataset(Dataset):
    def __init__(self, csv_file, image_dir, transform=None):
        self.data = pd.read_csv(csv_file)
        self.image_dir = image_dir
        self.transform = transform
        # Simple text embedding (replace with BERT for better results)
        self.vocab = set(' '.join(self.data['description']).split())
        self.word2idx = {word: idx for idx, word in enumerate(self.vocab)}

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        img_name = self.data.iloc[idx]['filename']
        img_path = f"{self.image_dir}/{img_name}"
        image = Image.open(img_path).convert('RGB')
        description = self.data.iloc[idx]['description']

        if self.transform:
            image = self.transform(image)

        # Convert text to a simple embedding (average word indices)
        words = description.split()
        text_embedding = np.mean([self.word2idx.get(word, 0) for word in words], axis=0)
        text_embedding = torch.tensor(text_embedding, dtype=torch.float32)

        return image, text_embedding

# Generator Network
class Generator(nn.Module):
    def __init__(self, noise_dim=100, text_dim=1, img_channels=3):
        super(Generator, self).__init__()
        self.text_dim = text_dim
        self.main = nn.Sequential(
            nn.ConvTranspose2d(noise_dim + text_dim, 512, 4, 1, 0, bias=False),
            nn.BatchNorm2d(512),
            nn.ReLU(True),
            nn.ConvTranspose2d(512, 256, 4, 2, 1, bias=False),
            nn.BatchNorm2d(256),
            nn.ReLU(True),
            nn.ConvTranspose2d(256, 128, 4, 2, 1, bias=False),
            nn.BatchNorm2d(128),
            nn.ReLU(True),
            nn.ConvTranspose2d(128, 64, 4, 2, 1, bias=False),
            nn.BatchNorm2d(64),
            nn.ReLU(True),
            nn.ConvTranspose2d(64, img_channels, 4, 2, 1, bias=False),
            nn.Tanh()
        )

    def forward(self, noise, text):
        text = text.view(-1, self.text_dim, 1, 1)
        x = torch.cat([noise, text], dim=1)
        return self.main(x)

# Discriminator Network
class Discriminator(nn.Module):
    def __init__(self, img_channels=3, text_dim=1):
        super(Discriminator, self).__init__()
        self.main = nn.Sequential(
            nn.Conv2d(img_channels, 64, 4, 2, 1, bias=False),
            nn.LeakyReLU(0.2, inplace=True),
            nn.Conv2d(64, 128, 4, 2, 1, bias=False),
            nn.BatchNorm2d(128),
            nn.LeakyReLU(0.2, inplace=True),
            nn.Conv2d(128, 256, 4, 2, 1, bias=False),
            nn.BatchNorm2d(256),
            nn.LeakyReLU(0.2, inplace=True),
            nn.Conv2d(256, 512, 4, 2, 1, bias=False),
            nn.BatchNorm2d(512),
            nn.LeakyReLU(0.2, inplace=True),
        )
        self.text_layer = nn.Linear(text_dim, 512)
        self.final = nn.Sequential(
            nn.Conv2d(1024, 1, 4, 1, 0, bias=False),
            nn.Sigmoid()
        )

    def forward(self, img, text):
        img_features = self.main(img)
        text_features = self.text_layer(text).view(-1, 512, 1, 1)
        combined = torch.cat([img_features, text_features.expand(-1, -1, 4, 4)], dim=1)
        return self.final(combined)

# Training Parameters
noise_dim = 100
text_dim = 1  # Simplified for this example
img_channels = 3
lr = 0.0002
beta1 = 0.5
epochs = 200
batch_size = 64

# Data Loading
transform = transforms.Compose([
    transforms.Resize((64, 64)),  # Downsize for simplicity
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])
dataset = ImageTextDataset(csv_file='descriptions.csv', image_dir='images', transform=transform)
dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

# Model Initialization
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
generator = Generator(noise_dim, text_dim, img_channels).to(device)
discriminator = Discriminator(img_channels, text_dim).to(device)

# Optimizers
g_optimizer = optim.Adam(generator.parameters(), lr=lr, betas=(beta1, 0.999))
d_optimizer = optim.Adam(discriminator.parameters(), lr=lr, betas=(beta1, 0.999))

# Loss Function
criterion = nn.BCELoss()

# Training Loop
for epoch in range(epochs):
    for i, (real_imgs, text_embeddings) in enumerate(dataloader):
        batch_size = real_imgs.size(0)
        real_imgs = real_imgs.to(device)
        text_embeddings = text_embeddings.to(device)

        # Labels
        real_label = torch.ones(batch_size, 1).to(device)
        fake_label = torch.zeros(batch_size, 1).to(device)

        # Train Discriminator
        d_optimizer.zero_grad()
        output = discriminator(real_imgs, text_embeddings)
        d_loss_real = criterion(output, real_label)

        noise = torch.randn(batch_size, noise_dim, 1, 1).to(device)
        fake_imgs = generator(noise, text_embeddings)
        output = discriminator(fake_imgs.detach(), text_embeddings)
        d_loss_fake = criterion(output, fake_label)

        d_loss = d_loss_real + d_loss_fake
        d_loss.backward()
        d_optimizer.step()

        # Train Generator
        g_optimizer.zero_grad()
        output = discriminator(fake_imgs, text_embeddings)
        g_loss = criterion(output, real_label)
        g_loss.backward()
        g_optimizer.step()

    print(f"Epoch [{epoch+1}/{epochs}] D Loss: {d_loss.item():.4f} G Loss: {g_loss.item():.4f}")

# Generate an Image from Text
def generate_image(text_description):
    words = text_description.split()
    text_embedding = torch.tensor(np.mean([dataset.word2idx.get(word, 0) for word in words], axis=0), dtype=torch.float32).to(device)
    noise = torch.randn(1, noise_dim, 1, 1).to(device)
    with torch.no_grad():
        fake_img = generator(noise, text_embedding.view(1, text_dim))
    return fake_img

# Example Usage
sample_text = "modern two-story house with large windows"
generated_img = generate_image(sample_text)