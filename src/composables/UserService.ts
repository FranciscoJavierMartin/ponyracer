import axios from 'axios';
import { UserModel } from '@/models/UserModel';

export function useUserService() {
  return {
    async register(user: UserModel): Promise<UserModel> {
      const response = await axios.post<UserModel>(
        `${process.env.VUE_APP_SERVER_URL}users`,
        user
      );
      return response.data;
    },
  };
}
