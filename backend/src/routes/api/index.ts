import { Router } from 'express';
import { UserModel } from '../../db/user';
import { v4 as uuid } from 'uuid';

const router = Router();

router.post('/user', (request, response) => {
  const { firstName, lastName, email } = request.body;
  const id = uuid() as string;

  UserModel.create({ id, firstName, lastName, email })
    .then(() => {
      console.log('✅ Successfully logged event');
      response.status(200).send(id);
    })
    .catch(() => {
      console.log('🛑 Did not track event successfully');
      response.status(400);
    });
});

export default router;
