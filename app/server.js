const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ai-devops-experiment-api',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.post('/api/echo', (req, res) => {
  res.json({
    received: req.body,
    timestamp: new Date().toISOString()
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
