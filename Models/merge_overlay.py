from PIL import Image
import random
import os

# Paths to your actual dataset and pre-processed (augmented) dataset directories
dataset_dir = r"D:\Riphah University\7\Final Year Project part 1\Merge pre processing\House Dataset"
augmented_dir = r"D:\Riphah University\7\Final Year Project part 1\Merge pre processing\pre process"

# Function to merge images side by side
def side_by_side_merge(image1_path, image2_path):
    image1 = Image.open(image1_path).convert('RGB')
    image2 = Image.open(image2_path).convert('RGB')
    
    # Resize images to the same height, keeping aspect ratio
    height = 256  # Fixed height for consistency
    image1 = image1.resize((height, height))
    image2 = image2.resize((height, height))
    
    # Create a new image with double the width of one image
    combined_width = image1.width + image2.width
    combined_image = Image.new('RGB', (combined_width, height))
    
    # Paste images side by side
    combined_image.paste(image1, (0, 0))
    combined_image.paste(image2, (image1.width, 0))
    
    return combined_image

# Function to augment dataset by merging images side by side and ensuring unique pairs
def augment_dataset_side_by_side(dataset_dir, augmented_dir, target_count=5000):
    os.makedirs(augmented_dir, exist_ok=True)
    image_files = [os.path.join(dataset_dir, img) for img in os.listdir(dataset_dir) if img.endswith(('jpg', 'jpeg', 'png'))]
    unique_pairs = set()
    count = 0
    
    while count < target_count:
        img1_path = random.choice(image_files)
        img2_path = random.choice(image_files)
        
        # Ensure different images are selected and the pair is unique
        if img1_path != img2_path:
            pair = tuple(sorted((img1_path, img2_path)))  # Sort to avoid (A, B) and (B, A) being counted separately
            if pair not in unique_pairs:
                unique_pairs.add(pair)
                
                # Merge images side by side
                merged_image = side_by_side_merge(img1_path, img2_path)
                
                # Save augmented image
                merged_image.save(os.path.join(augmented_dir, f"side_by_side_{count + 1}.png"))
                
                count += 1
                print(f"Generated image {count} / {target_count}")

# Apply side-by-side augmentation with the target count of 5000 unique images
augment_dataset_side_by_side(dataset_dir, augmented_dir, target_count=5000)
