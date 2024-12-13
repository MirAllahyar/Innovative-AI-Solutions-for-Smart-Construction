import os
import random
from PIL import Image

# Directories - use raw strings or double backslashes to avoid escape sequence warnings
dataset_path = r'D:\Riphah University\7\Final Year Project part 1\Dataset\Without preprocessing\House Dataset'  # Base path where your dataset is located
output_base_path = r'D:\Riphah University\7\Final Year Project part 1\Dataset\Pre processing'  # Path for processed data

# Ensure the output directories exist
for split in ['Train', 'Validation', 'Test']:
    os.makedirs(os.path.join(output_base_path, split), exist_ok=True)

# Function to resize and augment images
def preprocess_and_augment_image(src_file, dst_folder):
    try:
        with Image.open(src_file) as img:
            img = img.resize((224, 224), Image.BICUBIC)  # Use BICUBIC for resizing
            img.save(os.path.join(dst_folder, os.path.basename(src_file)))

            # Data augmentation: flipping the image
            flipped_img = img.transpose(Image.FLIP_LEFT_RIGHT)
            flipped_img.save(os.path.join(dst_folder, f"flipped_{os.path.basename(src_file)}"))
    except Exception as e:
        print(f"Error processing file {src_file}: {e}")

# Function to split data into training, validation, and testing sets
def split_data(file_list):
    random.shuffle(file_list)  # Shuffle the file list for random selection
    total_files = len(file_list)

    # Calculate split sizes
    train_size = int(0.7 * total_files)
    val_size = int(0.1 * total_files)
    test_size = total_files - train_size - val_size  # Remaining files for test

    # Split the files into train, validation, and test sets
    return file_list[:train_size], file_list[train_size:train_size + val_size], file_list[train_size + val_size:]

# Process the dataset folder
# Get the files in the dataset folder
try:
    files = [os.path.join(dataset_path, file_name) for file_name in os.listdir(dataset_path) 
             if file_name.lower().endswith(('.png', '.jpg', '.jpeg'))]
except Exception as e:
    print(f"Error accessing dataset folder {dataset_path}: {e}")

# Split the data
train_files, val_files, test_files = split_data(files)

# Preprocess and augment images for each split
for split_name, split_files in zip(['Train', 'Validation', 'Test'], [train_files, val_files, test_files]):
    print(f"Processing {split_name}")
    for src_file in split_files:
        print(f"Processing file: {src_file}")  # Debugging output
        preprocess_and_augment_image(src_file, os.path.join(output_base_path, split_name))

print("Preprocessing and augmentation completed successfully.")
