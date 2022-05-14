import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../css/user/addBooking.css";
import Loading from "../Loading";
import { RiFlightTakeoffFill, RiFlightLandFill } from "react-icons/ri";
import { AiOutlineEnter } from "react-icons/ai";
import { FcCalendar } from "react-icons/fc";
import { GiCommercialAirplane } from "react-icons/gi";
import { BiUserPlus } from "react-icons/bi";
import { GrDocumentUser } from "react-icons/gr";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import FinalizeBookingModal from "./FinalizeBookingModal";

function AddBooking() {
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

   

    const [editingIndex, setEditingIndex] = useState("");

    const [loadingMessage, setLoadingMessage] = useState("");
    const queryParams = new URLSearchParams(window.location.search);
    const [flightId, setFlightId] = useState(queryParams.get("id"));
    const [flight, setFlight] = useState("");
    const [showFinalizeBookingModal, setShowFinalizeBookingModal] =
        useState(false);
    const [selectedClass, setSelectedClass] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [choosenClass, setChoosenClass] = useState("");
    const [currentBooking, setCurrentBooking] = useState("");
    const [isAddingPassenger, setIsAddingPassenger] = useState(false);

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [ageError, setAgeError] = useState(false);
    const [classError, setClassError] = useState(false);

    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
    const [ageErrorMessage, setAgeErrorMessage] = useState("");
    const [classErrorMessage, setClassErrorMessage] = useState(
        "Kindly choose a class from the option provided"
    );

    const [totalPrice, setTotalPrice] = useState(0);

    const nameRegexPattern = new RegExp(/^[A-Za-z]+$/);

    useEffect(() => {
        if (!flight) {
            axios
                .get("/get-flight/" + flightId)
                .then((res) => {
                    console.log("flight details");
                    setFlight(res.data);
                })
                .catch((e) => {
                    console.log("Unable to fetch flight details");
                    console.log(e);
                });
        }
    });

    const closeFinalizeBookingModal = () => {
        setSelectedClass("");
        setShowFinalizeBookingModal(false);
    };

    

    const removeErrorMessages = () => {
        setFirstNameError(false);
        setFirstNameErrorMessage("");
        setLastNameError(false);
        setLastNameErrorMessage("");
        setAgeError(false);
        setClassError(false);
        setAgeErrorMessage("");
    };

    const handleAddPassenger = () => {
        removeErrorMessages();
        setIsAddingPassenger(true);
        if (
            !firstName ||
            !lastName ||
            !age ||
            !choosenClass ||
            !nameRegexPattern.test(firstName) ||
            !nameRegexPattern.test(lastName)
        ) {
            if (!firstName) {
                setIsAddingPassenger(false);
                setFirstNameError(true);
                setFirstNameErrorMessage("This field id required");
            }
            if (!lastName) {
                setIsAddingPassenger(false);
                setLastNameError(true);
                setLastNameErrorMessage("This field id required");
            }
            if (!age) {
                setIsAddingPassenger(false);
                setAgeError(true);
                setAgeErrorMessage("This field id required");
            }
            if (!choosenClass) {
                setIsAddingPassenger(false);
                setClassError(true);
            }
            if (firstName && !nameRegexPattern.test(firstName)) {
                setIsAddingPassenger(false);
                setFirstNameError(true);
                setFirstNameErrorMessage(
                    "The first name field can only contain characters with no spaces."
                );
            }
            if (lastName && !nameRegexPattern.test(lastName)) {
                setIsAddingPassenger(false);
                setLastNameError(true);
                setLastNameErrorMessage(
                    "The last name field can only contain characters with no spaces."
                );
            }
        } else {
            var price = getClassPrice(choosenClass);

            const newBooking = {
                firstName: firstName,
                lastName: lastName,
                age: age,
                class: choosenClass,
                price: price,
            };
            if (isEditing) {
                var newBookingList = currentBooking.map((booking, index) => {
                    if (index == editingIndex) {
                        return newBooking;
                    } else {
                        return booking;
                    }
                });

                setCurrentBooking(newBookingList);
                var priceHolder = 0;
                newBookingList.forEach((booking) => {
                    priceHolder = priceHolder + parseInt(booking.price);
                });
                setTotalPrice(priceHolder);
                closeEdit();
            } else {
                var newList = [...currentBooking, newBooking];
                setCurrentBooking(newList);

                newList.forEach((booking) => {
                    setTotalPrice(
                        parseInt(totalPrice) + parseInt(booking.price)
                    );
                });
            }

            setFirstName("");
            setLastName("");
            setAge("");
            setChoosenClass("");
            setIsAddingPassenger(false);
        }
    };

    const getClassPrice = (choosenClass) => {
        switch (choosenClass) {
            case "A":
                return flight.class_A_price;
                break;
            case "B":
                return flight.class_B_price;
                break;
            case "C":
                return flight.class_C_price;
                break;
            default:
                return 0;
        }
    };

    const editPassenger = (bookingIndex) => {
        setEditingIndex(bookingIndex);
        setIsEditing(true);
        const passenger = currentBooking.find(
            (booking, index) => index == bookingIndex
        );
        setFirstName(passenger.firstName);
        setLastName(passenger.lastName);
        setAge(passenger.age);
        setChoosenClass(passenger.class);
    };

    const closeEdit = () => {
        setFirstName("");
        setLastName("");
        setAge("");
        setChoosenClass("");
        setIsAddingPassenger(false);
        setIsEditing(false);
        setEditingIndex("");
    };

    const deletePassenger = (bookingIndex) => {
        setCurrentBooking(
            currentBooking.filter((booking, index) => index != bookingIndex)
        );
    };

    return (
        <div id="container mt-5 mb-5 p-5">
            <div className="card row m-3 pb-5 shadow ">
                <div className="card-header  m-0 row d-flex p-3">
                    <div className="col-sm-6 m-0 row p-0 d-flex justify-content-center">
                        <span className="d-flex align-items-center  col-md-5">
                            Departing from{" "}
                            <b className="ms-2">{flight.departure_location}</b>
                            <RiFlightTakeoffFill
                                style={{
                                    fontSize: "25px",
                                    marginLeft: "10px",
                                }}
                            />
                        </span>

                        <span className="d-flex align-items-center col-md-6">
                            Departure date{" "}
                            <b className="ms-2">{flight.departure_date}</b>
                            <FcCalendar
                                style={{
                                    fontSize: "25px",
                                    marginLeft: "10px",
                                }}
                            />
                        </span>
                    </div>
                    <div className="col-sm-6 row d-flex justify-content-between">
                        <span className="d-flex align-items-center col-md-5">
                            Arriving at{" "}
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
                        <span className="d-flex align-items-center col-md-6  ">
                            Arrival date{" "}
                            <b className="ms-2">{flight.arrival_date}</b>
                            <FcCalendar
                                style={{
                                    fontSize: "25px",
                                    marginLeft: "10px",
                                }}
                            />
                        </span>
                    </div>
                </div>
                <div className="card-body row d-flex justify-content-around align-items-center m-0 p-3">
                    <h5 className="col-sm-12 m-2 text-center">
                        Our flying rates
                        <GiCommercialAirplane
                            style={{
                                fontSize: "25px",
                                marginLeft: "10px",
                            }}
                        />
                    </h5>
                    <div className="row col-sm-10 mx-auto mb-2 mt-2 d-flex justify-content-around align-items-center">
                        <div
                            className="card class-card p-0 col-sm-3 shadow-lg mb-2 mt-2"
                            style={{
                                color: "white",

                                backgroundImage:
                                    "radial-gradient(circle at 10% 10%, rgba(215,197,40,1), rgba(148,119,45,1))",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                setLoadingMessage("Loading...");
                                setIsLoading(true);
                                setSelectedClass("A");
                                setTimeout(() => {
                                    setLoadingMessage("");
                                    setIsLoading(false);
                                    setShowBookingModal(true);
                                }, 1000);
                            }}
                        >
                            <div className="card-body d-flex flex-column align-items-center">
                                <h4>Class A</h4>
                                <h5 className="mt-4">
                                    Ksh {flight.class_A_price}/=
                                </h5>
                                <BsFillBriefcaseFill
                                    style={{
                                        fontSize: "25px",
                                        marginTop: "20px",
                                        textShadow: "2px 2px 4px #232323",
                                    }}
                                />
                            </div>
                        </div>
                        <div
                            className="card class-card p-0 col-sm-3 shadow-lg mb-2 mt-2"
                            style={{
                                color: "white",
                                backgroundImage:
                                    "radial-gradient(circle at 10% 10%, rgba(230,0,230,1), rgba(124,0,124,1))",

                                cursor: "pointer",
                            }}
                            onClick={() => {
                                setLoadingMessage("Loading...");
                                setIsLoading(true);
                                setSelectedClass("B");
                                setTimeout(() => {
                                    setLoadingMessage("");
                                    setIsLoading(false);
                                    setShowBookingModal(true);
                                }, 1000);
                            }}
                        >
                            <div className="card-body d-flex flex-column align-items-center">
                                <h4>Class B</h4>
                                <h5 className="mt-4">
                                    Ksh {flight.class_B_price}/=
                                </h5>
                                <BsFillBriefcaseFill
                                    style={{
                                        fontSize: "25px",
                                        marginTop: "20px",
                                    }}
                                />
                            </div>
                        </div>
                        <div
                            className="card class-card p-0 col-sm-3 shadow-lg mb-2 mt-2"
                            style={{
                                color: "white",

                                cursor: "pointer",
                                backgroundImage:
                                    "radial-gradient(circle at 10% 10%, rgba(9,156,255,1), rgba(0,122,204,1))",
                            }}
                            onClick={() => {
                                setLoadingMessage("Loading...");
                                setIsLoading(true);
                                setSelectedClass("C");
                                setTimeout(() => {
                                    setLoadingMessage("");
                                    setIsLoading(false);
                                    setShowBookingModal(true);
                                }, 1000);
                            }}
                        >
                            <div className="card-body d-flex flex-column align-items-center">
                                <h4>Class C</h4>
                                <h5 className="mt-4">
                                    Ksh {flight.class_C_price}/=
                                </h5>
                                <BsFillBriefcaseFill
                                    style={{
                                        fontSize: "25px",
                                        marginTop: "20px",
                                    }}
                                />
                            </div>
                        </div>
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
                                Prices are for people above the age of 2 years
                                old. Children under the age of 2 years are held
                                on the lap and are boarding free of charge.
                            </div>
                        </div>
                    </div>
                    <h5 className="col-sm-12 mt-5 mb-3 text-center">
                        Passenger details
                        <GrDocumentUser
                            style={{
                                fontSize: "25px",
                                marginLeft: "10px",
                            }}
                        />
                    </h5>
                </div>
                <div className="row col-sm-12 p-2  m-0">
                    <div className="row col-sm-5 p-4 border-end">
                        <div className="col-sm-12 m-4 d-flex justify-content-center align-items-center">
                            {isEditing ? "Edit Passenger" : "Add Passenger"}
                            <BiUserPlus
                                style={{
                                    fontSize: "25px",
                                    marginLeft: "10px",
                                }}
                            />
                            {isEditing && (
                                <span
                                    className="ms-5 btn btn-sm btn-outline-dark"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        closeEdit();
                                    }}
                                >
                                    <b>close Edit</b>
                                </span>
                            )}
                        </div>

                        <div
                            className="form-group col-sm-6"
                            style={{ fontSize: "14px", color: "#444444" }}
                        >
                            <label
                                className={` ${
                                    firstNameError ? "text-danger" : ""
                                }`}
                            >
                                First Name
                                <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value.trim());
                                }}
                                className={`form-control mt-1 mb-1 ${
                                    firstNameError ? "border border-danger" : ""
                                }`}
                            />
                            {firstNameError && (
                                <small className="text-danger">
                                    {firstNameErrorMessage}
                                </small>
                            )}
                        </div>
                        <div
                            className="form-group col-sm-6"
                            style={{ fontSize: "14px", color: "#444444" }}
                        >
                            <label
                                className={` ${
                                    lastNameError ? "text-danger" : ""
                                }`}
                            >
                                Last Name
                                <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value.trim());
                                }}
                                className={`form-control mt-1 mb-1 ${
                                    lastNameError ? "border border-danger" : ""
                                }`}
                            />
                            {lastNameError && (
                                <small className="text-danger">
                                    {lastNameErrorMessage}
                                </small>
                            )}
                        </div>
                        <div
                            className="form-group col-sm-6 mt-2"
                            style={{ fontSize: "14px", color: "#444444" }}
                        >
                            <label
                                className={` ${ageError ? "text-danger" : ""}`}
                            >
                                Age
                                <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="number"
                                name="idNumber"
                                value={age}
                                onChange={(e) => {
                                    setAge(e.target.value);
                                }}
                                className={`form-control mt-1 mb-1 ${
                                    ageError ? "border border-danger" : ""
                                }`}
                            />
                            {ageError && (
                                <small className="text-danger">
                                    {ageErrorMessage}
                                </small>
                            )}
                        </div>
                        <div
                            className="form-group col-sm-6 mt-2"
                            style={{ fontSize: "14px", color: "#444444" }}
                        >
                            <label
                                className={` ${
                                    classError ? "text-danger" : ""
                                }`}
                            >
                                Class
                                <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                                className={`form-select mt-1 mb-1 ${
                                    classError ? "border border-danger" : ""
                                }`}
                                aria-label="Default select example"
                                placeholder="Choose"
                                value={choosenClass}
                                onChange={(e) => {
                                    setChoosenClass(e.target.value);
                                }}
                                style={{
                                    fontSize: "14px",
                                    color: "#444444",
                                    cursor: "pointer",
                                }}
                            >
                                <option value="">Choose Class</option>
                                <option value="A">Class A</option>
                                <option value="B">Class B</option>
                                <option value="C">Class C</option>
                            </select>
                            {classError && (
                                <small className="text-danger">
                                    {classErrorMessage}
                                </small>
                            )}
                        </div>
                        <div className="col-sm-12 d-flex mt-3 justify-content-end">
                            <button
                                className={`btn ${
                                    isEditing ? "btn-warning" : "btn-success"
                                } btn-sm d-flex align-items-center`}
                                onClick={handleAddPassenger}
                            >
                                {isEditing ? "Edit Passenger" : "Add Passenger"}
                                {isAddingPassenger && (
                                    <span className="spinner-border spinner-border-sm text-white ms-1"></span>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="col-sm-7 pl-3 pr-3 pb-3 m-0 row d-flex justify-content-center">
                        {currentBooking ? (
                            <div className="table-responsive col-sm-12 m-3 mx-auto ">
                                <table className="table table-striped table-bordered text-center">
                                    <thead
                                        className="bg-dark text-white"
                                        style={{ fontSize: "16px" }}
                                    >
                                        <tr>
                                            <td colSpan="8">
                                                Current Bookings
                                            </td>
                                        </tr>
                                        <tr style={{ fontSize: "16px" }}>
                                            <td></td>
                                            <td>First Name</td>
                                            <td>Last Name</td>
                                            <td>Age</td>
                                            <td>Class</td>
                                            <td>Price</td>
                                            <td colSpan="2">Action</td>
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
                                                    <td
                                                        className="text-warning"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            editPassenger(
                                                                index
                                                            );
                                                        }}
                                                    >
                                                        Edit
                                                    </td>
                                                    <td
                                                        className="text-danger"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            deletePassenger(
                                                                index
                                                            );
                                                        }}
                                                    >
                                                        Delete
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                        <tr>
                                            <td className="" colSpan="6">
                                                <b>TOTAL PRICE</b>
                                            </td>
                                            <td className="" colSpan="2">
                                                <b>Ksh {totalPrice}/=</b>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="d-flex justify-content-end">
                                    <button
                                        className="btn btn-primary ms-auto d-flex justify-content-end align-items-center"
                                        onClick={() => {
                                            setShowFinalizeBookingModal(true);
                                        }}
                                    >
                                        Proceed to Checkout{" "}
                                        <MdPayment
                                            style={{
                                                fontSize: "20px",
                                                marginLeft: "10px",
                                            }}
                                        />
                                    </button>{" "}
                                </div>
                            </div>
                        ) : (
                            <div className="row">
                                <div
                                    className="alert mx-auto col-sm-8 alert-warning"
                                    style={{ height: "fit-content" }}
                                >
                                    You have no bookings yet.
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isLoading && <Loading message={loadingMessage} />}
            {showFinalizeBookingModal && (
                <FinalizeBookingModal
                    flight={flight}
                    currentBooking={currentBooking}
                    closeBookingModal={closeFinalizeBookingModal}
                    totalPrice={totalPrice}
                   
                />
            )}
           
        </div>
    );
}

export default AddBooking;
if (document.getElementById("cover")) {
    ReactDOM.render(<AddBooking />, document.getElementById("cover"));
}
