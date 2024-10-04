import { useContext, useState } from "react";
import { assets } from "../../assets_admin/assets";
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";

export const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false);
    const { backendUrl, aToken } = useContext(AdminContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const addNewDoctor = async (data) => {
        try {
            if (!docImg) {
                return toast.error('Image Not Selected');
            }

            const formData = new FormData();
            formData.append('image', docImg);
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('experience', data.experience);
            formData.append('fees', data.fees);
            formData.append('about', data.about);
            formData.append('speciality', data.speciality);
            formData.append('degree', data.degree);
            formData.append('address', JSON.stringify({ line1: data.address1, line2: data.address2 }));

            const { data: responseData } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } });

            if (responseData.success) {
                toast.success(responseData.message);
                reset();
                setDocImg(false);
            } else {
                toast.error(responseData.message);
            }

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    return (
        <form className="m-5 w-full" onSubmit={handleSubmit(addNewDoctor)}>
            <p className="mb-3 text-lg font-medium">Add Doctor</p>
            <div className="bg-white px-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
                <div className="flex items-center gap-4 mb-8 text-gray-500">
                    <label htmlFor="doc-img">
                        <img
                            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                            alt="upload_area"
                            className="w-16 mt-5 bg-gray-100 rounded-full cursor-pointer"
                        />
                    </label>
                    <input
                        type="file"
                        id="doc-img"
                        hidden
                        accept="image/"
                        onChange={(e) => setDocImg(e.target.files[0])}
                    />
                    <p className="mt-5">Upload doctor <br /> picture</p>
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Doctor name</p>
                            <input
                                className="border rounded px-3 py-2"
                                type="text"
                                placeholder="Name"
                                {...register("name", { required: true })}
                            />
                            {errors.name && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Doctor Email</p>
                            <input
                                className="border rounded px-3 py-2"
                                type="email"
                                placeholder="Email"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Doctor Password</p>
                            <input
                                className="border rounded px-3 py-2"
                                type="password"
                                placeholder="Password"
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Experience</p>
                            <select
                                className="border rounded px-3 py-2"
                                {...register("experience")}
                            >
                                {Array.from({ length: 10 }, (_, i) => (
                                    <option key={i} value={`${i + 1} Year`}>
                                        {`${i + 1} Year`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Fees</p>
                            <input
                                className="border rounded px-3 py-2"
                                type="number"
                                placeholder="Your fees"
                                {...register("fees", { required: true })}
                            />
                            {errors.fees && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>
                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Speciality</p>
                            <select
                                className="border rounded px-3 py-2"
                                {...register("speciality")}
                            >
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Education</p>
                            <input
                                className="border rounded px-3 py-2"
                                type="text"
                                placeholder="Education"
                                {...register("degree", { required: true })}
                            />
                            {errors.degree && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Address</p>
                            <input
                                {...register("address1", { required: true })}
                                className="border rounded px-3 py-2"
                                type="text"
                                placeholder="Address 1"
                            />
                            {errors.address1 && <span className="text-red-500">This field is required</span>}
                            <input
                                {...register("address2")}
                                className="border rounded px-3 py-2"
                                type="text"
                                placeholder="Address 2"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col mt-3">
                    <p>About Doctor</p>
                    <textarea
                        className="border rounded px-3 py-2"
                        placeholder="Doctor's description"
                        {...register("about", { required: true })}
                    />
                    {errors.about && <span className="text-red-500">This field is required</span>}
                </div>
                <button type="submit" className="border px-8 mb-5 py-2 bg-blue-600 text-white rounded-full mt-6 hover:bg-blue-700">Add Doctor</button>
            </div>
        </form>
    );
};