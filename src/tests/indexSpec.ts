import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
    it('gets the api endpoint', async (done) => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
        done();
    });
    it('tries to get a non-existent endpoint', async (done) => {
        const response = await request.get('/bad');
        expect(response.status).toBe(404);
        done();
    });
    it('tests the processImage endpoint with a good request', async (done) => {
        const response = await request.get('/processImage?filename=fjord&height=512&width=512');
        expect(response.status).toBe(200);
        done();
    });
});
