import OrderItem from "../OrderItem/OrderItem";

const OrderList = ({ orders, onEditOrder, onDeleteOrder }) => {
  return (
    <div>
      {orders.map((order) => {
        return (
          <OrderItem
            key={order._id}
            order={order}
            onEdit={onEditOrder}
            onDelete={onDeleteOrder}
          />
        );
      })}
    </div>
  );
};

export default OrderList;
