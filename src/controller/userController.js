import Users from '../model/userModel.js';
import argon2, { hash } from 'argon2';
import { getUser, getUserId, createUser, updateUser, deleteUser } from '../service/userService.js';

export const getAllController = async (req, res) => {
  try {
    const user = await getUser();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserId(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createUserController = async (req, res) => {
  try {
    await createUser(req.body);
    res.status(201).json({ msg: 'user has been created' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUserController = async (req, res) => {
  try {
    await updateUser(req.params.id, req.body);
    res.status(200).json({ msg: 'user has been Updated' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(200).json({ msg: 'user has been deleted' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
