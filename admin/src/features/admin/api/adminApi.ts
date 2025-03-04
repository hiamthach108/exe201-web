import httpRequest from "@/libs/axios";
import { GetOverviewResp } from "../types";

export const getOverview = async (): Promise<GetOverviewResp> => {
  try {
    const response: GetOverviewResp = await httpRequest.get('/analytics/overview');
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

