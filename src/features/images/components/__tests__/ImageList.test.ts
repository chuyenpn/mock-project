import { render, screen, fireEvent } from '@testing-library/react';
import { useImageStore } from '@/stores/images';
import { ImageList } from '../ImageList';

jest.mock('@/stores/images');

describe('ImageList component', () => {
  const mockImages = [
    { id: '1', url: 'https://example.com/image1.jpg', title: 'Image 1' },
    { id: '2', url: 'https://example.com/image2.jpg', title: 'Image 2' },
  ];

  beforeEach(() => {
    useImageStore.mockReturnValue({
      getImages: jest.fn(),
      images: mockImages,
      isLoading: false,
      page: 1,
      totalPages: 1,
      total: 2,
      perPage: 10,
      setPage: jest.fn(),
      searchTerm: '',
      setSearchTerm: jest.fn(),
      isSearching: false,
      orderBy: 'latest',
      setOrderBy: jest.fn(),
    });
  });

  it('should render the image list with the correct data', () => {
    render(<ImageList />);

    const imageElements = screen.getAllByAltText(/Image \d/i);
    expect(imageElements.length).toBe(2);
    expect(imageElements[0]).toHaveAttribute('src', 'https://example.com/image1.jpg');
    expect(imageElements[1]).toHaveAttribute('src', 'https://example.com/image2.jpg');
  });

  it('should call getImages when component mounts', () => {
    render(<ImageList />);
    expect(useImageStore().getImages).toHaveBeenCalledTimes(1);
  });

  it('should update the search term and trigger a search', () => {
    render(<ImageList />);

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'nature' } });

    expect(useImageStore().setSearchTerm).toHaveBeenCalledWith('nature');
    expect(useImageStore().getImages).toHaveBeenCalledTimes(2); // Once on mount and once on search term change
  });

  it('should update the page and trigger a page change', () => {
    render(<ImageList />);

    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);

    expect(useImageStore().setPage).toHaveBeenCalledWith(2);
    expect(useImageStore().getImages).toHaveBeenCalledTimes(2); // Once on mount and once on page change
  });

  it('should update the order by value and trigger an order by change', () => {
    render(<ImageList />);

    const orderBySelect = screen.getByLabelText('Order By');
    fireEvent.change(orderBySelect, { target: { value: 'popular' } });

    expect(useImageStore().setOrderBy).toHaveBeenCalledWith('popular');
    expect(useImageStore().getImages).toHaveBeenCalledTimes(2); // Once on mount and once on order by change
  });
});