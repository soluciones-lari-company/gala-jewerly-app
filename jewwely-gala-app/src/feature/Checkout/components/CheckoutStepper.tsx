import React from 'react';
import './CheckoutStepper.css';

interface CheckoutStepperProps {
  currentStep: number;
}

const steps = ['Shipping', 'Payment', 'Confirm'];

const CheckoutStepper: React.FC<CheckoutStepperProps> = ({ currentStep }) => {
  return (
    <div className="stepper-wrapper">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`stepper-item ${index + 1 === currentStep ? 'active' : ''} ${
            index + 1 < currentStep ? 'completed' : ''
          }`}
        >
          <div className="step-counter">{index + 1}</div>
          <div className="step-name">{step}</div>
        </div>
      ))}
    </div>
  );
};

export default CheckoutStepper;
