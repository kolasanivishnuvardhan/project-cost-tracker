import { setItems, addItem, updateItem, deleteItem, setLoading, setError } from '../slices/itemsSlice';
import * as itemsService from '../../services/itemsService';

export const fetchItemsThunk = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const items = await itemsService.fetchItems(userId);
    dispatch(setItems(items));
    dispatch(setLoading(false));
    return items;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const addItemThunk = (userId, name, cost) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const newItem = await itemsService.addItem(userId, name, cost);
    dispatch(addItem(newItem));
    dispatch(setLoading(false));
    return newItem;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const updateItemThunk = (userId, itemId, name, cost) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const updatedItem = await itemsService.updateItem(userId, itemId, name, cost);
    dispatch(updateItem(updatedItem));
    dispatch(setLoading(false));
    return updatedItem;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const deleteItemThunk = (userId, itemId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await itemsService.deleteItem(userId, itemId);
    dispatch(deleteItem(itemId));
    dispatch(setLoading(false));
    return itemId;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    throw error;
  }
}; 