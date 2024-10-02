import { useContext, useEffect, useState } from "react"
import { AppContext } from '../context/AppContext';
import { toast } from "react-toastify";
import axios from "axios";

export const MyAppointments = () => {

    const { backendUrl, token, getDoctorsData } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);
    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_');
        return dateArray[0] + " " + months[+dateArray[1]] + " " + dateArray[2];
    }

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
            if (data.success) {
                setAppointments(data.appointments.reverse());
                console.log(data.appointments);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const cancleAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
            if (data.success) {
                toast.success(data.message);
                getUserAppointments();
                getDoctorsData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: 'Appointment Payment',
            order_id: order._id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response);
            }
        }
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    const paymentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl, + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } });
            if (data.success) {
                initPay(data.order);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token]);

    return <>
        <div>
            <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My appointments</p>
            <div>
                {
                    appointments.map((item, i) => (
                        <div
                            key={item._id}
                            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
                        >
                            <div>
                                <img
                                    src={item.docData.image}
                                    alt="profile_image"
                                    className="w-32 bg-indigo-50"
                                />
                            </div>
                            <div className="flex-1 text-sm text-zinc-600">
                                <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
                                <p>{item.docData.speciality}</p>
                                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                                <p className="text-xs">{item.docData.address.line1}</p>
                                <p className="text-xs">{item.docData.address.line2}</p>
                                <p className="text-xs mt-1"><span className="text-sm text-neutral-700 font-medium">Date & Time: </span> {slotDateFormat(item.slotDate)} |  {item.slotTime}</p>
                            </div>
                            <div></div>
                            <div className="flex flex-col gap-2 justify-end">
                                {!item.cancelled && <button onClick={() => paymentRazorpay(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">Pay Online</button>}
                                {
                                    !item.cancelled &&
                                    <button onClick={() => cancleAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded  hover:bg-red-500 hover:text-white transition-all duration-300">Cancel appointment</button>
                                }
                                {
                                    item.cancelled &&
                                    <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">Appointment cancelled</button>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
}
