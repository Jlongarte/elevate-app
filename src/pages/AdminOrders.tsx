import React from 'react';
import { Link } from 'react-router-dom';
import { useAdminOrders } from '../hooks/useAdminOrders';
import '../styles/AdminOrders.css';

const AdminOrders: React.FC = () => {
  const { orders, isLoading, error } = useAdminOrders();

  return (
    <div className="admin-orders-container">
      <header className="admin-orders-header">
        <h1>ORDER MANAGEMENT</h1>
        <p>Overview of all incoming and past orders.</p>
      </header>

      {isLoading && <div className="admin-status-msg">LOADING ORDERS...</div>}
      {error && <div className="admin-status-msg error">{error}</div>}

      {!isLoading && !error && (
        <div className="table-responsive">
          <table className="admin-orders-table">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>DATE</th>
                <th>CUSTOMER</th>
                <th>TOTAL</th>
                <th>PAYMENT</th>
                <th>DELIVERY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="no-orders-msg">NO ORDERS FOUND.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td className="fw-bold">{order._id.substring(0, 8)}...</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{order.user ? order.user.name : 'Deleted User'}</td>
                    <td className="fw-bold">${order.totalPrice.toFixed(2)}</td>
                    
                    <td>
                      {order.isPaid ? (
                        <span className="status-badge success">PAID</span>
                      ) : (
                        <span className="status-badge pending">PENDING</span>
                      )}
                    </td>

                    <td>
                      {order.isDelivered ? (
                        <span className="status-badge success">DELIVERED</span>
                      ) : (
                        <span className="status-badge pending">NOT SENT</span>
                      )}
                    </td>

                    <td>
                      
                      <Link to={`/admin/order/${order._id}`} className="admin-action-btn">
                        DETAILS
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;