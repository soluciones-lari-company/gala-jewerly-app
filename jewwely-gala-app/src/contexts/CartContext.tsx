import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import CartOffCanvas from "../feature/Cart/CartOffCanvas";
import {
  AddLineToSalesOrderCommand,
  CreateSalesOrderCommand,
  SalesOrderClient,
  SalesOrderDTO,
} from "../api/client/GalaJewerlyClient";
import { UserContext } from "./UserContext";
import { UserAuthStorage } from "./UserAuthStorage";
import { useLocation } from "react-router-dom";

type Props = {
  children?: ReactNode;
};

type ICartsContext = {
  handeShowCart: (display: boolean) => void;
  carts: SalesOrderDTO[];
  addNewCart: (command: CreateSalesOrderCommand) => void;
  addLineToCart: (itemSerieId: string, quantity: number) => void;
  cartSelected: string;
  HandleCartSelected: (cartId: string) => void;
};

const CartsContext = createContext<ICartsContext | null>(null);

const CartsProvider = ({ children }: Props) => {
  const userContext = useContext(UserContext);
  const location = useLocation();

  const [carts, setCarts] = useState<SalesOrderDTO[]>([]);
  const [cartSelected, setCartSelected] = useState<string>("");
  const [showCart, setShowCart] = useState(false);

  const handeShowCart = (display: boolean) => setShowCart(display);
  const addNewCart = (command: CreateSalesOrderCommand) => {};
  const HandleCartSelected = (cartId: string) => {
    setCartSelected(cartId);
    localStorage.setItem("cartIdSelected", cartId);
  };

  const loadCarts = () => {
    const client = new SalesOrderClient(undefined, userContext?.instance);

    client
      .getSalesOrdersOpen()
      .then((result) => {
        setCarts(result);
      })
      .catch(() => {});
  };

  const addLineToCart = (itemSerieId: string, quantity: number) => {
    const client = new SalesOrderClient(undefined, userContext?.instance);

    const command = {
      salesOrderId: cartSelected,
      numLine: 0,
      itemSerieId: itemSerieId,
      quantity: quantity,
      serieCode: ""
    } as AddLineToSalesOrderCommand;
    client
      .addLineToSalesOrder(cartSelected, command)
      .then((result) => {
        handeShowCart(true);
      })
      .catch((error) => console.log(error));
  };

  const value = useMemo(
    () => ({
      handeShowCart,
      carts,
      addNewCart,
      addLineToCart,
      cartSelected,
      HandleCartSelected,
    }),
    [carts, cartSelected]
  );

  useEffect(() => {
    if (UserAuthStorage.info().isAuthenticated()) {
      loadCarts();
    }

    const cartIdselected = localStorage.getItem("cartIdSelected");
    if (
      cartIdselected != undefined &&
      cartIdselected != null &&
      cartIdselected !== ""
    ) {
      setCartSelected(cartIdselected);
    }
  }, []);

  return (
    <CartsContext.Provider value={value}>
      {location.pathname.includes("view-cart") === false ? (
        <CartOffCanvas
          show={showCart}
          onHide={() => {
            handeShowCart(false);
          }}
        ></CartOffCanvas>
      ) : (
        ""
      )}

      {children}
    </CartsContext.Provider>
  );
};

export { CartsContext, CartsProvider };
