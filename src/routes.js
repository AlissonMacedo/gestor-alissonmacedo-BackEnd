import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import FileController from './app/controllers/FileController';
import EmpresaController from './app/controllers/EmpresaController';
import ClassController from './app/controllers/ClassController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/class', ClassController.index);
routes.post('/class', ClassController.store);
routes.put('/class/:id', ClassController.update);
routes.delete('/class/:id', ClassController.delete);

routes.get('/empresa/', EmpresaController.store);
routes.put('/empresa/', EmpresaController.update);
routes.delete('/empresa/', EmpresaController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
