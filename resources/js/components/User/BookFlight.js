import { RiFlightTakeoffFill, RiFlightLandFill } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import "../../../css/user/flight.css";
import axios from "axios";
import Loading from "../Loading";

function BookFlight() {
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [isRoundTrip, setIsRoundTrip] = useState(true);
    const [isFetchingResults, setIsFetchingResults] = useState(false);
    const [searchNotFound, setSearchNotFound] = useState(false);

    const [searchResults, setSearchResults] = useState("");

    const [depLocation, setDepLocation] = useState("");
    const [arrLocation, setArrLocation] = useState("");
    const [depDate, setDepDate] = useState("");
    const [arrDate, setArrDate] = useState("");
    const [allFlights, setAllFlights] = useState("");

    const [allDepLocations, setAllDepLocations] = useState("");
    const [allArrLocations, setAllArrLocations] = useState("");

    const fetchResults = () => {
        axios
            .get("/all-flights")
            .then((res) => {
                console.log("All flights");
                console.log(res.data);
                setAllFlights(res.data);

                var departureLocationsHolder = [];
                var arrivalLocationsHolder = [];
                res.data.forEach((flight) => {
                    if (
                        !departureLocationsHolder.includes(
                            flight.departure_location
                        )
                    ) {
                        departureLocationsHolder.push(
                            flight.departure_location
                        );
                    }
                    if (
                        !arrivalLocationsHolder.includes(
                            flight.destination_location
                        )
                    ) {
                        arrivalLocationsHolder.push(
                            flight.destination_location
                        );
                    }
                });
                console.log("dlocs");
                console.log(departureLocationsHolder);
                console.log("alocs");
                console.log(arrivalLocationsHolder);
                setAllDepLocations(departureLocationsHolder);
                setAllArrLocations(arrivalLocationsHolder);
            })
            .catch((e) => {
                console.log("Failed to fetch flights");
                console.log(e);
            });
    };

    useEffect(() => {
        if (!allFlights) {
            fetchResults();
        }
    });

    const handleSearch = () => {
        setSearchResults("");
        setSearchNotFound(false);
        if (!depLocation) {
            setErrorMessage(
                "Kindly enter your departure location before you continue"
            );
            setIsError(true);
            setTimeout(() => {
                setIsError(false);
                setErrorMessage("");
            }, 4000);
        } else if (!arrLocation) {
            setErrorMessage(
                "Kindly enter your destination location before you continue"
            );
            setIsError(true);
            setTimeout(() => {
                setIsError(false);
                setErrorMessage("");
            }, 4000);
        } else {
            setIsFetchingResults(true);
            setTimeout(() => {
                setIsFetchingResults(false);
                var filteredFlights = allFlights.filter(
                    (flight) =>
                        flight.departure_location == depLocation &&
                        flight.destination_location == arrLocation
                );

                if (filteredFlights.length > 0) {
                    setSearchResults(filteredFlights);
                } else {
                    setSearchNotFound(true);
                }
            }, 2000);
        }
    };

    return (
        <>
            {isError && (
                <div className="alert alert-danger alert-dismissible col-sm-8 mx-auto text-center">
                    {errorMessage}
                    <button
                        className="btn-close"
                        onClick={() => {
                            setIsError(false);
                            setErrorMessage("");
                        }}
                    ></button>
                </div>
            )}
            <div className="col-sm-12 d-flex p-3">
                <button
                    className={` btn ${
                        isRoundTrip
                            ? "btn-danger"
                            : " btn-outline-dark trip_select_btn"
                    } ms-3 `}
                    style={{ borderRadius: "30px" }}
                    onClick={() => {
                        setIsRoundTrip(true);
                    }}
                >
                    Round trip
                </button>
                <button
                    className={` btn ${
                        isRoundTrip
                            ? "btn-outline-dark trip_select_btn"
                            : " btn-danger"
                    } ms-3 `}
                    style={{ borderRadius: "30px" }}
                    onClick={() => {
                        setIsRoundTrip(false);
                    }}
                >
                    One way
                </button>
            </div>
            <div className="col-sm-6 row">
                <div className="form-group col-sm-6">
                    <label className="m-2 d-flex align-items-center">
                        {" "}
                        <RiFlightTakeoffFill
                            style={{
                                fontSize: "25px",
                                marginRight: "10px",
                            }}
                        />
                        From*
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        list="from"
                        placeholder="Type to search..."
                        autoComplete="off"
                        autofill="off"
                        onChange={(e) => {
                            setDepLocation(e.target.value);
                        }}
                    />
                    <datalist id="from">
                        {allDepLocations &&
                            allDepLocations.map((location, index) => (
                                <option key={index}>{location}</option>
                            ))}
                        {/* Intergrate not found feature */}
                        {!allDepLocations && <option>Not Found</option>}
                    </datalist>
                </div>
                <div className="form-group col-sm-6">
                    <label className="m-2 d-flex align-items-center ">
                        <RiFlightLandFill
                            style={{
                                fontSize: "25px",
                                marginRight: "10px",
                            }}
                        />
                        To*
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        list="to"
                        autoComplete="off"
                        autofill="off"
                        placeholder="Type to search..."
                        onChange={(e) => {
                            setArrLocation(e.target.value);
                        }}
                    />
                    <datalist id="to">
                        {allArrLocations &&
                            allArrLocations.map((location, index) => (
                                <option key={index}>{location}</option>
                            ))}
                        {/* Intergrate not found feature */}
                        {!allArrLocations && <option>Not Found</option>}
                    </datalist>
                </div>
            </div>
            <div className="col-sm-6 row">
                <div className="form-group col-sm-6">
                    <label className="m-2">Departure date*</label>
                    <input
                        type={"date"}
                        className="form-control"
                        onChange={(e) => {
                            setDepDate(e.target.value);
                        }}
                    />
                </div>
                {isRoundTrip && (
                    <div className="form-group col-sm-6">
                        <label className="m-2">Return date*</label>
                        <input
                            type={"date"}
                            className="form-control"
                            onChange={(e) => {
                                setArrDate(e.target.value);
                            }}
                        />
                    </div>
                )}
            </div>
            <div className="row mt-3 col-sm-12 d-flex p-3 justify-content-end me-3 ">
                <button
                    className="btn btn-danger me-2"
                    id="searchFlightBtn"
                    onClick={handleSearch}
                >
                    Search flight
                </button>
            </div>
            {isFetchingResults && <Loading message={"searching"} />}
            {searchResults.length > 0 && (
                <div className="row table-responsive">
                    <center>
                        <h4 className="m-3">Available Flights</h4>
                    </center>
                    <table className="table table-bordered table-striped text-center">
                        <thead className="table-dark">
                            <tr>
                                <td></td>
                                <td>Departure Location</td>
                                <td>Destination Location</td>
                                <td>Departure Date</td>
                                <td>Destination Date</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults &&
                                searchResults.map((result, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{result.departure_location}</td>
                                        <td>{result.destination_location}</td>
                                        <td>{result.departure_date}</td>
                                        <td>{result.arrival_date}</td>
                                        <td>
                                            <a
                                                href={`/add-booking?id=${result.id}`}
                                                className="btn btn-primary"
                                            >
                                                Book Now
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
            {searchNotFound && (
                <div className="alert alert-warning d-flex flex-column align-items-center">
                    <h4>No Flights found</h4>
                    <button className="btn btn-primary btn-sm m-3">
                        checkout all Available flights
                    </button>
                </div>
            )}
        </>
    );
}

export default BookFlight;
