import React from 'react';

interface CheckoutShippingProps {
  onNext: () => void;
}

const CheckoutShipping: React.FC<CheckoutShippingProps> = ({ onNext }) => {
  return (
    <div>
      <h2>Shipping Address</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
      >
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input type="text" className="form-control" id="address" required />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input type="text" className="form-control" id="city" required />
        </div>
        <div className="mb-3">
          <label htmlFor="postalCode" className="form-label">
            Postal Code
          </label>
          <input type="text" className="form-control" id="postalCode" required />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <input type="text" className="form-control" id="country" required />
        </div>
        <button type="submit" className="btn btn-primary">
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default CheckoutShipping;
