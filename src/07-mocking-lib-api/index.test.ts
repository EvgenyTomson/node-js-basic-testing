import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  const mockResponseData = { data: 'test response data' };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    mockedAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue(mockResponseData),
    } as unknown as AxiosInstance);
  });

  afterEach(() => {
    jest.runAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/posts');

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/users');

    expect(mockedAxios.create().get).toHaveBeenCalledWith('/users');
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('/comments');

    expect(result).toEqual(mockResponseData.data);
  });
});
