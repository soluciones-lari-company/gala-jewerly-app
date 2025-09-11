import { createContext, useContext, useEffect, useState } from "react";
import { GenProps } from "../../utilities/GenProps";
import {
  SalesOrderClient,
  SalesOrderDTO,
} from "../../../api/client/GalaJewerlyClient";
import { useGalaAuth } from "../authentication/AuthGalaProvider";
import { useParams } from "react-router-dom";

type ICartProvider = {
  cartIdSelected: string;
  selectCart: (cartId: string) => void;
  cart: SalesOrderDTO | undefined;
  getOrderDetails: ()=> void
  enableDiscountControl: boolean
  handleEnableDiscountControl : (state: boolean) => void
};

const CartContext = createContext<ICartProvider | null>(null);

const CartProvider = ({ children }: GenProps) => {
  // query params from url
  const { idOrder } = useParams();

  const user = useGalaAuth();

  const [cartIdSelected, setCartIdSelected] = useState<string>("");
  const [cart, setCart] = useState<SalesOrderDTO | undefined>(undefined);
  const [enableDiscountControl, setEnableDiscountControl] = useState<boolean>(false)

  const handleEnableDiscountControl = (state: boolean) => setEnableDiscountControl(state)

  const selectCart = (cartId: string) => {
    if (cartId === "") throw new Error("cart invalid");

    setCartIdSelected(cartId);
    getOrderDetails()
  };

  // functions
  const getOrderDetails = () => {
    const client = new SalesOrderClient(undefined, user?.instance);
    client.getSalesOrderById(idOrder ?? "").then((result) => {
        setCart(result);
    });
  };

  useEffect(() => {
    console.log("CheckoutContext loaded for: " + idOrder);
    if (idOrder !== null && idOrder != undefined && idOrder !== "") {
      getOrderDetails();
      setCartIdSelected(idOrder)
    }
  }, [idOrder]);

  return (
    <CartContext.Provider
      value={{
        cartIdSelected,
        selectCart,
        cart,
        getOrderDetails,
        enableDiscountControl,
        handleEnableDiscountControl
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useGalaCart = () => {
  return useContext(CartContext);
};
