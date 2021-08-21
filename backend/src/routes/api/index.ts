import { Router } from 'express';
import { UserModel } from '../../db/user';
import { v4 as uuid } from 'uuid';
import { FeedbackModel } from '../../db/feedback';

const router = Router();

router.post('/user', (request, response) => {
  const { firstName, lastName, email } = request.body;
  const id = uuid();

  UserModel.create({ id, firstName, lastName, email })
    .then(() => {
      console.log(`✅ Successfully created user ${id}`);
      response.status(200).send(id);
    })
    .catch(() => {
      console.log('🛑 Did not track event successfully');
      response.status(400);
    });
});

router.post('/feedback', (request, response) => {
  const { id, email, question, answer, rating } = request.body;

  FeedbackModel.create({ id, email, question, answer, rating })
    .then(() => {
      console.log(`✅ Successfully created feedback for ${email}`);
      response.status(200).send(id);
    })
    .catch(() => {
      console.log(`🛑 Unsuccessfully stored the feedback for ${email}`);
      response.status(400);
    });
});

export default router;
