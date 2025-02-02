import express from 'express';

import { creatorRouter } from '@/routes/creatorRoute';
import { ownerRouter } from '@/routes/ownerRoute';
import { statusRouter } from '@/routes/statusRoute';
import { ticketRouter } from '@/routes/ticketRoute';

const app = express();
app.use(express.json());

app.use('/owner', ownerRouter);
app.use('/status', statusRouter);
app.use('/ticket', ticketRouter);
app.use('/creator', creatorRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
