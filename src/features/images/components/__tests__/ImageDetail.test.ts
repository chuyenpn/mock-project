import { render, screen } from '@testing-library/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useImageDetail } from '@/stores/imageDetail';
import { ImageDetail } from '../ImageDetail';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('@/stores/imageDetail', () => ({
  useImageDetail: jest.fn(),
}));

describe('ImageDetail component', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: '1' });
    useNavigate.mockReturnValue(jest.fn());
    useImageDetail.mockReturnValue({
      getImageDetail: jest.fn(),
      imageDetail: {
        largeImageURL: 'https://example.com/image1.jpg',
        user: 'John Doe',
        views: 1000,
      },
      isLoading: false,
    });
  });

  it('should render the image detail with correct data', () => {
    render(<ImageDetail />);

    const backButton = screen.getByText('< Back');
    const imageElement = screen.getByAltText('');
    const usernameElement = screen.getByText('John Doe');
    const viewsElement = screen.getByText('Views: 1000');

    expect(backButton).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'https://example.com/image1.jpg');
    expect(usernameElement).toBeInTheDocument();
    expect(viewsElement).toBeInTheDocument();
  });

  it('should call getImageDetail with the correct id', () => {
    render(<ImageDetail />);

    expect(useImageDetail().getImageDetail).toHaveBeenCalledWith('1');
  });

  it('should display a spinner while loading', () => {
    useImageDetail.mockReturnValue({
      getImageDetail: jest.fn(),
      imageDetail: null,
      isLoading: true,
    });

    render(<ImageDetail />);

    const spinnerElement = screen.getByTestId('spinner');

    expect(spinnerElement).toBeInTheDocument();
  });

  it('should navigate to "/images" when back button is clicked', () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    render(<ImageDetail />);

    const backButton = screen.getByText('< Back');
    backButton.click();

    expect(navigateMock).toHaveBeenCalledWith('/images');
  });
});