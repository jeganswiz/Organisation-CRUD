import express, { NextFunction, Request, Response, Router } from "express";
const router: Router = express.Router();
import { refreshToken, userLogin, userCreateValidation, userUpdateValidation, deleteUser, userLogout } from '../validation/user.valdiation'
import userController from '../controller/userController';
import { authenicate } from '../middleware/jwt'
router
    .route('/users')
    .get(userController.getUsers)
    .post(userCreateValidation, userController.createUser)
    .put(authenicate, userUpdateValidation, userController.updateUsers)
    .delete(authenicate, deleteUser, userController.deleteUser)

router
    .route('/login')
    .post(userLogin, userController.login)

router
    .route('/logout')
    .post(userLogout, userController.logout)

// router
//     .route('/:id')
//     .put(userUpdateValidation, userController.updateUsers)
//     .delete(deleteUser, userController.deleteUser)

router
    .route('/refreshToken')
    .post(refreshToken, userController.generateRefreshToken)

export default router
