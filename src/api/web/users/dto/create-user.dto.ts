import { t } from 'elysia';

export const CreateUserDto = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 8 }),
  name: t.String(),
});
