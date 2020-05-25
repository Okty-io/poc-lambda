const lambda = require('../../src/entrypoint.js');

describe('Test entrypoint', () => {

    it('should return a HTTP 200', async () => {
        const event = { httpMethod: 'POST' }

        const result = await lambda.handle(event);

        expect(result.statusCode).toEqual(200);
    });
}); 
