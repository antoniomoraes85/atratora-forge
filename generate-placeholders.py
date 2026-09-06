import os
import base64

base64_img = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
img_data = base64.b64decode(base64_img)

files = [
    'platform-guide.png',
    'croqui-converter-guide.png',
    'map-studio-guide.png',
    'croqui-studio-guide.png',
    'dynamics-guide.png',
    'validator-guide.png',
    'documents-guide.png',
    'field-toolkit-guide.png',
    'business-automation-guide.png'
]

os.makedirs('public/guides', exist_ok=True)

for file in files:
    with open(f'public/guides/{file}', 'wb') as f:
        f.write(img_data)

print("Imagens placeholder geradas com sucesso.")
