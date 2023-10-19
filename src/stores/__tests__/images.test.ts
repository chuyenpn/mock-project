import axios, { AxiosResponse } from 'axios';
import create from 'zustand';

import { useImageStore } from '../images';

jest.mock('axios');

describe('useImageStore', () => {
  beforeEach(() => {
    create.useStore.setState({
      isLoading: false,
      isSearching: false,
      images: [],
      searchTerm: '',
      page: 1,
      perPage: 9,
      totalPages: 0,
      total: 0,
      orderBy: 'popular',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set searchTerm and page when setSearchTerm is called', () => {
    const setMock = jest.fn();
    create.useStore.setState({ searchTerm: 'nature', page: 2, isSearching: true });
    jest.spyOn(create, 'useStore').mockReturnValue({ setSearchTerm: setMock });

    useImageStore.getState().setSearchTerm('mountains');

    expect(setMock).toHaveBeenCalledWith('mountains');
    expect(create.useStore.setState).toHaveBeenCalledWith({
      searchTerm: 'mountains',
      page: 1,
      isSearching: true,
    });
  });

  it('should set page and isSearching when setPage is called', () => {
    const setMock = jest.fn();
    create.useStore.setState({ searchTerm: 'nature', page: 2, isSearching: true });
    jest.spyOn(create, 'useStore').mockReturnValue({ setPage: setMock });

    useImageStore.getState().setPage(3);

    expect(setMock).toHaveBeenCalledWith(3);
    expect(create.useStore.setState).toHaveBeenCalledWith({ page: 3, isSearching: false });
  });

  it('should set orderBy, page, and isSearching when setOrderBy is called', () => {
    const setMock = jest.fn();
    create.useStore.setState({ searchTerm: 'nature', page: 2, isSearching: true });
    jest.spyOn(create, 'useStore').mockReturnValue({ setOrderBy: setMock });

    useImageStore.getState().setOrderBy('latest');

    expect(setMock).toHaveBeenCalledWith('latest');
    expect(create.useStore.setState).toHaveBeenCalledWith({
      orderBy: 'latest',
      page: 1,
      isSearching: false,
    });
  });

  it('should fetch images and update store state', async () => {
    const axiosResponse: AxiosResponse = {
      data: {
        total: 20,
        totalHits: 10,
        hits: [
          { id: '1', url: 'https://example.com/image1.jpg', title: 'Image 1' },
          { id: '2', url: 'https://example.com/image2.jpg', title: 'Image 2' },
        ],
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    axios.get.mockResolvedValue(axiosResponse);

    await useImageStore.getState().getImages();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('?q=&page=1&per_page=9&order=popular&key=')
    );
    expect(create.useStore.setState).toHaveBeenCalledWith({
      images: [
        { id: '1', url: 'https://example.com/image1.jpg', title: 'Image 1' },
        { id: '2', url: 'https://example.com/image2.jpg', title: 'Image 2' },
      ],
      totalPages: 3,
      total: 20,
      isLoading: false,
    });
  });

  it('should handle errors when fetching images', async () => {
    const errorResponse = new Error('Failed to fetch images');
    axios.get.mockRejectedValue(errorResponse);

    await useImageStore.getState().getImages();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(create.useStore.setState).toHaveBeenCalledWith({ isLoading: false });
  });
});
