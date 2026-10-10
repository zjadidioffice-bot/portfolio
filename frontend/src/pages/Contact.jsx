import { useState } from "react";

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const[status,setStatus]=useState("");
    const handleSubmit = async(e) => {
        e.preventDefault();
        setStatus("sending....")
        const formData={
            name,
            email,
            message
        }
        try {
        const response=await fetch(
            "http://localhost:3000/api/contact",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            }
        );
        const data=await response.json();
        if(!response.ok){
            throw new Error(data.message || "failed to send messagee");
        }
        setStatus("message sent successfully")
        setName("");
        setEmail("");
        setMessage("");        
        } catch (error) {
            console.error("contact form error",error)
            setStatus("could not send message,please try again")
        }
        console.log("Contact page rendered");
    }
    return (
        <section>
            <h1>Contact me</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>message</label>
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <button type="submit">
                    send message
                </button>
                <p>{status}</p>
            </form>
        </section>
    );

}

export default Contact;