import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../../css/addflight.css";
import swal from "sweetalert";
//used to send get and post requests
import axios from "axios";
import Loading from "./Loading";

function AddFlight() {
    const [departureLocation, setDepartureLocation] = useState("");

    const [destinationLocation, setDestinationLocation] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");
    const [classAPrice, setClassAPrice] = useState("");
    const [classACapacity, setClassACapacity] = useState("");
    const [classBPrice, setClassBPrice] = useState("");
    const [classBCapacity, setClassBCapacity] = useState("");
    const [classCPrice, setClassCPrice] = useState("");
    const [classCCapacity, setClassCCapacity] = useState("");

    const [showLoading, setShowLoading] = useState(false);

    //Regex
    const checkEmailRegex = new RegExp(
        "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
    );

    const clearInputs = () => {
        setDepartureLocation("");
        setDestinationLocation("");
        setDepartureDate("");
        setArrivalDate("");
        setClassACapacity("");
        setClassAPrice("");
        setClassBCapacity("");
        setClassBPrice("");
        setClassCCapacity("");
        setClassCPrice("");
    };
    const handleSubmit = () => {
        // if (!checkEmailRegex.test(departureLocation)) {
        //     swal("Error", "Enter a valid email", "error");
        // } else {
        if (!departureLocation) {
            swal("Error", "Enter a valid email", "error");
        } else {
            setShowLoading(true);
            var fd = new FormData();
            fd.append("departure_location", departureLocation);
            fd.append("destination_location", destinationLocation);
            fd.append("departure_date", departureDate);
            fd.append("arrival_date", arrivalDate);
            fd.append("class_A_capacity", classACapacity);
            fd.append("class_A_price", classAPrice);
            fd.append("class_B_capacity", classBCapacity);
            fd.append("class_B_price", classBPrice);
            fd.append("class_C_capacity", classCCapacity);
            fd.append("class_C_price", classCPrice);

            axios
                .post("/add-flight", fd)
                .then((res) => {
                    if (res.data == "success") {
                        setShowLoading(false);
                        swal("success", "Flight added successfully", "success");
                        clearInputs();
                    } else {
                        setShowLoading(false);
                        console.log(res.data);
                        swal("Error", res.data.toString(), "error");
                    }
                })
                .catch((e) => {
                    setShowLoading(false);
                    swal("Error", e.toString(), "error");
                });
        }
    };
    return (
        <>
            <div
                id="container"
                className="form row rounded border m-3 p-3 d-flex flex-column bg-light"
            >
                <h3 className="mb-2 ms-3 ">Add Flight</h3>
                {showLoading && <Loading message={"Adding flight"} />}
                <div className="row">
                    <div className="d-flex col-md-12 row m-3">
                        <div className="form-group col-md-6">
                            <label>Departure location</label>
                            <input
                                value={departureLocation}
                                type="text"
                                className="form-control m-2 w-100 col-sm-6"
                                placeholder="e.g JKIA"
                                onChange={(e) => {
                                    setDepartureLocation(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Destination location</label>
                            <input
                                value={destinationLocation}
                                type="text"
                                className="form-control m-2 w-100 col-sm-6"
                                placeholder="e.g JKIA"
                                onChange={(e) => {
                                    setDestinationLocation(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="d-flex col-md-12 row m-3">
                        <div className="form-group col-md-6">
                            <label>Departure date</label>
                            <input
                                value={departureDate}
                                type="datetime-local"
                                className="form-control m-2"
                                placeholder=""
                                onChange={(e) => {
                                    setDepartureDate(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group col-md-6 ">
                            <label>Arrival date</label>
                            <input
                                value={arrivalDate}
                                type="datetime-local"
                                className="form-control m-2"
                                placeholder=""
                                onChange={(e) => {
                                    setArrivalDate(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="d-flex col-md-12 row m-3">
                        <div className="form-group col-md-6">
                            <label>Class A Price</label>
                            <input
                                value={classAPrice}
                                type="number"
                                className="form-control m-2 w-100"
                                placeholder=""
                                onChange={(e) => {
                                    setClassAPrice(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Class A capacity</label>
                            <input
                                value={classACapacity}
                                type="number"
                                className="form-control m-2 w-100"
                                placeholder=""
                                onChange={(e) => {
                                    setClassACapacity(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="d-flex col-md-12 row m-3">
                        <div className="form-group col-md-6">
                            <label>Class B Price</label>
                            <input
                                type="number"
                                className="form-control m-2 w-100"
                                placeholder=""
                                value={classBPrice}
                                onChange={(e) => {
                                    setClassBPrice(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Class B capacity</label>
                            <input
                                type="number"
                                className="form-control m-2 w-100"
                                placeholder=""
                                value={classBCapacity}
                                onChange={(e) => {
                                    setClassBCapacity(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="d-flex col-md-12 row m-3">
                        <div className="form-group col-md-6">
                            <label>Class C Price</label>
                            <input
                                type="number"
                                className="form-control m-2 w-100"
                                placeholder=""
                                value={classCPrice}
                                onChange={(e) => {
                                    setClassCPrice(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Class C capacity</label>
                            <input
                                type="number"
                                className="form-control m-2 w-100"
                                placeholder=""
                                value={classCCapacity}
                                onChange={(e) => {
                                    setClassCCapacity(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-end col-md-12 p-0 mt-3 m-0">
                        <button
                            className="btn btn-success  col-sm-3 me-0"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddFlight;
if (document.getElementById("addflight_div")) {
    ReactDOM.render(<AddFlight />, document.getElementById("addflight_div"));
}
