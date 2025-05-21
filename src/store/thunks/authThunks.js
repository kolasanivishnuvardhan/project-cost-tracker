import { loginStart, loginSuccess, loginFailure, logout } from '../slices/authSlice';
import { registerUser, loginUser, logoutUser, loginWithGoogle } from '../../services/authService';

export const registerUserThunk = (email, password, displayName) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const user = await registerUser(email, password, displayName);
    dispatch(loginSuccess({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || displayName
    }));
    return user;
  } catch (error) {
    dispatch(loginFailure(error.message));
    throw error;
  }
};

export const loginUserThunk = (email, password) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const user = await loginUser(email, password);
    dispatch(loginSuccess({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }));
    return user;
  } catch (error) {
    dispatch(loginFailure(error.message));
    throw error;
  }
};

export const loginWithGoogleThunk = () => async (dispatch) => {
  try {
    dispatch(loginStart());
    const user = await loginWithGoogle();
    dispatch(loginSuccess({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }));
    return user;
  } catch (error) {
    dispatch(loginFailure(error.message));
    throw error;
  }
};

export const logoutUserThunk = () => async (dispatch) => {
  try {
    await logoutUser();
    dispatch(logout());
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}; 