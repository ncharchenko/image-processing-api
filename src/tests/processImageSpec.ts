import resizeImage from '../utilities/resizeImage';
import getImage from '../utilities/getImage';

describe('Test resizeImage.', () => {
    // Write test for trying to get the resized image and test that an exception is thrown/caught.
    it('returns a resized image.', async(done) => {
        const img = resizeImage("fjord.jpg", 512, 512);
        expect(img).toBeDefined();
        done();
    });
    it('returns an image from cache.', async(done) => {
        const img = getImage("?fileName=fjord&height=512&width=512");
        expect(img).toBeDefined();
        done();
    });
})