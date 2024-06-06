import requests
import json
import io
files = {
    'image': open('C:\\Users\\silke\\OneDrive\\Documenten\\GitHub\\hewui\\backend\\testing\\Canon_40D.jpg', 'rb'),
}

response = requests.post('http://127.0.0.1:8000/extract_metadata', files=files).json()
# response = json.loads(response)
print(response['Model'])

# Prepare the image data
with open('C:\\Users\\silke\\OneDrive\\Documenten\\GitHub\\hewui\\backend\\testing\\Canon_40D.jpg', 'rb') as f:
    image_data = f.read()

# Wrap the image data in a BytesIO object
image_file = io.BytesIO(image_data)

# Prepare the metadata
metadata = {
    'title': 'My Image',
    'description': 'This is a test image',
}

# Send the request
files = {'image': image_file}
response = requests.post('http://127.0.0.1:8000/upload_image', files=files, data=metadata)

# Print the response
print(response.json())

response = requests.get('http://127.0.0.1:8000/get_images')

# Print the response
print(response.json())