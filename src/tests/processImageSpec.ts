import processImage from '../routes/api/processImage';


describe('Test resizeImage.', () => {
    // Write test for trying to get the resized image and test that an exception is thrown/caught.
    it('returns a resized image.', async(done) => {
        const img = processImage.resizeImage("fjord.jpg", 512, 512);
        expect(img).toBeDefined();
        done();
    });
})