import CreateAnswerService from '@modules/answers/services/CreateAnswerService';
import FakeAnswersRepository from '@modules/answers/repositories/fakes/FakeAnswersRepository';
import FakeComplaintsRepository from '@modules/complaints/repositories/fakes/FakeComplaintsRepository';
import ICreateAnswerDTO from '@modules/answers/dtos/ICreateAnswerDTO';
import { Complaint } from '@modules/complaints/infra/typeorm/entities/Complaint';

let fakeAnswersRepository:FakeAnswersRepository;
let fakeComplaintsRepository:FakeComplaintsRepository;
let createAnswerService:CreateAnswerService;
let complaint:Complaint;

let createAnswerData:ICreateAnswerDTO;

describe('CreateAnswerService', () => {
  beforeEach(async () => {
    fakeAnswersRepository = new FakeAnswersRepository();
    fakeComplaintsRepository = new FakeComplaintsRepository();

    createAnswerService = new CreateAnswerService(
      fakeAnswersRepository,
      fakeComplaintsRepository,
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
      deadline: 0,
    };
  });

  it('Should be able to create an answer', async () => {
    const answer = await createAnswerService.execute(createAnswerData);

    expect(answer).toMatchObject(createAnswerData);
  });

  it('Should not allow answer creation for a non exitent complaint', async () => {
    createAnswerData.complaint_id = 'not_existent_complaint_id';
    await expect(
      createAnswerService.execute(createAnswerData),
    ).rejects.toMatchObject({ statusCode: 400 });
  });
  it('Should not allow answer creation with empty message', async () => {
    createAnswerData.message = '';
    await expect(
      createAnswerService.execute(createAnswerData),
    ).rejects.toMatchObject({ statusCode: 400 });
  });
});
