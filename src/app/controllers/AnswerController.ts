import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";

/**
 * request.query => non-mandatory data: exemple: url.com/?search=blablablabla
 * request.params => in url, exemple: url.com/1
 */

export class AnswerController {

  async execute(request: Request ,response: Response) {

    const { value } = request.params;
    const { u } = request.query;

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUser = await surveyUserRepository.findOne({ id: String(u) });

    if(!surveyUser)
      throw new AppError("Survey user does not exists!");

    surveyUser.value = Number(value);

    await surveyUserRepository.save(surveyUser);

    return response.status(204).json(surveyUser);

  }

}