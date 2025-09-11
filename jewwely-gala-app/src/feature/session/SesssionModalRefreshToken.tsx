import { Button, Modal } from "react-bootstrap";
import AuthClientStore from "../../contexts/AuthClientStore";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const SesssionModalRefreshToken = ({ ...props}) => {
    const cookies = useContext(AuthContext);

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>
          Session caducada {AuthClientStore.getDateExpireIn()?.toISOString()}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, tu session ha caducado!</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={cookies?.refreshSession}>
          Renovar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SesssionModalRefreshToken;
