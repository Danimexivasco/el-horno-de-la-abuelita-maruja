import { useEffect, useState } from "react";

export function WithIsClientCheck<P extends object>(WrappedChildren: React.ComponentType<P>) {

  return function ComponentWithIsClientCheck(props: P) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    return isClient ? (
      <WrappedChildren
        {...props}
      />) : null;
  };
}