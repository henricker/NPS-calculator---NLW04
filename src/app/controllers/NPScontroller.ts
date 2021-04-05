import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";


export class NPSController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveyUsersRepository = getCustomRepository(SurveyUserRepository);

    const surveyUsers = await surveyUsersRepository.find({
      survey_id, 
      value: Not(IsNull()),
    });

    const detractors = surveyUsers.filter(
      surveyUser => (surveyUser.value >= 1 && surveyUser.value <= 6)
    ).length;

    const passive = surveyUsers.filter(
      surveyUser => (surveyUser.value >= 7 && surveyUser.value <= 8)
    ).length;

    const promoters = surveyUsers.filter(
      surveyUser => (surveyUser.value >= 9 && surveyUser.value <= 10)
    ).length;

    const totalAnswers = surveyUsers.length;

    const calculate = Number(((promoters - detractors) / totalAnswers * 100).toFixed(2));
    
    return response.status(200).json({
      detractors,
      passive,
      promoters,
      totalAnswers,
      nps: calculate,
    });
    
  }
}