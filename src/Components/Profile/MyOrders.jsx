import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../ContextApi/ContextApi'

export default function MyOrders() {
    const { userData, loading } = useContext(AuthContext) || {}
    


    const foods = userData?.cart
    return (


        <div className="max-w-[1920px] mx-auto">
            <section className="bg-gray-100 py-12">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-semibold text-center">Your Food Orders</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {userData?.cart?.filter((food) => food.status != "pending")?.map((food) => (
                            <div
                                key={food._id}
                                className="border rounded-lg shadow-lg overflow-hidden bg-white"
                            >
                                <img
                                    src={food.imageUrl}
                                    alt={food.foodName}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-bold text-xl">{food.foodName}</h3>
                                    <p className="text-gray-600 mb-2">{food.foodDescription}</p>
                                    <p className="text-red-500 font-semibold mb-4">Price: {food.foodPrice}Taka</p>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                        <button className="btn btn-ghost" onClick={() => document.getElementById(food.UID).showModal()}>see tracking details</button>
                                        <dialog id={food.UID} className="modal">
                                            <div className="modal-box text-black">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                </form>
                                                <ul class="steps steps-vertical">
                                                    <li class="step step-primary">Pending</li>
                                                    <li class={`step ${food.status=='preparing'?'step-primary':''}  ${food.status=='out for delivery'?'step-primary':''}  ${food.status=='delivered'?'step-primary':''}` }>Preparning</li>
                                                    <li class={`step ${food.status=='out for delivery'?'step-primary':''}  ${food.status=='delivered'?'step-primary':''}` }>Out For Delivery</li>
                                                    <li class={`step ${food.status=='delivered'?'step-primary':''}`}>Delivered</li>
                                                </ul>
                                            </div>
                                        </dialog>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {userData?.cart?.filter((food) => food.status === "paid").length === 0 && (
                        <p className="text-center text-gray-500 mt-6">No paid orders found.</p>
                    )}
                </div>
            </section>
        </div>
    )


}
