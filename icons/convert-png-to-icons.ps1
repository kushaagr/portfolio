# 1. Create the legacy multi-resolution favicon.ico (contains 16x16, 32x32, and 48x48)
magick source.png -define icon:auto-resize=16,32,48 favicon.ico

# 2. Create the modern standard PNG favicons
magick source.png -resize 16x16 favicon-16x16.png
magick source.png -resize 32x32 favicon-32x32.png

# 3. Create the Apple Touch icon (for iOS home screens)
magick source.png -resize 180x180 apple-touch-icon.png

# 4. Create Android/PWA web manifest icons
magick source.png -resize 192x192 android-chrome-192x192.png
magick source.png -resize 512x512 android-chrome-512x512.png