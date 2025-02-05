import React, { useState } from "react";
import "./../styles/ContactUs.css"
import axios from "./../components/axios";
import Notification from "./../components/Notification";

function ContactUs() {
    let [formData, setFormData] = useState({
        name: "",
        email: "",
        messageContent: ""
    })

    const [showNotification, setShowNotification] = useState(false);
    const [notificationText, setNotificationText] = useState("");
    const [messageSent, setMessageSent] = useState(false);

    const closeNotification = () => {
        setShowNotification(false);
        setNotificationText("");
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('messageContent', formData.messageContent);

        axios.post('/messages', {
            name: formData.name,
            email: formData.email,
            messageContent: formData.messageContent
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log ("Raw response data:", response.data);                
                const responseData = response.data;
                const messageSent = responseData.messageSent;
                setMessageSent(messageSent);
                setMessageSent(responseData.message);
                setNotificationText(response.data.message);
                setShowNotification(true);

                if (responseData.message === "Message sent successfully") {
                    setMessageSent(true);

                }

            })
            .catch((error) => {
                console.error("Error submitting the form:", error);
            });
    }
    return (
        <main className="full-block">
            <section className="contact-section">
                <div className="container">
                    <h1>Contact Us</h1>
                    <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" value={formData.name} onChange={handleChange} id="name" name="name" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" value={formData.email} onChange={handleChange} id="email" name="email" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <textarea id="message" value={formData.messageContent} onChange={handleChange} name="messageContent" required></textarea>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </section>
            {showNotification && <Notification show={showNotification} onClose={closeNotification} text={notificationText} />}
        </main>
    )
}

export default ContactUs;