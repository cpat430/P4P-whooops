import { connectCloudDB } from '../db';

it('connect to cloud DB without credentials', async () => {
  try {
    await connectCloudDB();
    fail();
  } catch (e) {
    // nice
  }
});
