import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IDistricstRepository from '@modules/districts/repositories/IDistrictRepository';
import DistrictsRepository from '@modules/districts/infra/typeorm/repositories/DistrictsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IDistricstRepository>(
  'DistrictsRepository',
  DistrictsRepository,
);
