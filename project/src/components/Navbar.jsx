import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/products" className="text-xl font-bold text-gray-800">
            Ecommerce
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-gray-600 hover:text-gray-800">
              Products
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-gray-800">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>
            <Link to="/orders" className="text-gray-600 hover:text-gray-800">
              Orders
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-gray-800">
              Login
            </Link>
            <Link to="/register" className="text-gray-600 hover:text-gray-800">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;