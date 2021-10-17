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
    async bet(raceId: number, ponyId: number): Promise<RaceModel> {
      const response = await axios.post<RaceModel>(
        `${process.env.VUE_APP_SERVER_URL}races/${raceId}/bets`,
        { ponyId }
      );
      return response.data;
    },
    async get(raceId: number): Promise<RaceModel> {
      const response = await axios.get<RaceModel>(
        `${process.env.VUE_APP_SERVER_URL}races/${raceId}`
      );
      return response.data;
    },
    async cancelBet(raceId: number): Promise<void> {
      await axios.delete(
        `${process.env.VUE_APP_SERVER_URL}races/${raceId}/bets`
      );
    },
  };
}
