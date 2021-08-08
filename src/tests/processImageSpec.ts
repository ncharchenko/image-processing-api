import supertest from 'supertest';
import app from '../index';

const request = supertest(app);


describe('Test proccessImage route.', () => {
    it('returns a resized image.', async(done) => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
        done();
    });
    it('returns an error since the file is not found', async(done) => {
        const response = await request.get('/processImage?filename=ford&height=512&width=512');
        expect(response.status).toBe(404);
        done();
    });
    it('tests the processImage endpoint with a good request', async(done) => {
        const response = await request.get('/processImage?filename=fjord&height=512&width=512');
        expect(response.status).toBe(200);
        done();
    });
    it('tests the processImage endpoint with a bad request', async(done) => {
        const response = await request.get('/processImage?filename=');
        expect(response.status).toBe(400);
        done();
    });
});