import express from 'express';
import routes from './routes/indexRoute';

export const app = express();
const port = 8000;

// route default homepage
app.get('/api', routes);

// start the express server
app.listen(port, (): void => {
    console.log(`server started at http://localhost:${port}`);
});

