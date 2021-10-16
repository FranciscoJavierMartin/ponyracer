import axios, { AxiosResponse } from 'axios';
import { RaceModel } from '@/models/RaceModel';

export function useRaceService() {
  return {
    async list(): Promise<Array<RaceModel>> {
      const response: AxiosResponse<Array<RaceModel>> = await axios.get<
        Array<RaceModel>
      >(`${process.env.VUE_APP_SERVER_URL}races`, {
        params: { status: 'PENDING' },
      });

      return response.data;
    },
  };
}
