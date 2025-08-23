import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Product } from '../../types';
import { Button } from '../ui/Button';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    
    await addToCart(product);
  };

  const categoryColors = {
    live_animal: 'bg-green-100 text-green-800',
    cut_meat: 'bg-red-100 text-red-800',
  };

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
      >
        {/* Image */}
        <div className="relative overflow-hidden h-48">
          <img
            src={product.images[0] || 'https://images.pexels.com/photos/422220/pexels-photo-422220.jpeg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[product.category]}`}>
              {product.category === 'live_animal' ? 'Live Animal' : 'Cut Meat'}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
              <Heart className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          {!product.is_available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {product.name}
            </h3>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-600">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-sm text-gray-400">({product.review_count})</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <div className="text-2xl font-bold text-green-600">
              ${product.price.toFixed(2)}
              {product.weight && (
                <span className="text-sm font-normal text-gray-500">
                  /{product.weight_unit}
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500">
              Stock: {product.stock_quantity}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.breed && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {product.breed}
              </span>
            )}
            {product.age_months && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {product.age_months} months
              </span>
            )}
            {product.weight && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {product.weight} {product.weight_unit}
              </span>
            )}
          </div>

          {/* Seller Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {product.seller.full_name}
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {product.seller.role.replace('_', ' ')}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button
              size="sm"
              className="flex-1"
              disabled={!product.is_available}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};