import resizeImage from '../../utilities/resizeImage';
import getImage from '../../utilities/getImage';

describe('Test resizeImage.', () => {
    // Write test for trying to get the resized image and test that an exception is thrown/caught.
    it('returns a resized image.', async (done) => {
        const img = resizeImage('fjord.jpg', 512, 512);
        expect(img).toBeDefined();
        done();
    });
    it('resizes an image and returns it.', async (done) => {
        const query = {
            fileName: 'encenadaport',
            height: '512',
            width: '512',
        };
        const img = getImage(JSON.stringify(query));
        expect(img).toBeDefined();
        done();
    });
    it('throws an exception.', async (done) => {
        const query = {
            fileName: 'ford',
            height: '512',
            width: '512',
        };
        expect(function (): void {
            getImage(JSON.stringify(query));
        }).toThrowError();
        done();
    });
});
