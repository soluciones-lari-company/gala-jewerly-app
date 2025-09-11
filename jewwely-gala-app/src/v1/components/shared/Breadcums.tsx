import { Breadcrumb } from "react-bootstrap";
import { GenProps } from "../../utilities/GenProps";

const Breadcums = ({ children }: GenProps) => {
  return (
    <Breadcrumb className="position-relative pt-3 mt-3 mt-md-4 mb-4">
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default Breadcums;
