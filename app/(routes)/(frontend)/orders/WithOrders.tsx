// TODO: Change the mockOrders for real ones
async function getOrders() {
  return [
    {
      id:    1,
      value: "asdasd"
    },
    {
      id:    2,
      value: "asdasd"
    }
  ];
}

// TODO: Change the type to the correct one
type WithOrdersProps = {
  orders: any[]
};

export function WithOrders<P extends WithOrdersProps>(WrappedChildren: React.ComponentType<P>) {

  return async function ComponentWithOrders(props: Omit<P, keyof WithOrdersProps>) {
    const mockOrders = await getOrders();

    return (
      <WrappedChildren
        {...(props as P)}
        orders={mockOrders}
      />);
  };
}