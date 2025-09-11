import { useEffect, useState } from "react";

type IPaymentTermsSelector = {
  onChangeTerms: (terms: string) => void;
  onChangeConditions: (conditions: string) => void;
  paymentTerms: string;
  paymentConditions: string;
};

const PaymentTermsSelector = ({
  onChangeTerms,
  onChangeConditions,
  paymentTerms,
  paymentConditions,
}: IPaymentTermsSelector) => {
  const [terms, setTerms] = useState<string>("");
  const [conditions, setConditions] = useState<string>("");

  const _setLocalTemrs = (_terms: string) => {
    if (_terms === "PUE") {
      setTerms(_terms);
      setConditions("");
      onChangeTerms(_terms);
      onChangeConditions("");
    } else if (_terms === "PPD") {
      setTerms(_terms);
      onChangeTerms(_terms);
    } else {
      setTerms("");
      onChangeConditions("");
    }
  };

  const _setLocalConditions = (_conditions: string) => {
    setConditions(_conditions);
    onChangeConditions(_conditions);
  };

  useEffect(() => {
    setTerms(paymentTerms ?? "");
    setConditions(paymentConditions ?? "");
  }, [paymentTerms, paymentConditions]);

  return (
    <ol className="mb-3 px-4 mt-3">
      <li className="">
        <div className="feed-item-list">
          <div>
            <h5 className="font-size-16 mb-1">Terminos de pago</h5>
            <p className="text-muted text-truncate mb-4">
              Selecciona el termino de pago para esta orden de compra
            </p>
            <div className="mb-3">
              <div className="row">
                <div className="col-lg-5 col-sm-6">
                  <div>
                    <label className="card-radio-label mb-1">
                      <input
                        type="radio"
                        name="address"
                        id="info-address1"
                        className="card-radio-input"
                        value="PUE"
                        onChange={(e) => _setLocalTemrs(e.target.value)}
                        checked={terms === "PUE"}
                      />
                      <div className="card-radio text-truncate p-3">
                        <span className="fs-14 d-block">Pago unico(PUE)</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="col-lg-5 col-sm-6">
                  <div>
                    <label className="card-radio-label mb-1">
                      <input
                        type="radio"
                        name="address"
                        id="info-address2"
                        className="card-radio-input"
                        value="PPD"
                        onChange={(e) => _setLocalTemrs(e.target.value)}
                        checked={terms === "PPD"}
                      />
                      <div className="card-radio text-truncate p-3">
                        <span className="fs-14 d-block">
                          Pago en parcialidades(PPD)
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      {terms === "PPD" ? (
        <li className="">
          <div className="feed-item-list">
            <div>
              <h5 className="font-size-16 mb-1">Condiciones de pago</h5>
              <p className="text-muted text-truncate mb-4">
                Selecciona la condicion de pago para esta orden de compra
              </p>
            </div>
            <div>
              <div className="row">
                <div className="col-lg-3 col-sm-6 mb-1">
                  <div data-bs-toggle="collapse">
                    <label className="card-radio-label">
                      <input
                        type="radio"
                        name="pay-method"
                        id="pay-methodoption1"
                        className="card-radio-input"
                        value="NET00"
                        onChange={(e) => _setLocalConditions(e.target.value)}
                        checked={conditions === "NET00"}
                      />
                      <span className="card-radio py-3 text-center text-truncate">
                        NET00
                      </span>
                    </label>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6 mb-1">
                  <div>
                    <label className="card-radio-label">
                      <input
                        type="radio"
                        name="pay-method"
                        id="pay-methodoption2"
                        className="card-radio-input"
                        value="NET15"
                        onChange={(e) => _setLocalConditions(e.target.value)}
                        checked={conditions === "NET15"}
                      />
                      <span className="card-radio py-3 text-center text-truncate">
                        NET15
                      </span>
                    </label>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6 mb-1">
                  <div>
                    <label className="card-radio-label">
                      <input
                        type="radio"
                        name="pay-method"
                        id="pay-methodoption3"
                        className="card-radio-input"
                        value="NET30"
                        onChange={(e) => _setLocalConditions(e.target.value)}
                        checked={conditions === "NET30"}
                      />

                      <span className="card-radio py-3 text-center text-truncate">
                        <span>NET30</span>
                      </span>
                    </label>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6 mb-1">
                  <div>
                    <label className="card-radio-label">
                      <input
                        type="radio"
                        name="pay-method"
                        id="pay-methodoption3"
                        className="card-radio-input"
                        value="NET60"
                        onChange={(e) => _setLocalConditions(e.target.value)}
                        checked={conditions === "NET60"}
                      />

                      <span className="card-radio py-3 text-center text-truncate">
                        <span>NET60</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      ) : (
        ""
      )}
    </ol>
  );
};

export default PaymentTermsSelector;
