import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir: string = path.resolve('cache');

const resizeImage = async function (fileName: string, height: number, width: number) {
    // Resize image
    try {
        const img_dir = path.resolve('images');
        const filePath: string = path.join(img_dir, fileName);
        const fileNameSplit = fileName.split('.');
        const resizedFileName = `${fileNameSplit[0]}-${height}-${width}.jpg`;
        if (await !fs.existsSync(dir)) {
            await fs.mkdirSync(dir);
        }
        await sharp(filePath).resize(height, width).jpeg({ quality: 50 }).toFile(path.join(dir, resizedFileName));
        return path.join(dir, resizedFileName) as string;
    } catch (err) {
        // Catch an error with image resizing
        console.log(err);
        return 'ERROR: Specified image not found!';
    }
};

export default resizeImage;
