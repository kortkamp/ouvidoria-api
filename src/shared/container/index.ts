import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IDistricstRepository from '@modules/districts/repositories/IDistrictRepository';
import DistrictsRepository from '@modules/districts/infra/typeorm/repositories/DistrictsRepository';

import IComplaintsRepository from '@modules/complaints/repositories/IComplaintsRepository';
import ComplaintsRepository from '@modules/complaints/infra/typeorm/repositories/ComplaintsRepository';

import IAnswersRepository from '@modules/answers/repositories/IAnswersRepository';
import AnswersRepository from '@modules/answers/infra/typeorm/repositories/AnswersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IDistricstRepository>(
  'DistrictsRepository',
  DistrictsRepository,
);

container.registerSingleton<IComplaintsRepository>(
  'ComplaintsRepository',
  ComplaintsRepository,
);

container.registerSingleton<IAnswersRepository>(
  'AnswersRepository',
  AnswersRepository,
);
