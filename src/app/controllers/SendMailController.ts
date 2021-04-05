import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import sendMailService from "../../services/sendMailService";
import { SurveyRepository } from "../repositories/SurveyRepository";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";
import { UserRepository } from "../repositories/UserRepository";
import path from 'path';
import { AppError } from "../errors/AppError";

export class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;
    
    const userRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const userAlreadyExists = await userRepository.findOne({ email });

    if(!userAlreadyExists)
      throw new AppError("User does not exist");

    const survey = await surveyRepository.findOne({ id: survey_id });

    if(!survey)
      throw new AppError("Survey does not exist");
     
    const npsPath = path.resolve(__dirname, "..", "..", "views", "mails", "npsMail.hbs");

    const surveyUserAlreadyExists = await surveyUserRepository.findOne({
      where: {user_id: userAlreadyExists.id, value: null},
      relations: ["user", "survey"]
    });

    const variables = {
      name: userAlreadyExists.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL
    }

    if(surveyUserAlreadyExists){
      variables.id = surveyUserAlreadyExists.id;
      await sendMailService.execute(userAlreadyExists.email, survey.title, variables, npsPath);
      return response.status(200).json(surveyUserAlreadyExists);
    }
    

    //Salvar as informações na tabela surveys_users
    const surveyUser = surveyUserRepository.create({
      user_id: userAlreadyExists.id,
      survey_id
    });
    await surveyUserRepository.save(surveyUser);
    //enviar o email para o cliente
    variables.id = surveyUser.id;
    await sendMailService.execute(email, survey.title, variables, npsPath);
    
    return response.status(201).json(surveyUser);
  }
}