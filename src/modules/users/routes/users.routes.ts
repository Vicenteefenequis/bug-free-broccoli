import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../controllers/UsersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRoutes = Router();
const usersController = new UserController();

const userAvatarController = new UserAvatarController();

usersRoutes.get('/', isAuthenticated, usersController.index);
usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRoutes.patch(
  '/avatar',
  isAuthenticated,
  multer(uploadConfig).single('avatar'),
  userAvatarController.update,
);

export default usersRoutes;
