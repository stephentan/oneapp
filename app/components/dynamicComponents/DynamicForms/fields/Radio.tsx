import { useState } from "react";

export default function Radio() {
  const [deliveryMethod, setDeliveryMethod] = useState(1);

  return (
    <div className="border border-gray-200 rounded-sm">
      <input type="hidden" name="deliveryMethod" value={deliveryMethod} />
      <div className="flex justify-between items-center px-4">
        <div className="h-14 gap-2 flex items-center">
          <input
            name="deliveryMethodField"
            type="radio"
            className="outline-none focus:outline-none focus:ring-0 focus:border-blue-500"
            onClick={() => {
              setDeliveryMethod(1);
            }}
          />{" "}
          Delivery Within Metro Manila
        </div>
        <div>P 10.00</div>
      </div>
      <div className="h-14 px-4 gap-2 flex items-center border-t">
        <input
          name="deliveryMethodField"
          type="radio"
          className="outline-none focus:outline-none focus:ring-0 focus:border-blue-500"
          onClick={() => {
            setDeliveryMethod(2);
          }}
        />{" "}
        Delivery Outside Metro Manila
      </div>
      <div className="h-14 px-4 gap-2 flex items-center border-t">
        <input
          name="deliveryMethodField"
          type="radio"
          className="outline-none focus:outline-none focus:ring-0 focus:border-blue-500"
          onClick={() => {
            setDeliveryMethod(3);
          }}
        />{" "}
        Pick up
      </div>
    </div>
  );
}
