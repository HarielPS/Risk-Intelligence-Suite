import { httpClient } from './httpClient';
import type {
  CreateCreditApplicationDto,
  CreditApplicationResponse,
} from '../types/creditApplications';

export async function createCreditApplication(
  userId: string,
  data: CreateCreditApplicationDto,
): Promise<CreditApplicationResponse> {
  return httpClient.post<CreditApplicationResponse>(
    `/credit-applications/${userId}`,
    data,
  );
}
