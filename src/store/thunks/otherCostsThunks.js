import { setOtherCosts, addOtherCost, updateOtherCost, deleteOtherCost, setLoading, setError } from '../slices/otherCostsSlice';
import * as otherCostsService from '../../services/otherCostsService';

export const fetchOtherCostsThunk = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const costs = await otherCostsService.fetchOtherCosts(userId);
    dispatch(setOtherCosts(costs));
    dispatch(setLoading(false));
    return costs;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const addOtherCostThunk = (userId, description, amount) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const newCost = await otherCostsService.addOtherCost(userId, description, amount);
    dispatch(addOtherCost(newCost));
    dispatch(setLoading(false));
    return newCost;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const updateOtherCostThunk = (userId, costId, description, amount) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const updatedCost = await otherCostsService.updateOtherCost(userId, costId, description, amount);
    dispatch(updateOtherCost(updatedCost));
    dispatch(setLoading(false));
    return updatedCost;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const deleteOtherCostThunk = (userId, costId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await otherCostsService.deleteOtherCost(userId, costId);
    dispatch(deleteOtherCost(costId));
    dispatch(setLoading(false));
    return costId;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    throw error;
  }
}; 