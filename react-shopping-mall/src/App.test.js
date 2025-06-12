import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock components to avoid complex rendering in tests
jest.mock('./pages/Home/Home', () => {
  return function Home() {
    return <div data-testid="home-page">Home Page</div>;
  };
});

jest.mock('./pages/Products/Products', () => {
  return function Products() {
    return <div data-testid="products-page">Products Page</div>;
  };
});

jest.mock('./pages/Cart/Cart', () => {
  return function Cart() {
    return <div data-testid="cart-page">Cart Page</div>;
  };
});

const renderApp = () => {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

test('renders without crashing', () => {
  renderApp();
});

test('renders home page by default', () => {
  renderApp();
  expect(screen.getByTestId('home-page')).toBeInTheDocument();
});