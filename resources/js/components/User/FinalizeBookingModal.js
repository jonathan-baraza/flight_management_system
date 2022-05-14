import React, { useEffect, useState } from "react";
import "../../../css/user/addBooking.css";
import { GiCommercialAirplane } from "react-icons/gi";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { RiFlightTakeoffFill, RiFlightLandFill } from "react-icons/ri";
import { FcCalendar } from "react-icons/fc";
import { MdPayment, MdOutlinePhoneIphone } from "react-icons/md";
import PaymentSimulation from "./PaymentSimulation";
function FinalizeBookingModal({
    flight,
    currentBooking,
    totalPrice,
    closeBookingModal,
}) {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    const closePaymentModal = () => {
        setShowPaymentModal(false);
    };

    return (
        <div id="bookingModalContainer" className="row p-3">
            <div
                id="modalDiv"
                className="col-sm-8 m-1 mx-auto  rounded card p-0"
            >
                <div className=" d-flex justify-content-between align-items-center card-header p-3">
                    <h4>Your Booking Details</h4>
                    <button
                        className="btn btn-sm btn-outline-dark"
                        onClick={() => {
                            closeBookingModal();
                        }}
                    >
                        Exit
                    </button>
                </div>
                <div className="card-body">
                    <div className="col-sm-12 row">
                        <span className="col-sm-5">
                            From
                            <b className="ms-2">{flight.departure_location}</b>
                            <RiFlightTakeoffFill
                                style={{
                                    fontSize: "25px",
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
                                    fontSize: "25px",
                                    marginLeft: "10px",
                                }}
                            />
                        </span>
                        <span className="col-sm-7">
                            Departure
                            <b className="ms-2">{flight.departure_date}</b>
                            <FcCalendar
                                style={{
                                    fontSize: "25px",
                                    marginLeft: "5px",
                                    marginRight: "15px",
                                }}
                            />
                            Arrival
                            <b className="ms-2">{flight.arrival_date}</b>
                            <FcCalendar
                                style={{
                                    fontSize: "25px",
                                    marginLeft: "5px",
                                }}
                            />
                        </span>
                    </div>
                    <div className="row border-top mt-2">
                        {currentBooking && (
                            <div className="table-responsive col-sm-12 m-5 mx-auto ">
                                <table className="table table-striped table-bordered text-center">
                                    <thead
                                        className="bg-dark text-white"
                                        style={{ fontSize: "16px" }}
                                    >
                                        <tr>
                                            <td colSpan="6">Your Bookings</td>
                                        </tr>
                                        <tr style={{ fontSize: "16px" }}>
                                            <td></td>
                                            <td>First Name</td>
                                            <td>Last Name</td>
                                            <td>Age</td>
                                            <td>Class</td>
                                            <td>Price</td>
                                        </tr>
                                    </thead>
                                    <tbody style={{ fontSize: "14px" }}>
                                        {currentBooking.map(
                                            (booking, index) => (
                                                <tr className="" key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{booking.firstName}</td>
                                                    <td>{booking.lastName}</td>
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
                    </div>
                    <div className="row d-flex justify-center-center m-3">
                        <div className="row ">
                            <h4 className="col-sm-12 text-center mx-auto">
                                Payment Options:
                            </h4>
                            <h6 className="col-sm-12 text-center mx-auto m-3">
                                Total Amount payable: <b>Ksh {totalPrice}/=</b>
                            </h6>
                        </div>
                    </div>
                    <div className="row col-sm-12 d-flex flex-column align-items-center m-3">
                        <img
                            className="img-fluid col-sm-12"
                            style={{ width: "50%" }}
                            src="/storage/system_pics/mpesa_two.png"
                        />
                        <div className="d-flex justify-content-center col-sm-12 ">
                            <button
                                className="btn btn-success d-flex align-items-center m-3"
                                onClick={() => {
                                    setShowPaymentModal(true);
                                }}
                            >
                                Pay with Mpesa
                                <MdOutlinePhoneIphone
                                    style={{
                                        fontSize: "20px",
                                        marginLeft: "10px",
                                    }}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showPaymentModal && (
                <PaymentSimulation
                    closeModal={closePaymentModal}
                    totalPrice={totalPrice}
                    flight={flight}
                    currentBooking={currentBooking}
                />
            )}
        </div>
    );
}

export default FinalizeBookingModal;
