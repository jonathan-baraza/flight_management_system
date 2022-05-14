import React, { useState, useEffect } from "react";
import "../../../css/user/flight.css";
import { MdFlight, MdAdminPanelSettings } from "react-icons/md";
function ManageBooking() {
    return (
        <div className="col-sm-12 d-flex p-3">
            <div className="form-group col-sm-6 mx-auto">
                <label className="m-2 d-flex align-items-center ">
                    <MdFlight
                        style={{
                            fontSize: "20px",
                            marginRight: "10px",
                        }}
                    />
                    Enter Flight Reference Number
                </label>
                <input
                    type="text"
                    placeholder="Eg. KQ3WAJ32F2"
                    className="form-control p-3"
                />

                <div className="w-100 d-flex justify-content-end">
                    <button
                        className="btn btn-danger ms-auto mt-3"
                        id="searchFlightBtn"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ManageBooking;
