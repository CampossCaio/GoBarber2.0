import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHasProvider from './HashProvider/implementations/BCryptHasProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHasProvider);
