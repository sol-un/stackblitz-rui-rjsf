import { ErrorTransformer } from '@rjsf/utils';

const errorNameToTransformerMap = {
  required: (error) => ({ ...error, message: 'Не должно быть пустым' }),
  minLength: (error) => ({
    ...error,
    message: `Не меньше ${error.params.limit} символов`,
  }),
  maxLength: (error) => ({
    ...error,
    message: `Не больше ${error.params.limit} символов`,
  }),
};

export const transformErrors: ErrorTransformer = (errors) =>
  errors.map((error) => {
    return errorNameToTransformerMap[error.name](error);
  });
