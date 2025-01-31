import express from 'express';
import ownerRoute from './src/routes/ownerRoute.js';
import statusRoute from './src/routes/statusRoute.js';
import ticketRoute from './src/routes/ticketRoute.js';

const app = express();
app.use(express.json());

app.use('/owner', ownerRoute);
app.use('/status', statusRoute);
app.use('/ticket', ticketRoute);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});