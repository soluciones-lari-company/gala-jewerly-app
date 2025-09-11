import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartsContext } from "../../contexts/CartContext";
import { useParams } from "react-router-dom";
import {
  SalesOrderClient,
  SalesOrderDTO,
} from "../../api/client/GalaJewerlyClient";
import { UserContext } from "../../contexts/UserContext";

type Props = {
  children?: ReactNode;
};

type ICheckoutContext = {
  getOrderDetails: () => void;
  orderDetails: SalesOrderDTO | null;
};

const CheckoutContext = createContext<ICheckoutContext | null>(null);

const CheckoutProvider = ({ children }: Props) => {
  // contexts
  const userContext = useContext(UserContext);
  const cartsContext = useContext(CartsContext);
  // query params from url
  const { idOrder } = useParams();

  //context variables
  const [orderDetails, setOrderDetails] = useState<SalesOrderDTO | null>(null);

  // functions
  const getOrderDetails = () => {
    const client = new SalesOrderClient(undefined, userContext?.instance);
    client
      .getSalesOrderById(idOrder ?? "")
      .then((result) => {
        setOrderDetails(result);
      });
  };

  const value = useMemo(
    () => ({
      getOrderDetails,
      orderDetails,
    }),
    [orderDetails]
  );

  useEffect(() => {
    console.log("CheckoutContext loaded for: " + idOrder);
    if (idOrder !== null && idOrder != undefined && idOrder !== "") {
      getOrderDetails();
    }
    cartsContext?.handeShowCart(false);
  }, [idOrder]);

  return (
    <>
      <CheckoutContext.Provider value={value}>
        {children}
      </CheckoutContext.Provider>
    </>
  );
};

export { CheckoutContext, CheckoutProvider };
