import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Beef, 
  Fish, 
  Users, 
  Star, 
  ArrowRight, 
  Shield, 
  Truck, 
  Clock,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/products/ProductCard';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

export const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeSellers: 0,
    happyCustomers: 0,
    avgRating: 0,
  });

  useEffect(() => {
    fetchFeaturedProducts();
    fetchStats();
  }, []);

  const fetchFeaturedProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        seller:users(*)
      `)
      .eq('is_available', true)
      .order('rating', { ascending: false })
      .limit(6);

    if (data && !error) {
      setFeaturedProducts(data);
    }
  };

  const fetchStats = async () => {
    // Fetch real stats from database
    const [productsResult, sellersResult, ordersResult] = await Promise.all([
      supabase.from('products').select('id', { count: 'exact' }),
      supabase.from('users').select('id', { count: 'exact' }).in('role', ['farmer', 'meat_seller']),
      supabase.from('orders').select('id', { count: 'exact' })
    ]);

    setStats({
      totalProducts: productsResult.count || 0,
      activeSellers: sellersResult.count || 0,
      happyCustomers: ordersResult.count || 0,
      avgRating: 4.8, // This would be calculated from reviews
    });
  };

  const categories = [
    {
      title: 'Live Animals',
      description: 'Fresh livestock from trusted farmers',
      icon: Users,
      image: 'https://images.pexels.com/photos/422220/pexels-photo-422220.jpeg',
      link: '/live-animals',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Cut Meat',
      description: 'Premium quality cuts from local butchers',
      icon: Beef,
      image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg',
      link: '/cut-meat',
      color: 'from-red-500 to-red-600',
    },
    {
      title: 'Fresh Fish',
      description: 'Daily catch from coastal suppliers',
      icon: Fish,
      image: 'https://images.pexels.com/photos/1737844/pexels-photo-1737844.jpeg',
      link: '/fish',
      color: 'from-blue-500 to-blue-600',
    },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'All products are verified for quality and freshness',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and safe delivery to your doorstep',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-gray-900 mb-6"
            >
              Fresh Livestock & Premium Meat
              <span className="text-green-600"> Marketplace</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-8"
            >
              Connect with trusted farmers and butchers. Get the freshest livestock and 
              premium cut meat delivered to your door.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/live-animals">
                <Button size="lg" className="w-full sm:w-auto">
                  Shop Live Animals
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/cut-meat">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Browse Cut Meat
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover fresh products from local farmers and trusted meat sellers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Link to={category.link}>
                    <div className="relative overflow-hidden rounded-2xl shadow-lg">
                      <div className="aspect-w-16 aspect-h-9 h-64">
                        <img
                          src={category.image}
                          alt={category.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`}></div>
                      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                        <IconComponent className="h-8 w-8 mb-3" />
                        <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                        <p className="text-white/90 mb-4">{category.description}</p>
                        <div className="flex items-center text-white group-hover:translate-x-2 transition-transform">
                          <span className="font-semibold">Shop Now</span>
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600">
                Top-rated products from our trusted sellers
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/products">
                <Button variant="outline" size="lg">
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">{stats.totalProducts}+</div>
              <div className="text-green-100">Products Available</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl font-bold mb-2">{stats.activeSellers}+</div>
              <div className="text-green-100">Active Sellers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl font-bold mb-2">{stats.happyCustomers}+</div>
              <div className="text-green-100">Happy Customers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-center text-4xl font-bold mb-2">
                <Star className="h-8 w-8 mr-2 fill-current" />
                {stats.avgRating}
              </div>
              <div className="text-green-100">Average Rating</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose LiveStock Market?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of customers who trust us for their livestock and meat needs. 
            Browse our marketplace and discover quality products from verified sellers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary">
                Create Account
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};