import { getCustomRepository } from "typeorm";
import { Request, Response } from 'express';
import { UserRepository } from "../repositories/UserRepository";
import * as yup from 'yup';
import { AppError } from "../errors/AppError";

export class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object({
      name: yup.string().required(),
      email: yup.string().email().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch(error) {
      throw new AppError(error);
    }

    const userRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await userRepository.findOne({ email });
    
    if(userAlreadyExists)
      throw new AppError("Email already exists!");
    

    const user = userRepository.create({
      name, email
    });

    await userRepository.save(user);

    return response.status(201).json(user);
  }
}