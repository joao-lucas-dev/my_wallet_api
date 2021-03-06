import { Router } from 'express';

import { AuthenticateUserService } from '../services/AuthenticateUserService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const session = await authenticateUserService.execute({ email, password });

    return response.json(session);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export { sessionsRoutes };
