import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../ContextApi/ContextApi'
import { loadStripe } from '@stripe/stripe-js';
export default function Cart() {

    const { userData, setItemsAdded, setAction } = useContext(AuthContext) || {}

    useEffect(() => {
        setItemsAdded(false)
    }, [])

    //  to handle the deleting mechanism of the cart
    const handleCartDelete = (_id, food) => {

        fetch(`http://localhost:5000/cartDelete/${_id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(food)
        })
        console.log(food)
        setAction(true)

    }

    const [bill, setBill] = useState(0)


    // To get the total price of items in the cart
    useEffect(() => {
        const totalFoodPrice = userData?.cart?.reduce((sum, item) => {
            // Check if item status is 'paid'
            if (item.status === 'paid') {
                return sum; // Skip paid items
            }
            return sum + (item.foodPrice * (1 || 0)); // Add price of unpaid items
        }, 0); // Start with an initial sum of 0

        setBill(totalFoodPrice || 0); // Ensure that bill is always a number
    }, [userData]); // No need to inclu


    // for the stripe payment
    const handleStripe = async () => {

        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_API)
        const unpaidProducts=userData?.cart?.filter(cart=>cart.status!='paid')
        const body = {
            products: unpaidProducts,
            userData: userData
        }

        fetch(`http://localhost:5000/checkOut`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data=>stripe.redirectToCheckout({
                sessionId:data.id
            }))

    }



    return (
        <div>
            <div className="w-full text-center font-nunito  text-[2.8vh] font-semibold">Your Orders</div>
            <div className="border-2 shadow max-w-[1024px] mx-auto p-4 font-nunito text-[1.4vh] lg:text-[1.8vh] flex min-h-[70vh] flex-col mt-6 mb-4">
                <div className='grid grid-cols-4 mb-4 mt-4 text-[1.8vh] lg:text-[2.2vh] border-b-2 border-gray-200 gap-4 items-center'>

                    <div className="">Name</div>
                    <div className="">Price</div>
                    <div className="">status</div>





                </div>
                {userData?.cart?.map(item => item.status == 'paid' ? "" : <div className='grid grid-cols-4 mb-4 mt-4 border-b-2 border-gray-200 gap-4 items-center pb-2 font-semibold'>

                    <div className="">{item.foodName} x <sub>{item.quantity}</sub> </div>
                    <div className="">{item.foodPrice} Taka</div>

                    <div className="badge badge-primary">{item.status}</div>
                    <div onClick={() => handleCartDelete(item.foodName, item)} className="bg-yellow-200 text-center lg:w-[40%] py-4 rounded-lg cursor-pointer">Cancel</div>



                </div>)}


                {userData?.cart?.length > 0 ? <div className="grid grid-cols-4 mb-4 mt-4 border-gray-200 gap-4 items-center pb-2 font-semibold float-bottom items-end">

                    <div className="text-[2vh]">Total:</div>
                    <span className='pr-[4vh] text-[2vh]'>{bill}</span>
                    <div className=""></div>
                    <div className=""><button onClick={handleStripe} className='btn lg:w-[40%] bg-green-200'>Pay</button></div>

                </div> : ''}
            </div>

            <div className="max-w-[1024px] mx-auto p-4 font-nunito text-[1.4vh] lg:text-[2vh] flex justify-between mt-6 mb-4">

            </div>
        </div>
    )
}
