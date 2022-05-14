import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { RiFlightTakeoffFill, RiFlightLandFill } from "react-icons/ri";
import { MdFlight, MdAdminPanelSettings } from "react-icons/md";
import { BsFillPersonCheckFill } from "react-icons/bs";
import "../../../css/user/flight.css";
import BookFlight from "./BookFlight";

import CheckIn from "./CheckIn";
import ManageBooking from "./ManageBooking";

function Flight() {
    const [activeTab, setActiveTab] = useState("booking");
    return (
        <div className="row main-flight-div ms-0 me-0 mt-4 mb-4 p-5">
            <div className="col-sm-12 row card d-flex justify-content-center p-0 ">
                <div className="card-header d-flex row p-0 m-0">
                    <div
                        className={`tab p-4 m-0 ${
                            activeTab == "booking"
                                ? "active-tab bg-danger text-white"
                                : "border-end"
                        }  d-flex justify-content-center`}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setActiveTab("booking");
                        }}
                    >
                        <MdFlight
                            style={{
                                fontSize: "25px",
                                marginRight: "10px",
                            }}
                        />
                        Book Flight
                    </div>
                    <div
                        className={`tab p-4 m-0 ${
                            activeTab == "check-in"
                                ? "active-tab bg-danger text-white"
                                : "border-end "
                        }  d-flex justify-content-center`}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setActiveTab("check-in");
                        }}
                    >
                        <BsFillPersonCheckFill
                            style={{
                                fontSize: "25px",
                                marginRight: "10px",
                            }}
                        />
                        Check in
                    </div>
                    <div
                        className={`tab p-4 m-0 ${
                            activeTab == "manage"
                                ? "active-tab bg-danger text-white"
                                : "border-end "
                        }  d-flex justify-content-center`}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setActiveTab("manage");
                        }}
                    >
                        <MdAdminPanelSettings
                            style={{
                                fontSize: "25px",
                                marginRight: "10px",
                            }}
                        />
                        Manage Booking
                    </div>
                </div>
                <div className="col-sm-12 row mx-auto card-body pb-5 ">
                    {activeTab == "booking" && <BookFlight />}
                    {activeTab == "check-in" && <CheckIn />}
                    {activeTab == "manage" && <ManageBooking />}
                </div>
            </div>
        </div>
    );
}

export default Flight;
if (document.getElementById("flightsHome")) {
    ReactDOM.render(<Flight />, document.getElementById("flightsHome"));
}
