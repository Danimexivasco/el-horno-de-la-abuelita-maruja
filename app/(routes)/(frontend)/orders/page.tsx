import Headline from "@/app/_components/headline";

import Container from "@/app/_components/container";
import { WithOrders } from "./WithOrders";

// TODO: Change the type to the correct one
type OrdersPageProps = { orders: any[] };

function OrdersPage({ orders }: OrdersPageProps) {
  console.log("orders", orders);

  return (
    <Container>
      <Headline>Mis pedidos</Headline>
      {orders ?
        orders?.map(order => {
          return (
            <div key={order.id}>
              <p>OrderId: {order.id}</p>
              <p>Value: {order.value}</p>
            </div>
          );
        })
        : null
      }
    </Container>
  );
}

export default WithOrders(OrdersPage);