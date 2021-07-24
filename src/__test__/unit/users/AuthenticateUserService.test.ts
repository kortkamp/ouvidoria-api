import CreateUserService from '@modules/users/services/CreateUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeUsersRepository:FakeUsersRepository;
let createUserService:CreateUserService;
let authenticateUserService:AuthenticateUserService;

const CreateUserRequest = {
  name: 'user',
  email: 'user@user.com',
  password: '123456',
};

describe('AuthenticateUserService', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(fakeUsersRepository);
    authenticateUserService = new AuthenticateUserService(fakeUsersRepository);

    await createUserService.execute(CreateUserRequest);
  });
  it('Should be able to authenticate an user', async () => {
    const { email, password } = CreateUserRequest;

    const token = await authenticateUserService.execute({ email, password });

    expect(token).toBeTruthy();
  });

  it('Should not be able to authenticate with wrong password', async () => {
    await expect(
      authenticateUserService.execute({ email: CreateUserRequest.email, password: 'wrong' }),
    ).rejects.toMatchObject({ statusCode: 401 });
  });

  it('Should not be able to authenticate with non existent user', async () => {
    await expect(
      authenticateUserService.execute({ email: 'not@exists.com', password: CreateUserRequest.password }),
    ).rejects.toMatchObject({ statusCode: 401 });
  });
});
