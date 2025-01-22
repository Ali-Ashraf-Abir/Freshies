import React, { useContext, useState } from 'react'
import { AuthContext } from '../ContextApi/ContextApi'
import Swal from 'sweetalert2';

export default function MyItems() {

    const { foodData, setLoading, userData, setAction } = useContext(AuthContext) || {}
    // contains the imagebb url that came after uploading in the fetch promise
    const [foodImage, setFoodImage] = useState(null)
    // contains the image data that the user has selected from his pc to send back in the image bb
    const [imageData, setImageData] = useState(null)
    // for url image update
    const [imageUrl, setImageUrl] = useState(null)


    const handleSubmitFood = async (event) => {

        event.preventDefault()

        // for uploading image to imagebb using api
        if (imageData != null) {
            await fetch(`https://api.imgbb.com/1/upload?key=b590afab33d9f99a8d478e69992a0703`, {
                method: 'POST',
                body: imageData

            })
                .then(res => res.json())
                .then(data => {
                    setFoodImage(data.data.url)
                    console.log(data.data.url)
                })
        }



        const form = event.target
        const foodName = form.name.value
        const foodPrice = form.price.value
        const foodDescription = form.description.value
        const url = form.url.value
        const id = form.id.value
        let imageUrl = null
        { imageData ? imageUrl = foodImage : imageUrl = url }

        let foodData = {

            foodName, foodPrice, foodDescription, imageUrl,id
        }
        const filteredFoodData = Object.entries(foodData).reduce((acc, [key, value]) => {
            if (value !== '') {
                acc[key] = value;
            }
            return acc;
        }, {});
        console.log(filteredFoodData)


        fetch('https://freshies-server.vercel.app/editfood', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(filteredFoodData),
        })
        alert("food edited!");
        setFoodImage(null)
        setAction(true)
        form.reset()




    }

    // to get the image url from the computer
    const handleImageUpload = (event) => {
        const formData = new FormData();
        const img = event.target.files[0]
        formData.append('image', img)
        setImageData(formData)


    }



    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://freshies-server.vercel.app/foods/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => console.log(data))
                setAction(true)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });


    }

    if (foodData == null) {
        setLoading(true)
        return <span className="loading loading-dots loading-lg"></span>
    }


    return (
        <div className='w-[80%] lg:w-[100%]'>

            <table className="table ">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {foodData?.filter(food => food.restaurant == userData?.businessName).map(food => <tr>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                            src={food.imageUrl}
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">{food.foodName}</div>
                                    <div className="text-sm opacity-50">{food.restaurant}</div>
                                </div>
                            </div>
                        </td>
                        <td className='w-[40%]'>
                            {food.foodDescription.slice(0, 30)}....
                            <br />

                        </td>
                        <td>{food.foodPrice} Taka</td>
                        <th className='flex gap-4 flex-col lg:flex-row'>
                            <button onClick={() => handleDelete(food._id)} className="btn btn-ghost bg-red-400 btn-xs">Delete</button>
                            {/* edit buttons for modals */}
                            <div className="">
                                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                <button className="btn" onClick={() => document.getElementById(food._id).showModal()}>Edit</button>
                                <dialog id={food._id} className="modal">
                                    <div className="modal-box w-11/12 max-w-5xl">
                                        <h3 className="font-bold text-lg">Enter The Details</h3>

                                        {/* details inside the modal forms */}
                                        <div className="py-4">
                                            <div className="">

                                                <form defaultValue={food} onSubmit={handleSubmitFood}>
                                                    <div className="flex justify-center items-center flex-col lg:flex-row gap-5">
                                                        <div className="">
                                                            <label className="form-control w-full max-w-xs">
                                                                <div className="label">
                                                                    <span className="label-text">Name Of The Food</span>

                                                                </div>
                                                            </label>
                                                            <input name='name' type="text" placeholder={food.foodName} className="input input-bordered w-full max-w-xs" />
                                                            <input value={food._id} name='id' type="text" placeholder={food._id} className="input input-bordered w-full max-w-xs hidden" />


                                                            <label className="form-control w-full max-w-xs">
                                                                <div className="label">
                                                                    <span className="label-text">Price</span>
                                                                </div>
                                                                <input name='price' type="number" placeholder={food.foodPrice} className="input input-bordered w-full max-w-xs" />
                                                            </label>

                                                            <label className="form-control w-full max-w-xs">
                                                                <div className="label">
                                                                    <span className="label-text">Description</span>
                                                                </div>
                                                                <textarea

                                                                    name='description'
                                                                    placeholder={food.foodDescription}
                                                                    className="textarea textarea-bordered textarea-lg w-full max-w-xs"></textarea>
                                                            </label>

                                                            <label className="form-control w-full max-w-xs">
                                                                <div className="label">
                                                                    <span className="label-text">Image url</span>
                                                                </div>
                                                                <input name='url' type="text" placeholder={food.imageUrl} className="input input-bordered w-full max-w-xs" />
                                                            </label>
                                                            <div className="text-[2vh] text-center pt-[2vh]">
                                                                <p>or</p>
                                                            </div>
                                                        </div>

                                                        <div className="">
                                                            <label className='label'>Upload Food Image</label>
                                                            <input onChange={handleImageUpload} name='image' type="file" className="file-input file-input-bordered w-full max-w-xs" />
                                                        </div>
                                                    </div>

                                                    {/* for finalizing the form (submit button) */}

                                                    <div className="w-full text-center mt-4">
                                                        <button className='btn btn-primary'>Edit Food</button>
                                                    </div>



                                                </form>
                                            </div>


                                        </div>



                                        <div className="modal-action">
                                            <form method="dialog">
                                                {/* if there is a button, it will close the modal */}
                                                <button className="btn">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        </th>

                    </tr>)}
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th>Name</th>
                        <th>Desciption</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}
