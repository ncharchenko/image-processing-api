import resizeImage from './resizeImage';
import path from 'path';
import fs from 'fs';

const dir: string = path.resolve('cache');

const getImage = async function (query: string): Promise<string> {
    const imageInfo = JSON.parse(query);
    // Is there a cleaner way to do this? Without this math, the dimensions become strings.
    const height: number = (imageInfo.height as number) * 1;
    const width: number = (imageInfo.width as number) * 1;
    const fileName = `${imageInfo.fileName}-${height}-${width}.jpg`;
    const filePath: string = path.join(dir, fileName);
    try {
        const img = fs.accessSync(filePath);
    } catch (err) {
        // Attempt to resize image
        console.log(`error ${err}`);
        if (err.code === 'ENOENT') {
            console.log(typeof height, typeof width);
            await resizeImage(`${imageInfo.fileName}.jpg`, height as number, width as number);
            const img = fs.accessSync(filePath);
        }
    }
    return filePath;
};

export default getImage;
