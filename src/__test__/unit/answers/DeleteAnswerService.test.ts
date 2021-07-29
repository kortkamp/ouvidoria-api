import DeleteAnswerService from '@modules/answers/services/DeleteAnswerService';
import FakeAnswersRepository from '@modules/answers/repositories/fakes/FakeAnswersRepository';
import FakeComplaintsRepository from '@modules/complaints/repositories/fakes/FakeComplaintsRepository';
import ICreateAnswerDTO from '@modules/answers/dtos/ICreateAnswerDTO';
import { Complaint } from '@modules/complaints/infra/typeorm/entities/Complaint';
import { Answer } from '@modules/answers/infra/typeorm/entities/Answer';

let fakeAnswersRepository:FakeAnswersRepository;
let fakeComplaintsRepository:FakeComplaintsRepository;
let deleteAnswerService:DeleteAnswerService;
let complaint:Complaint;

let createAnswerData:ICreateAnswerDTO;

let answer:Answer;

describe('CreateAnswerService', () => {
  beforeEach(async () => {
    fakeAnswersRepository = new FakeAnswersRepository();
    fakeComplaintsRepository = new FakeComplaintsRepository();

    deleteAnswerService = new DeleteAnswerService(
      fakeAnswersRepository,
    );

    complaint = await fakeComplaintsRepository.create({
      district_id: '1',
      user_sender: '1',
      message: 'some random complaint',
    });

    createAnswerData = {
      complaint_id: complaint.id,
      user_sender: '1',
      message: 'Some random answer',
    };

    answer = await fakeAnswersRepository.create(createAnswerData);
  });

  it('Should return error at deleting an inexistent answer', async () => {
    await expect(
      deleteAnswerService.execute(answer.id),
    ).resolves.toBeUndefined();
  });

  it('Should be able to delete an answer', async () => {
    await expect(
      deleteAnswerService.execute(answer.id),
    ).resolves.toBeUndefined();
  });
});
