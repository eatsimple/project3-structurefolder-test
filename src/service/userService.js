import Users from '../model/userModel.js';
import argon2 from 'argon2';
import { validate } from '../validation/validate.js';
import { createUserSchema, updateUserSchema } from '../validation/userValidation.js';

export const getUser = async () => {
  try {
    const user = await Users.findAll();
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserId = async (id) => {
  try {
    const user = await Users.findOne({
      where: {
        uuid: id,
      },
    });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export const createUser = async (body) => {
  const { error, value } = createUserSchema.validate(body);
  if (error) throw new Error(error.details[0].message);

  const { name, email, password, confPassword, role } = value;
  if (password !== confPassword) throw new Error('password and confirm password is not same');
  const hash = await argon2.hash(password);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hash,
      role: role,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUser = async (userId, body) => {
  const user = await Users.findOne({
    where: {
      uuid: userId,
    },
  });
  if (!user) throw new Error('user is not found');

  // validate schema
  const { error, value } = updateUserSchema.validate(body);
  if (error) throw new Error(error.details[0].message);

  const { name, email, password, confPassword, role } = value;
  let hashPassword;
  if (password === '' || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword) throw new Error('pass and confirm pass is not same');

  try {
    await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUser = async (userId) => {
  const user = await Users.findOne({
    where: {
      uuid: userId,
    },
  });
  if (!user) throw new Error('user is not found');
  try {
    return await Users.destroy({ where: { id: user.id } });
  } catch (error) {
    throw new Error('user could not be deleted');
  }
};
