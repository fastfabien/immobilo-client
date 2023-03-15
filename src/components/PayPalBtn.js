import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import authHeader from "../services/auth-header";
import { useDispatch, useSelector } from "react-redux";
import { refreshUserInformation } from "../actions/auth";

const PayPalBtn = ({ price }) => {
  const { user: currentUser, isLoggedIn, wallet } = useSelector((state) => state.auth);
  const [orderId, setOrderId] = useState();
  const dispatch = useDispatch()

  useEffect(() => { }, [orderId]);

  return (
    <PayPalButtons
      forceReRender={[price]}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: price,
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then((details) => {
          const amount = details.purchase_units[0].amount
          console.log(details)
          axios.post('/api/update-user-amount-paypal', amount, { headers: authHeader() }).then((data) => {
            dispatch(refreshUserInformation())
          }).catch((err) => {
            console.log(err)
          })
        });
      }}
    />
  );
};

export default PayPalBtn;
