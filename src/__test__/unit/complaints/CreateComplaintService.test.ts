import CreateComplaintService from '@modules/complaints/services/CreateComplaintService';
import FakeComplaintsRepository from '@modules/complaints/repositories/fakes/FakeComplaintsRepository';
import FakeDistrictsRepository from '@modules/districts/repositories/fakes/FakeDistrictsRepository';
import ICreateComplaintDTO from '@modules/complaints/dtos/ICreateComplaintDTO';
import { District } from '@modules/districts/infra/typeorm/entities/District';

let fakeComplaintsRepository:FakeComplaintsRepository;
let fakeDistrictsRepository:FakeDistrictsRepository;
let createComplaintService:CreateComplaintService;
let districtName:string;
let district:District;
let createComplaintData:ICreateComplaintDTO;

describe('CreateComplaintsService', () => {
  beforeEach(async () => {
    fakeComplaintsRepository = new FakeComplaintsRepository();
    fakeDistrictsRepository = new FakeDistrictsRepository();

    createComplaintService = new CreateComplaintService(
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
  });

  it('Should be able to create a complaint', async () => {
    const complaint = await createComplaintService.execute(createComplaintData);

    expect(complaint).toMatchObject(createComplaintData);
  });

  it('Should not allow complaint creation for a non exitent district', async () => {
    createComplaintData.district_id = 'not_existent_district_id';
    await expect(
      createComplaintService.execute(createComplaintData),
    ).rejects.toMatchObject({ statusCode: 400 });
  });
  it('Should not allow complaint creation with empty message', async () => {
    createComplaintData.message = '';
    await expect(
      createComplaintService.execute(createComplaintData),
    ).rejects.toMatchObject({ statusCode: 400 });
  });
});
