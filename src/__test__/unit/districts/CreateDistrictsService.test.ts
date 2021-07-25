import CreateDistrictService from '@modules/districts/services/CreateDistrictService';
import FakeDistrictsRepository from '@modules/districts/repositories/fakes/FakeDistrictsRepository';

let fakeDistrictsRepository:FakeDistrictsRepository;
let createDistrictService:CreateDistrictService;

const districtName = 'districtName';

describe('CreateDistrictService', () => {
  beforeEach(() => {
    fakeDistrictsRepository = new FakeDistrictsRepository();
    createDistrictService = new CreateDistrictService(fakeDistrictsRepository);
  });

  it('Should be able to create a district', async () => {
    const district = await createDistrictService.execute(districtName);

    expect(district).toMatchObject({ name: districtName });
  });

  it('Should not be possible to create empty name district', async () => {
    await expect(
      createDistrictService.execute(''),
    ).rejects.toMatchObject({ statusCode: 401 });
  });

  it('Should not be possible to create an already existent district', async () => {
    await createDistrictService.execute('districtName2');
    await expect(
      createDistrictService.execute('districtName2'),
    ).rejects.toMatchObject({ statusCode: 409 });
  });
});
