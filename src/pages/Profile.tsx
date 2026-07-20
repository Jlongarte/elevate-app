import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';
import Button from '../components/Common/Button';
import { Skeleton } from 'boneyard-js/react';
import '../styles/Profile.css';

const Profile: React.FC = () => {
  const { user, orders, isLoading, error } = useProfile();

  if (!user) {
    return <Navigate to="/login?redirect=/profile" replace />;
  }

  return (
    <Skeleton name="profile-orders-bone" loading={isLoading}>
    <div className="profile-page-container">
      <header className="profile-page-header">
        <h1>MY PROFILE</h1>
        <p>Manage your account settings and track your orders.</p>
      </header>

      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="profile-info-card">
            <div className="profile-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <h2>{user.name.toUpperCase()}</h2>
            <p className="profile-email">{user.email}</p>

            <hr className="profile-divider" />

            <div className="profile-meta-item">
              <span className="meta-label">ACCOUNT TYPE:</span>
              <span className="meta-value badge-role">
                {user.isAdmin ? 'ADMINISTRATOR' : 'PREMIUM CUSTOMER'}
              </span>
            </div>

            {user.isAdmin && (
              <Link to="/admin" className="admin-dashboard-btn-link">
                <Button
                  variant="outline"
                  style={{ width: '100%', marginTop: '20px' }}
                >
                  GO TO ADMIN PANEL
                </Button>
              </Link>
            )}
          </div>
        </aside>

        <main className="profile-orders-section">
          <h2>ORDER HISTORY ({orders.length})</h2>

          {isLoading ? (
            <div className="profile-orders-loading">
              <div className="orders-spinner"></div>
              <p>RETRIEVING YOUR ORDERS...</p>
            </div>
          ) : error ? (
            <div className="profile-orders-error">
              <p>COULD NOT LOAD YOUR ORDERS: {error.toUpperCase()}</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="profile-orders-empty">
              <p>YOU HAVEN'T PLACED ANY ORDERS YET.</p>

              <Link to="/catalog">
                <Button variant="primary">
                  START SHOPPING
                </Button>
              </Link>
            </div>
          ) : (
            <div className="orders-list-wrapper">
              {orders.map((order) => {
                const orderDate = new Date(order.createdAt).toLocaleDateString(
                  'es-ES',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                );

                return (
                  <div key={order._id} className="order-item-card">

                    <div className="order-card-header">
                      <div>
                        <span className="order-meta-title">ORDER ID</span>
                        <span className="order-meta-value font-mono">
                          #{order._id.slice(-8).toUpperCase()}
                        </span>
                      </div>

                      <div>
                        <span className="order-meta-title">DATE PLACED</span>
                        <span className="order-meta-value">
                          {orderDate}
                        </span>
                      </div>

                      <div>
                        <span className="order-meta-title">
                          TOTAL AMOUNT
                        </span>
                        <span className="order-meta-value highlight-price">
                          € {order.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="order-statuses-row">
                      <div
                        className={`status-badge ${
                          order.isPaid ? 'paid' : 'pending'
                        }`}
                      >
                        <span className="status-dot"></span>

                        {order.isPaid
                          ? 'PAID TRANSACTION'
                          : 'PAYMENT PENDING'}
                      </div>

                      <div
                        className={`status-badge ${
                          order.isDelivered
                            ? 'delivered'
                            : 'processing'
                        }`}
                      >
                        <span className="status-dot"></span>

                        {order.isDelivered
                          ? 'DELIVERED'
                          : 'PROCESSING SHIPMENT'}
                      </div>
                    </div>

                    <div className="order-items-grid">
                      {order.orderItems.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="order-item-row"
                        >
                          <div className="order-item-img-box">
                            <img
                              src={
                                item.product?.images?.[0] ||
                                'https://placehold.co/150x150'
                              }
                              alt={item.name}
                              onError={(e) => {
                                (
                                  e.target as HTMLImageElement
                                ).src =
                                  'https://placehold.co/150x150';
                              }}
                            />
                          </div>

                          <div className="order-item-details">
                            <h3>{item.name.toUpperCase()}</h3>

                            <p className="order-item-quantity">
                              QTY: {item.quantity}
                            </p>
                          </div>

                          <span className="order-item-price">
                            €
                            {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="order-shipping-summary">
                      <strong>SHIPPING ADDRESS:</strong>{' '}
                      {order.shippingAddress.street},{' '}
                      {order.shippingAddress.province},{' '}
                      {order.shippingAddress.zipCode},{' '}
                      {order.shippingAddress.country.toUpperCase()}
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
    </Skeleton>
  );
};

export default Profile;