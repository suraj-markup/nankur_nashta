import React, { useState } from 'react';

const Contact = () => {

    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to server)
        console.log(form);
    };

    return (
        <div className="font-sans p-6 mx-auto max-w-4xl text-center bg-orange-100  rounded-lg shadow-lg flex flex-col md:flex-row justify-evenly my-20">
            <div className="md:w-1/2 p-4 mr-10">
                <h1 className="text-4xl font-bold text-orange-800 mb-2">Contact Us</h1>
                {/* <h2 className="text-2xl font-semibold text-orange-700 mb-4">Nankur Nashta 🍔</h2> */}
                <p className="text-lg text-gray-700 mb-6">For any queries regarding your orders, feel free to reach out to us:</p>
                <div className="text-lg text-gray-800 mb-6">
                    <p className="mb-2"><strong>Phone:</strong> +1 (234) 567-890</p>
                    <p className="mb-2"><strong>Email:</strong> info@nakurnashta.com</p>
                    <p className="mb-2"><strong>Address:</strong> 1234 Foodie Lane, Culinary City, TasteState, 56789</p>
                    <p><strong>Availability:</strong> 24/7</p>
                </div>
            </div>


            <div className="md:w-1/2 p-4 bg-white rounded-lg shadow-md ml-10">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={form.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Your name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={form.email}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            value={form.message}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Your message"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
