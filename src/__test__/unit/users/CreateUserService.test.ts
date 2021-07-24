import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import { compare } from 'bcryptjs';

let fakeUsersRepository:FakeUsersRepository;
let createUserService:CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(fakeUsersRepository);
  });
  it('Should be able to create an user', async () => {
    const CreateUserRequest = {
      name: 'user',
      email: 'user@user.com',
      password: '123456',
    };

    const user = await createUserService.execute(CreateUserRequest);

    const { name, email } = CreateUserRequest;

    const passwordMatch = await compare(CreateUserRequest.password, user.password);

    expect(user).toMatchObject({ name, email });
    expect(passwordMatch).toBeTruthy();
  });

  it('Should return 409 error at creating already existent user ', async () => {
    const CreateUserRequest = {
      name: 'user',
      email: 'user@user.com',
      password: '123456',
    };

    // Create user.
    await createUserService.execute(CreateUserRequest);

    await expect(
      // Create the same user.
      createUserService.execute(CreateUserRequest),
    ).rejects.toMatchObject({ statusCode: 409 });
  });
});
