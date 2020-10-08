import { container } from 'tsyringe';

import ICacheProvider from './modules/ICacheProvider';
import RedisCacheProvider from './implementation/RedisCacheProvider';
const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  providers.redis,
);
