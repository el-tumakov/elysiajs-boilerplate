import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

import { logger } from './core/logger';

import { WebApi } from './api/web/web.api';

import { onErrorInterceptor } from './common/interceptors';

const app = new Elysia({ precompile: true })
  .use(
    swagger({
      provider: 'swagger-ui',
      path: '/docs',
      autoDarkMode: false,
      exclude: ['/docs', '/docs/json'],
      documentation: {
        info: {
          title: 'API Documentation',
          version: '1.0.0',
        },
        tags: [{ name: 'Users', description: 'Users endpoints' }],
      },
    }),
  )
  .use(onErrorInterceptor)
  .use(WebApi)
  .listen(3000);

logger.info(`Server is running at ${app.server?.hostname}:${app.server?.port}`);
