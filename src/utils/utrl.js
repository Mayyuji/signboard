export function getImageSize (imageUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const width = img.width;
            const height = img.height;
            const proportion = 300 / Math.max(width, height);
            const newWidth = parseInt(width * proportion);
            const newHeight = parseInt(height * proportion);
            resolve({ newWidth, newHeight });
        };
        img.onerror = () => {
            reject(new Error(`Failed to load image: ${imageUrl}`));
        };
        img.src = imageUrl;
    });
}