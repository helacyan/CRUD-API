import { Router } from '../framework/Router';
import { createUser, getUsers } from './user-controller'

export const router = new Router();

router.get('/api/users', getUsers);

router.post('/api/users', createUser);