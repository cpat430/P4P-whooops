import { Router } from 'express';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { FeedbackModel } from '../../db/feedback';
import { UserModel } from '../../db/user';

const router = Router();

router.post('/user', (request, response) => {
  const { firstName, lastName, email } = request.body;
  const id = uuid();
  const group = _.random(1, 3); // TODO get the least chosen

  UserModel.create({ id, firstName, lastName, email })
    .then(() => {
      console.log(`✅ Successfully created user ${id}`);
      response.status(200).send({ id, group });
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
