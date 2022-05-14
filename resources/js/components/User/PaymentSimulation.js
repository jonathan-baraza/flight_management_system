import React, { useState, useEffect } from "react";
import "../../../css/user/payment.css";
import axios from "axios";
import Loading from "../Loading";
import swal from "sweetalert";
import { AiOutlineClose } from "react-icons/ai";
import Receipt from "./Receipt";
function PaymentSimulation({ totalPrice, flight, closeModal, currentBooking }) {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(
        "Processing your payment"
    );
    const [responseMessage, setResponseMessage] = useState("");
    const [checkoutIdData, setCheckoutRequestId] = useState("");
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);

    const [showReceipt, setShowReceipt] = useState(false);

    useEffect(() => {
        console.log(currentBooking);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    // useEffect(() => {
    //     if (checkoutRequestId && !responseMessage) {
    //         console.log("Searching for response in the db");
    //         axios
    //             .get("/api/search-flight/" + checkoutRequestId)
    //             .then((res) => {
    //                 console.log("data");
    //                 console.log(res.data);
    //                 setPaymentSuccessful(true);
    //                 setResponseMessage(res.data.transactionStatus);
    //                 console.log(res.data.transactionStatus);
    //             })
    //             .catch((e) => {
    //                 console.log("Failed to search for response");
    //                 console.log(e);
    //             });
    //     }
    // });

    const [phoneError, setPhoneError] = useState(false);
    const [phoneErrorMessage, setPhoneErrorMessage] = useState("");

    const handleSubmit = () => {
        setPhoneError(false);
        setPhoneErrorMessage("");
        if (!phoneNumber) {
            setPhoneErrorMessage(
                "Kindly provide a phone number for processing payment"
            );
            setPhoneError(true);
        }

        if (phoneNumber.length < 9 || phoneNumber.length > 9) {
            setPhoneErrorMessage("Invalid number of characters");
            setPhoneError(true);
        } else {
            simulateTransaction();
        }
    };

    const simulateTransaction = async () => {
        setIsLoading(true);
        var fd = new FormData();
        fd.append("totalPrice", totalPrice);
        fd.append("phoneNumber", phoneNumber);
        fd.append("flightID", flight.id);

        // // fetch added payment to the db details while still loading
        await axios
            .post("/api/simulate-payment", fd)
            .then((response) => {
                // setIsLoading(false);
                // setIsLoading(false);
                setCheckoutRequestId(response.data.CheckoutRequestID);
                fd.append("checkoutRequestID", response.data.CheckoutRequestID);
                fetchTransactionDetails(response.data.CheckoutRequestID, fd);
                console.log(response.data.CheckoutRequestID);
            })
            .catch((error) => {
                setIsLoading(false);
                console.log("Error");
                console.log(error);
            });
    };

    const fetchTransactionDetails = async (id, fd) => {
        console.log("Fetching for " + id);
        console.log("fd");
        console.log(fd.getAll("checkoutRequestID"));
        var msgResponse = "";
        while (!msgResponse) {
            await axios
                .get("/api/search-payment/" + id)
                .then((res) => {
                    if (res.data.length > 0) {
                        console.log(res.data[0].transactionStatus);
                        msgResponse = res.data[0].transactionStatus;

                        if (msgResponse == "success") {
                            updateBooking(fd);
                        } else {
                            setIsLoading(false);
                            swal("Payment Error", msgResponse, "error");
                            setTimeout(() => {
                                addPassengers(id);
                            }, 1500);
                            //TODO: close payment simulation modal after response.
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    const updateBooking = async (fd) => {
        console.log("updating booking");
        await axios
            .post("/api/update-booking", fd)
            .then((res) => {
                if (res.data == "success") {
                    setLoadingMessage("Finalizing your booking");
                    // CREATE ADD PASSENGERS FORM
                    addPassengers(checkoutIdData);
                } else {
                    setIsLoading(false);
                    swal("Payment Error", "Something went wrong", "error");
                    console.log(res.data);
                }
            })
            .catch((e) => {
                setIsLoading(false);
                swal("Payment Error", "Something went wrong", "error");
                console.log(e);
            });
    };

    const addPassengers = async (reqID) => {
        await currentBooking.forEach((booking, index) => {
            var passengersFd = new FormData();
            passengersFd.append("flightId", flight.id);
            passengersFd.append("checkoutRequestId", reqID);
            passengersFd.append("firstName", booking.firstName);
            passengersFd.append("lastName", booking.lastName);
            passengersFd.append("age", booking.age);
            passengersFd.append("class", booking.class);
            passengersFd.append("phoneNumber", phoneNumber);
            insertPassengers(passengersFd);
        });

        setIsLoading(false);
        if (paymentSuccessful) {
            swal("Success", "Passengers added successfully", "success");
        } else {
            swal("error", "Process failed!Try again later", "error");
        }

        setShowReceipt(true);
    };

    const insertPassengers = async (passengersFd) => {
        console.log("passenger details");
        console.log(...passengersFd);
        await axios
            .post("/add-passengers", passengersFd)
            .then((res) => {
                if (res.data == "success") {
                    setPaymentSuccessful(true);
                } else {
                    console.log("res.data");
                    console.log(res.data);
                    setPaymentSuccessful(false);
                }
            })
            .catch((e) => {
                console.log("Error while adding passengers");
                console.log(e);
            });
    };

    const closeReceipt = () => {
        setShowReceipt(false);
    };

    return (
        <div id="paymentModalContainer">
            {!showReceipt && (
                <div id="modalDiv" className=" rounded p-5">
                    <div className="w-100 d-flex justify-content-end mb-2">
                        <AiOutlineClose
                            onClick={closeModal}
                            style={{
                                fontSize: "25px",
                                cursor: "pointer",
                            }}
                        />
                    </div>
                    <center>
                        <img
                            className="img-fluid col-sm-10 mx-auto mb-2"
                            style={{ width: "50%" }}
                            src="/storage/system_pics/mpesa_one.png"
                        />

                        <h6 className="mt-2">
                            Process payment for <b>ksh {totalPrice}/=</b>
                        </h6>
                    </center>
                    <div className="form-group mt-2">
                        <label className="m-3 mx-auto">
                            Enter your phone number
                        </label>
                        <div
                            style={{ border: "1px solid #cfd7da" }}
                            className={`d-flex align-items-center justify-content-center border-none  mt-1 mb-1 ${
                                phoneError ? "border border-danger" : ""
                            }`}
                        >
                            <span
                                className=" p-2 "
                                style={{ borderRight: "1px solid #cfd7da" }}
                            >
                                +254
                            </span>
                            <input
                                style={{ border: "none", outline: "none" }}
                                type="number"
                                name="phoneNumber"
                                value={phoneNumber}
                                className="mt-1 mb-1"
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                }}
                            />
                        </div>
                        {phoneError && (
                            <small className="text-danger w-50 text-center">
                                {phoneErrorMessage}
                            </small>
                        )}
                    </div>
                    <div className="w-100 d-flex justify-content-end">
                        <button
                            className="btn btn-success mt-3"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
            {isLoading && <Loading message={loadingMessage} />}
            {showReceipt && (
                <Receipt
                    closeModal={closeReceipt}
                    checkoutID={checkoutIdData}
                    currentBooking={currentBooking}
                    flight={flight}
                />
            )}
        </div>
    );
}

export default PaymentSimulation;
