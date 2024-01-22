import React, { useEffect, useRef, useState } from "react";
// import QRCode from "qrcode.react";
import {QRCodeCanvas} from 'qrcode.react';

import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { fade, pageAnimation, scrollAnim } from "../animation";
import { motion } from "framer-motion";

const Invoice = () => {
    const qrCodeRef = useRef(null);
    const { id } = useParams();
    // console.log(id);
  
    const [invoice, setInvoice] = useState({});
    const [loading, setLoading] = useState(false);
    const [paid, setPaid] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/reservations/${id}?includeUsers=true&&includeMovies=true`
          );
  
          if (response?.data) {
            setInvoice(response.data);
            setLoading(true);
            // console.log(invoice.data);
  
            if (invoice?.data) {
              const isPaid = invoice?.data?.paid ;
              setPaid(isPaid);
            }
          }
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };
  
      fetchData();
    }, [id, loading]);

  
    // useEffect(() => {
    //   // This useEffect is triggered when 'paid' changes
    //   const code = invoice?.data?.stripeId;
    //     console.log(paid)
    //   if (loading && qrCodeRef.current) {
    //     // console.log("jkfdl")
    //     qrCodeRef.current.clear();
    //     qrCodeRef.current.makeCode(code);
    //   }
    // }, [loading, paid, invoice]);
  console.log(invoice)
    return (
      <>
        {paid && (
          <InvoiceStyle
            variants={pageAnimation}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.h1 variants={fade}>
              Invoice for reservation {invoice.data.movies.name}
            </motion.h1>
  
            <motion.div variants={scrollAnim} className="ticket">
              <div className="leftDecoration decoration"></div>
              <div className="topDecoration decoration"></div>
              <div className="bottomDecoration decoration"></div>
  
              {loading && (
                <div className="info">
                  <p>
                    Movie Name : <span> {invoice.data.movies.name} </span>
                  </p>
                  <p>
                    Room : <span>{invoice.data.movies.salle}</span>{" "}
                  </p>
                  <p>
                    Places : <span> {invoice.data.seats}</span>
                  </p>
                  <p>
                    Food : <span> {invoice.data.food? invoice.data.food : "Not reserved"} </span>
                  </p>
                  <p>
                    Price : <span>{invoice.data.price} DH</span>
                  </p>
                </div>
              )}
              {loading && (
                <div className="code">
                    <QRCodeCanvas value={invoice.data.stripeId} />
                  {/* <QRCode ref={qrCodeRef} value={invoice.data.stripeId} /> */}
                </div>
              )}
            </motion.div>
          </InvoiceStyle>
        )}
      </>
    );
  };

const InvoiceStyle = styled(motion.div)`
  /* background-color : red; */
  padding-top: 7rem;
  h1 {
    text-align: center;
    font-weight: bold;
    margin-bottom: 1em;
  }
  .ticket {
    background-color: #770202;
    border-radius: 5px;
    width: 80%;
    padding: 0;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    position: relative;
    .decoration {
      position: absolute;
      height: 50px;
      width: 50px;
      border-radius: 50%;
      background-color: black;
      &.leftDecoration {
        top: 30%;
        left: -25px;
        background-color: black;
      }
      &.topDecoration {
        top: -25px;
        left: 45%;
      }
      &.bottomDecoration {
        bottom: -25px;
        left: 45%;
      }
    }
    .info {
      padding: 30px 40px;
    }
    p {
      font-size: 19px;
      span {
        font-weight: 600;
      }
    }
    .code {
      display: flex;
      padding: 10px 25px;
      align-items: center;
      background-color: white;
      height: auto;
    }
  }
`;
export default Invoice;
