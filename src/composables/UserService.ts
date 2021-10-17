import { ref, Ref } from 'vue';
import axios from 'axios';
import { UserModel } from '@/models/UserModel';

const userModel: Ref<UserModel | null> = ref<UserModel | null>(null);

export function retrieveUser(): UserModel | null {
  const userAsString = window.localStorage.getItem('rememberMe');
  return userAsString ? JSON.parse(userAsString) : null;
}

function storeLoggedInUser(user: UserModel): void {
  userModel.value = user;
  window.localStorage.setItem('rememberMe', JSON.stringify(user));
}

export function useUserService() {
  return {
    userModel,
    async register(user: UserModel): Promise<UserModel> {
      const response = await axios.post<UserModel>(
        `${process.env.VUE_APP_SERVER_URL}users`,
        user
      );
      const userFromServer = response.data;
      storeLoggedInUser(userFromServer);
      return userFromServer;
    },
    async authenticate(credentials: {
      login: string;
      password: string;
    }): Promise<UserModel> {
      const response = await axios.post<UserModel>(
        `${process.env.VUE_APP_SERVER_URL}users/authentication`,
        credentials
      );
      const user = response.data;
      storeLoggedInUser(user);
      return user;
    },
    logoutAndForget(): void {
      userModel.value = null;
      window.localStorage.removeItem('rememberMe');
    },
  };
}
