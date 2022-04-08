import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "../../css/chatbot.css";
function Chatbot() {
    const chatAreaRef = useRef(null);

    const [showChat, setShowChat] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [message, setMessage] = useState("");

    const [response, setResponse] = useState("");
    const [chats, setChats] = useState([
        {
            userType: "bot",
            text: "Hello, how may i help you today?",
        },
    ]);

    const [newChats, setNewChats] = useState("");

    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollIntoView({ behavior: "smooth" });
        }
    });

    const handleSubmit = async () => {
        if (userInput.length > 0) {
            setMessage(userInput);
            var responseData = await handleResponse(userInput);
            var newChatArray = [
                ...chats,
                { userType: "user", text: userInput },
                { userType: "bot", text: responseData },
            ];
            setUserInput("");
            setChats(newChatArray);
        }
    };

    const handleResponse = async (inputData) => {
        var res = "";
        var messageTxt = inputData.toLowerCase();
        if (
            (messageTxt.includes("add") || messageTxt.includes("adding")) &&
            messageTxt.includes("booking")
        ) {
            res = `<p>These are the steps to add a booking:</p>\n\n\t1.Open the booking form\n\t2.Enter the details\n\t3.Submit your details\n\t4.Accept and pay the prompted payment\n\t5.Download your processed flight ticket.`;
        } else if (
            (messageTxt.includes("change") ||
                messageTxt.includes("changing")) &&
            messageTxt.includes("booking")
        ) {
            res = "Helping with changing booking";
        } else if (
            (messageTxt.includes("delete") ||
                messageTxt.includes("deleting")) &&
            messageTxt.includes("booking")
        ) {
            res = "Helping with deleting booking";
        } else {
            res = "Sorry i didn't get your question.";
        }

        // setChats([...chats, { userType: "bot", text: res }]);
        return res;
    };

    return (
        <>
            {!showChat && (
                <div
                    id="chatbot_min"
                    className="border pe-2 ps-2 pb-1 pt-1 d-flex align-items-center shadow-lg"
                    style={{ backgroundColor: "#dee1e6", borderRadius: "10px" }}
                    onClick={() => {
                        setShowChat(true);
                    }}
                >
                    <img
                        className="rounded-circle rounded"
                        src="/storage/system_pics/cartoon_avatar.PNG"
                        style={{ height: "30px", width: "30px" }}
                    />
                    <div className="fw-bold ms-3 me-3">Chat with us</div>
                    <div
                        className="rounded-circle bg-success"
                        style={{ height: "7px", width: "7px" }}
                    ></div>
                </div>
            )}

            {showChat && (
                <>
                    <div className="card">
                        <div className="card-header d-flex  align-items-center">
                            <img
                                className="rounded-circle rounded"
                                src="/storage/system_pics/cartoon_avatar.PNG"
                                style={{ height: "30px", width: "30px" }}
                            />
                            <span className="fw-bolder ms-2">
                                Customer care
                            </span>
                        </div>
                        <div
                            id="chatArea"
                            className="bg-light pb-2 pt-0 ps-0 pe-0 shadow-lg card-body d-flex flex-column"
                        >
                            {chats &&
                                chats.map((chat, index) => (
                                    <div
                                        className={`p-0 w-100 d-flex ${
                                            chat.userType == "bot"
                                                ? "justify-content-start"
                                                : "justify-content-end"
                                        } `}
                                        key={index}
                                    >
                                        <span
                                            className={`chat_bubble p-1 border ${
                                                chat.userType == "bot"
                                                    ? "animate__animated animate__fadeIn animate__slow"
                                                    : ""
                                            }`}
                                            style={{
                                                backgroundColor: `${
                                                    chat.userType == "bot"
                                                        ? "#cfd3da"
                                                        : "#34bedb"
                                                }`,
                                            }}
                                        >
                                            {chat.text}
                                        </span>
                                    </div>
                                ))}
                            <div ref={chatAreaRef} className=""></div>
                        </div>
                        <div className="card-footer d-flex align-items-center justify-content-center">
                            <input
                                type="text"
                                placeholder="Type message here..."
                                className="form-control"
                                value={userInput}
                                onChange={(e) => {
                                    setUserInput(e.target.value);
                                }}
                                onKeyDown={(e) => {
                                    if (e.keyCode == "13") {
                                        handleSubmit();
                                    }
                                }}
                            />
                            <i
                                id="chatboxSendBtn"
                                className={`bi bi-send-fill ms-2 ${
                                    userInput ? "text-success" : "disabled"
                                }`}
                                style={{ fontSize: "25px" }}
                                onClick={handleSubmit}
                            ></i>
                        </div>
                    </div>
                    <i
                        id="close_chatbot"
                        className="bi bi-x-circle-fill text-white m-2 shadow-lg"
                        style={{ fontSize: "30px" }}
                        onClick={() => {
                            setShowChat(false);
                        }}
                    ></i>
                </>
            )}
        </>
    );
}

export default Chatbot;
if (document.getElementById("chatbot_div")) {
    ReactDOM.render(<Chatbot />, document.getElementById("chatbot_div"));
}
