export const validate = (schema, payload) => {
  const { error, value } = schema.validate(payload);
  if (error) {
    throw new Error(`Validation failed ${JSON.stringify(error)}`);
  } else {
    return value;
  }
};
