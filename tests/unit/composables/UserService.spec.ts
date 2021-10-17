import axios, { AxiosResponse } from 'axios';
import { useUserService, retrieveUser } from '@/composables/UserService';
import { UserModel } from '@/models/UserModel';

const userModel: UserModel = {
  birthYear: 1986,
  login: 'cedric',
  password: '',
  money: 1000
};

describe('useUserService', () => {
  test('should register a user', async () => {
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(axios, 'post').mockResolvedValue({ data: userModel } as AxiosResponse<UserModel>);

    const formValues = {
      login: 'cedric',
      password: 'password',
      birthYear: 1986
    };

    const userService = useUserService();
    const userReceived = await userService.register(formValues);

    // It should post the user to the API
    expect(axios.post).toHaveBeenCalledWith('https://ponyracer.ninja-squad.com/api/users', formValues);
    // It should return a user for the `register` function
    expect(userReceived).toBe(userModel);
    // It should store the user with the `storeLoggedInUser` function
    expect(userService.userModel.value).toEqual(userModel);
    expect(Storage.prototype.setItem).toHaveBeenCalledWith('rememberMe', JSON.stringify(userModel));
  });

  test('should authenticate a user and store the user returned', async () => {
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(axios, 'post').mockResolvedValue({ data: userModel } as AxiosResponse<UserModel>);

    const formValues = {
      login: 'cedric',
      password: 'password'
    };

    const userService = useUserService();
    const userReceived = await userService.authenticate(formValues);

    // It should post the user to the API
    expect(axios.post).toHaveBeenCalledWith('https://ponyracer.ninja-squad.com/api/users/authentication', formValues);
    // It should return a user for the `authenticate` function
    expect(userReceived).toBe(userModel);
    // It should store the user with the `storeLoggedInUser` function
    expect(userService.userModel.value).toEqual(userModel);
    expect(Storage.prototype.setItem).toHaveBeenCalledWith('rememberMe', JSON.stringify(userModel));
  });

  test('should retrieve a user if one is stored', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(userModel));

    const userRetrieved = retrieveUser();

    expect(Storage.prototype.getItem).toHaveBeenCalledWith('rememberMe');
    expect(userRetrieved).toEqual(userModel);
  });

  test('should retrieve no user if none stored', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    const userRetrieved = retrieveUser();

    expect(Storage.prototype.getItem).toHaveBeenCalledWith('rememberMe');
    expect(userRetrieved).toBeNull();
  });

  test('should logout the user', () => {
    jest.spyOn(Storage.prototype, 'removeItem');
    const userService = useUserService();
    userService.userModel.value = userModel;

    userService.logoutAndForget();

    expect(userService.userModel.value).toBeNull();
    expect(Storage.prototype.removeItem).toHaveBeenCalledWith('rememberMe');
  });
});
