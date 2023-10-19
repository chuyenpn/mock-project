import create from 'zustand';

import { useAuthStore } from '../auth';

describe('useAuthStore', () => {
  beforeEach(() => {
    create.useStore.setState({ isLoggedIn: false, isLoading: false });
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set isLoggedIn to true and store in localStorage when login is successful', async () => {
    const setMock = jest.fn();
    jest.spyOn(create, 'useStore').mockReturnValue({ login: setMock });

    await useAuthStore.getState().login('admin', 'admin');

    expect(setMock).toHaveBeenCalledWith('admin', 'admin');

    expect(create.useStore.setState).toHaveBeenCalledWith({ isLoading: true });
    expect(create.useStore.setState).toHaveBeenCalledWith({ isLoggedIn: true });
    expect(localStorage.getItem('isLoggedIn')).toBe('true');
  });

  it('should throw an error and not change isLoggedIn when login fails', async () => {
    const setMock = jest.fn();
    jest.spyOn(create, 'useStore').mockReturnValue({ login: setMock });

    await expect(useAuthStore.getState().login('invalid', 'password')).rejects.toThrowError(
      'Invalid credentials'
    );

    expect(setMock).toHaveBeenCalledWith('invalid', 'password');

    expect(create.useStore.setState).toHaveBeenCalledWith({ isLoading: true });
    expect(create.useStore.setState).toHaveBeenCalledWith({ isLoggedIn: false });
    expect(localStorage.getItem('isLoggedIn')).toBeNull();
  });

  it('should set isLoggedIn to false and remove from localStorage when logout is called', () => {
    localStorage.setItem('isLoggedIn', 'true');
    expect(localStorage.getItem('isLoggedIn')).toBe('true');

    useAuthStore.getState().logout();

    expect(create.useStore.setState).toHaveBeenCalledWith({ isLoggedIn: false });
    expect(localStorage.getItem('isLoggedIn')).toBeNull();
  });
});
