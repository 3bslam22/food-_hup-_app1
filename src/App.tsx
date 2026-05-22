import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import Layout from './components/Layout';
import Login from './pages/Login';
import StudentDashboard from './pages/student/Dashboard';
import RestaurantMenu from './pages/student/RestaurantMenu';
import Cart from './pages/student/Cart';
import MapLocation from './pages/student/MapLocation';
import MyOrders from './pages/student/MyOrders';
import Favorites from './pages/student/Favorites';
import Wallet from './pages/student/Wallet';
import Account from './pages/student/Account';
import Settings from './pages/Settings';
import Privacy from './pages/Privacy';
import AdminDashboard from './pages/AdminDashboard';
import OwnerDashboard from './pages/owner/Dashboard';
import DeliveryDashboard from './pages/delivery/Dashboard';
import ManageMenu from './pages/owner/ManageMenu';
import DeliveryTransactions from './pages/delivery/Transactions';
import OrderDetails from './pages/OrderDetails';
import Notifications from './pages/Notifications';
import SplashScreen from './components/SplashScreen';
import { AnimatePresence } from 'motion/react';
import './i18n';

export default function App() {
  const user = useStore(state => state.user);
  const [showSplash, setShowSplash] = useState(true);

  return (
    <BrowserRouter>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      
      {!showSplash && (
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" /> : <Layout><Login /></Layout>} 
          />
          
          <Route 
            path="/" 
            element={
              !user ? <Navigate to="/login" /> : 
              <Layout>
                {user.role === 'student' ? <StudentDashboard /> : 
                 user.role === 'delivery' ? <DeliveryDashboard /> : 
                 <OwnerDashboard />}
              </Layout>
            } 
          />

          <Route 
            path="/restaurant/:id" 
            element={
              !user || user.role !== 'student' ? <Navigate to="/" /> : 
              <Layout><RestaurantMenu /></Layout>
            } 
          />

          <Route 
            path="/cart" 
            element={
              !user || user.role !== 'student' ? <Navigate to="/" /> : 
              <Layout><Cart /></Layout>
            } 
          />

          <Route 
            path="/map" 
            element={
              !user || user.role !== 'student' ? <Navigate to="/" /> : 
              <Layout><MapLocation /></Layout>
            } 
          />

          <Route 
            path="/orders" 
            element={
              !user || user.role !== 'student' ? <Navigate to="/" /> : 
              <Layout><MyOrders /></Layout>
            } 
          />

          <Route 
            path="/orders/:orderId" 
            element={
              !user ? <Navigate to="/" /> : 
              <Layout><OrderDetails /></Layout>
            } 
          />

          <Route 
            path="/favorites" 
            element={
              !user || user.role !== 'student' ? <Navigate to="/" /> : 
              <Layout><Favorites /></Layout>
            } 
          />

          <Route 
            path="/wallet" 
            element={
              !user || user.role !== 'student' ? <Navigate to="/" /> : 
              <Layout><Wallet /></Layout>
            } 
          />

          <Route 
            path="/account" 
            element={
              !user || user.role !== 'student' ? <Navigate to="/" /> : 
              <Layout><Account /></Layout>
            } 
          />

          <Route 
            path="/delivery-transactions" 
            element={
              !user || user.role !== 'delivery' ? <Navigate to="/" /> : 
              <Layout><DeliveryTransactions /></Layout>
            } 
          />

          <Route 
            path="/notifications" 
            element={
              !user ? <Navigate to="/" /> : 
              <Layout><Notifications /></Layout>
            } 
          />

          <Route 
            path="/settings" 
            element={
              !user ? <Navigate to="/" /> : 
              <Layout><Settings /></Layout>
            } 
          />

          <Route 
            path="/privacy" 
            element={<Privacy />} 
          />

          <Route 
            path="/admin" 
            element={
              (user?.email === 'ahmedelsalam3000@gmail.com' || user?.email === 'elbeltagyesmail19@gmail.com') ? 
              <Layout><AdminDashboard /></Layout> : 
              <Navigate to="/" />
            } 
          />

          <Route 
            path="/menu" 
            element={
              !user || user.role !== 'owner' ? <Navigate to="/" /> : 
              <Layout><ManageMenu /></Layout>
            } 
          />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}


