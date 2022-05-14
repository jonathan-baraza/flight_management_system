import React, { useState, useEffect, useRef } from "react";
import "../../../css/user/receipt.css";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { RiFlightTakeoffFill, RiFlightLandFill } from "react-icons/ri";
import { FcCalendar } from "react-icons/fc";

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

function Receipt({ checkoutID, currentBooking, flight, closeModal }) {
    const container = useRef(null);
    const exportPDFWithMethod = () => {
        let element = container.current || document.body;
        savePDF(element, {
            paperSize: "auto",
            margin: 40,
            fileName: `KenyaAirwaysTicket ${new Date().getFullYear()}`,
        });
    };
    return (
        <div id="receiptModalContainer" className="row">
            <div id="receiptmodalDiv" className=" rounded p-3 col-sm-6 p-3">
                <div className="w-100 d-flex justify-content-between align-items-center mb-2">
                    <button
                        className="btn btn-primary"
                        onClick={exportPDFWithMethod}
                    >
                        Download receipt
                    </button>
                    <AiOutlineClose
                        onClick={closeModal}
                        style={{
                            fontSize: "25px",
                            cursor: "pointer",
                        }}
                    />
                </div>
                <PDFExport
                    paperSize="auto"
                    margin={40}
                    fileName={`Report for ${new Date().getFullYear()}`}
                    author="KendoReact Team"
                >
                    <div ref={container} className="p-3">
                        <div className="w-100 d-flex justify-content-center align-items-center">
                            <h5>Kenya Airways Ticket</h5>
                            <img
                                style={{ width: "100px" }}
                                src="/storage/system_pics/logo.png"
                                className="m-2"
                            />
                        </div>
                        <div className="w-100 " style={{ fontSize: "12px" }}>
                            <div className="w-100 text-center">
                                Your ticket id is
                                <span className="text-danger ms-3">
                                    <b>{checkoutID}</b>
                                </span>
                            </div>
                            <div className="col-sm-12 row">
                                <span className="col-sm-12 text-center mt-2">
                                    From
                                    <b className="ms-2">
                                        {flight.departure_location}
                                    </b>
                                    <RiFlightTakeoffFill
                                        style={{
                                            fontSize: "14px",
                                            marginLeft: "10px",
                                            marginRight: "20px",
                                        }}
                                    />
                                    To
                                    <b className="ms-2">
                                        {flight.destination_location}
                                    </b>
                                    <RiFlightLandFill
                                        style={{
                                            fontSize: "14px",
                                            marginLeft: "10px",
                                        }}
                                    />
                                </span>
                                <span className="col-sm-12 text-center mt-2">
                                    Departure
                                    <b className="ms-2">
                                        {flight.departure_date}
                                    </b>
                                    <FcCalendar
                                        style={{
                                            fontSize: "14px",
                                            marginLeft: "5px",
                                            marginRight: "15px",
                                        }}
                                    />
                                    Arrival
                                    <b className="ms-2">
                                        {flight.arrival_date}
                                    </b>
                                    <FcCalendar
                                        style={{
                                            fontSize: "20px",
                                            marginLeft: "5px",
                                        }}
                                    />
                                </span>
                            </div>

                            {currentBooking && (
                                <div
                                    className="table-responsive col-sm-12 m-5 mx-auto "
                                    style={{ fontSize: "12px" }}
                                >
                                    <table className="table  text-center">
                                        <thead style={{ fontSize: "16px" }}>
                                            <tr>
                                                <td colSpan="6">
                                                    Your Bookings
                                                </td>
                                            </tr>
                                            <tr style={{ fontSize: "12px" }}>
                                                <td></td>
                                                <td>First Name</td>
                                                <td>Last Name</td>
                                                <td>Age</td>
                                                <td>Class</td>
                                                <td>Price</td>
                                            </tr>
                                        </thead>
                                        <tbody style={{ fontSize: "10px" }}>
                                            {currentBooking.map(
                                                (booking, index) => (
                                                    <tr
                                                        className=""
                                                        key={index}
                                                    >
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {booking.firstName}
                                                        </td>
                                                        <td>
                                                            {booking.lastName}
                                                        </td>
                                                        <td>{booking.age}</td>
                                                        <td>{booking.class}</td>
                                                        <td>{booking.price}</td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            <div
                                className="col-sm-12 row d-flex justify-content-center text-center"
                                style={{
                                    color: "gray",
                                    fontStyle: "italic",
                                    marginTop: "10px",
                                    marginBottom: "20px",
                                    fontSize: "12px",
                                }}
                            >
                                <div className="col-sm-6 text-center">
                                    Keep your id secret and safe.
                                </div>
                            </div>
                        </div>
                    </div>
                </PDFExport>
            </div>
        </div>
    );
}

export default Receipt;
