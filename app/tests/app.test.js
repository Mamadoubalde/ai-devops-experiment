const request = require('supertest');
const app = require('../server');

describe('Health Endpoints', () => {
  test('GET / should return service info', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toBe('ai-devops-experiment-api');
  });

  test('GET /api/status should return health data', async () => {
    const res = await request(app).get('/api/status');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body).toHaveProperty('uptime');
  });

  test('POST /api/echo should echo back data', async () => {
    const payload = { message: 'test', value: 42 };
    const res = await request(app).post('/api/echo').send(payload);
    expect(res.statusCode).toBe(200);
    expect(res.body.received).toEqual(payload);
    expect(res.body).toHaveProperty('timestamp');
  });

  test('GET /nonexistent should return 404', async () => {
    const res = await request(app).get('/nonexistent');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Not found');
  });
});
