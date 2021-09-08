import resizeImage from './resizeImage';
import path from 'path';
import fs from 'fs';

const dir: string = path.resolve('cache');

const getImage = async function (query: string) {
    const imageInfo = JSON.parse(query);
    // Is there a cleaner way to do this? Without this math, the dimensions become strings.
    const height: number = (imageInfo.height as number) * 1;
    const width: number = (imageInfo.width as number) * 1;
    const fileName = `${imageInfo.fileName}-${height}-${width}.jpg`;
    try {
        const filePath: string = path.join(dir, fileName);
        const img = fs.accessSync(filePath);
        // Return image from cache
        return img;
    } catch (err) {
        // Attempt to resize image
        console.log(`error ${err}`);
        if (err.code === 'ENOENT') {
            console.log(typeof height, typeof width);
            const img = await resizeImage(`${imageInfo.fileName}.jpg`, height as number, width as number);
            return img;
        }
    }
};

export default getImage;
