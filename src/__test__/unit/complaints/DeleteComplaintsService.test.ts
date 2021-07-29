import DeleteComplaintService from '@modules/complaints/services/DeleteComplaintService';
import FakeComplaintsRepository from '@modules/complaints/repositories/fakes/FakeComplaintsRepository';
import FakeDistrictsRepository from '@modules/districts/repositories/fakes/FakeDistrictsRepository';
import ICreateComplaintDTO from '@modules/complaints/dtos/ICreateComplaintDTO';
import { District } from '@modules/districts/infra/typeorm/entities/District';
import { Complaint } from '@modules/complaints/infra/typeorm/entities/Complaint';

let fakeComplaintsRepository:FakeComplaintsRepository;
let fakeDistrictsRepository:FakeDistrictsRepository;
let deleteComplaintService:DeleteComplaintService;
let districtName:string;
let district:District;
let createComplaintData:ICreateComplaintDTO;
let complaint: Complaint;

describe('DeleteComplaintsService', () => {
  beforeEach(async () => {
    fakeComplaintsRepository = new FakeComplaintsRepository();
    fakeDistrictsRepository = new FakeDistrictsRepository();

    deleteComplaintService = new DeleteComplaintService(
      fakeComplaintsRepository,
      fakeDistrictsRepository,
    );

    districtName = 'districtName';

    district = await fakeDistrictsRepository.create(districtName);

    createComplaintData = {
      district_id: district.id,
      message: `Some random complaint about ${district.name}`,
      user_sender: '1',
    };

    complaint = await fakeComplaintsRepository.create(createComplaintData);
  });

  it('Should not allow an user to delete someones else complaint', async () => {
    await expect(
      deleteComplaintService.execute({
        complaint_id: complaint.id,
        user_sender: 'someone_use_id',
      }),
    ).rejects.toMatchObject({ statusCode: 401 });
  });

  it('Should be able to delete a complaint', async () => {
    await expect(
      deleteComplaintService.execute({
        complaint_id: complaint.id,
        user_sender: complaint.user_sender,
      }),

    ).resolves.toBeUndefined();
  });

  it('Should return error at deleting an enexistent complaint', async () => {
    await expect(
      deleteComplaintService.execute({
        complaint_id: 'enexistent_complaint_id',
        user_sender: complaint.user_sender,
      }),

    ).rejects.toMatchObject({ statusCode: 404 });
  });
});
