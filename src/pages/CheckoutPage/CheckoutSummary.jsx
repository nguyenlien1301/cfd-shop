import Button from "@/components/Button";
import React from "react";

const CheckoutSummary = () => {
  return (
    <aside className="col-lg-3">
      <div className="summary">
        <h3 className="summary-title">Your Order</h3>
        <table className="table table-summary">
          <thead>
            <tr>
              <th>Product</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href="#">Beige knitted elastic runner shoes</a>
              </td>
              <td>$84.00</td>
            </tr>
            <tr>
              <td>
                <a href="#">Blue utility pinafore denimdress</a>
              </td>
              <td>$76,00</td>
            </tr>
            <tr className="summary-subtotal">
              <td>Subtotal:</td>
              <td>$160.00</td>
            </tr>
            <tr>
              <td>Shipping:</td>
              <td>Free shipping</td>
            </tr>
            <tr className="summary-total">
              <td>Total:</td>
              <td>$160.00</td>
            </tr>
          </tbody>
        </table>
        <div className="accordion-summary" id="accordion-payment">
          <div className="card">
            <div className="card-header" id="heading-1">
              <h2 className="card-title">
                <a
                  role="button"
                  data-toggle="collapse"
                  href="#collapse-1"
                  aria-expanded="true"
                  aria-controls="collapse-1"
                >
                  {" "}
                  Direct bank transfer{" "}
                </a>
              </h2>
            </div>
            <div
              id="collapse-1"
              className="collapse show"
              aria-labelledby="heading-1"
              data-parent="#accordion-payment"
            >
              <div className="card-body">
                {" "}
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.{" "}
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="heading-3">
              <h2 className="card-title">
                <a
                  className="collapsed"
                  role="button"
                  data-toggle="collapse"
                  href="#collapse-3"
                  aria-expanded="false"
                  aria-controls="collapse-3"
                >
                  {" "}
                  Cash on delivery{" "}
                </a>
              </h2>
            </div>
            <div
              id="collapse-3"
              className="collapse"
              aria-labelledby="heading-3"
              data-parent="#accordion-payment"
            >
              <div className="card-body">
                Quisque volutpat mattis eros. Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit. Donec odio. Quisque volutpat
                mattis eros.{" "}
              </div>
            </div>
          </div>
        </div>
        <Button type="submit" variant="outline" className="btn-order btn-block">
          <span className="btn-text">Place Order</span>
          <span className="btn-hover-text">Proceed to Checkout</span>
        </Button>
      </div>
    </aside>
  );
};

export default CheckoutSummary;
