'use strict';

import { JWToken } from '../utils/jwt';

const CONSTANTS = require('./../config/constants');
import { PasswordHash } from './../utils/password-hash';
import { QueryHandler } from './query-handler';

export class RouteHandler {


  constructor() {
  }

  async userNameCheckHandler(request, response) {
    const passwordHash = new PasswordHash();
    const queryHandler = new QueryHandler();
    const username = request.body.username;
    if (username === '') {
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USERNAME_NOT_FOUND
      });
    } else {
      try {
        const count = await queryHandler.userNameCheck({
          username: username.toLowerCase()
        });
        if (count > 0) {
          response.status(200).json({
            error: true,
            message: CONSTANTS.USERNAME_AVAILABLE_FAILED
          });
        } else {
          response.status(200).json({
            error: false,
            message: CONSTANTS.USERNAME_AVAILABLE_OK
          });
        }
      } catch (error) {
        response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.SERVER_ERROR_MESSAGE
        });
      }
    }
  }

  async registerRouteHandler(request, response) {
    const passwordHash = new PasswordHash();
    const jwt = new JWToken();
    const queryHandler = new QueryHandler();
    const data: any = {
      username: (request.body.username).toLowerCase(),
      email: (request.body.email),
      password: request.body.password
    };

    const count = await queryHandler.userNameCheck({
      email: data.email
    });
    if (count > 0) {
      response.status(200).json({
        error: true,
        message: CONSTANTS.EMAIL_AVAILABLE_FAILED
      });
    } else {
      if (!data.username) {
        response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USERNAME_NOT_FOUND
        });
      } else if (!data.password) {
        response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.PASSWORD_NOT_FOUND
        });
      } else if (!data.email) {
        response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.EMAIL_NOT_FOUND
        });
      } else {
        try {
          data.online = 'Y';
          data.socketId = '';
          data.password = passwordHash.createHash(data.password);
          const result: any = await queryHandler.registerUser(data);
          if (result === null || result === undefined) {
            response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
              error: false,
              message: CONSTANTS.USER_REGISTRATION_FAILED
            });
          } else {
            const dataObj = {
              id: result.insertedId,
              username: result.ops[0].username,
              email: result.ops[0].email
            };

            response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
              error: false,
              token: jwt.encodeToken(dataObj),
              message: CONSTANTS.USER_REGISTRATION_OK
            });
          }
        } catch (error) {
          if (error) {
            response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
              error: true,
              message: CONSTANTS.SERVER_ERROR_MESSAGE
            });
          }
        }
      }
    }
  }

  async loginRouteHandler(request, response) {
    const passwordHash = new PasswordHash();
    const jwt = new JWToken();
    const queryHandler = new QueryHandler();
    const data = {
      email: (request.body.email).toLowerCase(),
      password: request.body.password
    };
    if (data.email === '' || data.email === null) {
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USERNAME_NOT_FOUND
      });
    } else if (data.password === '' || data.password === null) {
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.PASSWORD_NOT_FOUND
      });
    } else {
      try {
        const result: any = await queryHandler.getUserByEmail(data.email);
        if (result === null || result === undefined) {
          response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.USER_LOGIN_FAILED
          });
        } else {
          if (passwordHash.compareHash(data.password, result.password)) {
            await queryHandler.makeUserOnline(result._id);
            const dataObj = {
              id: result._id,
              username: result.username,
              email: result.email
            };
            response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
              error: false,
              token: jwt.encodeToken(dataObj),
              message: CONSTANTS.USER_LOGIN_OK
            });
          } else {
            response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
              error: true,
              message: CONSTANTS.USER_LOGIN_PASSWORD_FAILED
            });
          }
        }
      } catch (error) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USER_LOGIN_FAILED
        });
      }
    }
  }
}
