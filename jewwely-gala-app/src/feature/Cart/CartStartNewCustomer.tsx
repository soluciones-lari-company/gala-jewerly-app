import { useContext, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { CreateCustomerCommand, CustomerClient } from "../../api/client/GalaJewerlyClient";
import { AuthContext } from "../../contexts/AuthContext";

const CartStartNewCustomer = () => {

    const authContext = useContext(AuthContext)

    const [customerName, SetCustomerName] = useState<string>("")
    const [customerPhone, SetCustomerPhone] = useState<string>("")
    const [customerEmail, SetCustomerEmail] = useState<string>("")

    const NextStepCart = () =>{
        const client = new CustomerClient(undefined, authContext?.instance)
    
        const command = {
           name : customerName,
           phoneNumber : customerPhone,
           email : customerEmail,
           discount :  0
        } as CreateCustomerCommand
        client.create(command).then((result) => {
            alert(result)
        }).catch((error) => {
            console.error(error)
        })
    }

  return (
    <>
      <div className="row gutter-1 align-items-end">
        <div className="col-md-6">
          <h3>Crear nuevo carrito</h3>
        </div>
      </div>
      <div className="row gutter-1">
        <div className="col-lg-7 col-md-12">
          <div className="bg-white p-2 p-lg-3 mb-1">
          <div className="row gutter-1 align-items-center">
              <div className="col-md-6">
                <h2 className="text-uppercase fs-20">Datos del nuevo cliente</h2>
              </div>
            </div>
            <fieldset className="mb-2">
              <div className="row">
                <div className="col-12">
                  <FloatingLabel controlId="floatingInput" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Escribe aqui..."
                      value={customerName}
                      onChange={(e) => SetCustomerName(e.currentTarget.value)}
                    />
                  </FloatingLabel>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <FloatingLabel controlId="floatingInput" label="Telefono">
                    <Form.Control
                      type="text"
                      placeholder="Escribe aqui..."
                      value={customerPhone}
                      onChange={(e) =>
                        SetCustomerPhone(e.currentTarget.value)
                      }
                    />
                  </FloatingLabel>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <FloatingLabel controlId="floatingInput" label="Correo">
                    <Form.Control
                      type="text"
                      placeholder="Escribe aqui..."
                      value={customerEmail}
                      onChange={(e) => SetCustomerEmail(e.currentTarget.value)}
                    />
                  </FloatingLabel>
                </div>
              </div>
            </fieldset>
            
          </div>

          <div className="bg-white p-2 p-md-3">
            <button
              className="btn btn-lg btn-primary btn-block mb-2"
              onClick={NextStepCart}
            >
              Continuar
            </button>
            <small className="text-muted"></small>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartStartNewCustomer;
