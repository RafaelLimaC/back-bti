import express from 'express';
import ownerRoute from './src/routes/ownerRoute.js';
import statusRoute from './src/routes/statusRoute.js';

const app = express();
app.use(express.json());

app.use('/owner', ownerRoute);
app.use('/status', statusRoute);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});