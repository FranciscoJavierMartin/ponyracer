import { ref, Ref } from 'vue';
import axios from 'axios';
import { UserModel } from '@/models/UserModel';

const userModel: Ref<UserModel | null> = ref<UserModel | null>(null);

export function useUserService() {
  return {
    userModel,
    async register(user: UserModel): Promise<UserModel> {
      const response = await axios.post<UserModel>(
        `${process.env.VUE_APP_SERVER_URL}users`,
        user
      );
      return response.data;
    },
    async authenticate(credentials: {
      login: string;
      password: string;
    }): Promise<UserModel> {
      const response = await axios.post<UserModel>(
        `${process.env.VUE_APP_SERVER_URL}users/authentication`,
        credentials
      );
      userModel.value = response.data;
      return response.data;
    },
  };
}
