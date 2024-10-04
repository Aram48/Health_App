import { useContext } from "react"
import { AdminContext } from "../context/AdminContext"
import { assets } from "../assets_admin/assets";
import { NavLink } from 'react-router-dom';
import { DoctorContext } from "../context/DoctorContext";

export const SideBar = () => {

    const { aToken } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext);

    return <>
        <div className="min-h-screen bg-white rounded-r">
            {
                aToken && <ul className="text-[#515151] mt-5">
                    <NavLink className={({ isActive }) => `flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={`/admin-dashboard`}>
                        <img
                            src={assets.home_icon}
                            alt="home_icon"
                        />
                        <p className="hidden md:block">Dashboard</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={`/all-appointments`}>
                        <img
                            src={assets.appointment_icon}
                            alt="appontment_icon"
                        />
                        <p className="hidden md:block">Appointments</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={`/all-doctor`}>
                        <img
                            src={assets.add_icon}
                            alt="add_icon"
                        />
                        <p className="hidden md:block">Add Doctor</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={`/doctor-list`}>
                        <img
                            src={assets.people_icon}
                            alt="people_icon"
                        />
                        <p className="hidden md:block">Doctors List</p>
                    </NavLink>
                </ul>
            }
            {
                dToken && <ul className="text-[#515151] mt-5">
                    <NavLink className={({ isActive }) => `flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={`/doctor-dashboard`}>
                        <img
                            src={assets.home_icon}
                            alt="home_icon"
                        />
                        <p className="hidden md:block">Dashboard</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={`/doctor-appointments`}>
                        <img
                            src={assets.appointment_icon}
                            alt="appontment_icon"
                        />
                        <p className="hidden md:block">Appointments</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={`/doctor-profile`}>
                        <img
                            src={assets.people_icon}
                            alt="people_icon"
                        />
                        <p className="hidden md:block">Profile</p>
                    </NavLink>
                </ul>
            }
        </div>
    </>
}