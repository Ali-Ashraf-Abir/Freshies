import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../ContextApi/ContextApi'

export default function FoodCard({ food }) {


    const { userData,setItemsAdded,setAction } = useContext(AuthContext)
    const [value, setValue] = useState(1);  // Default value is 50
    const [price,setPrice]=useState()

    // Step 2: Create an event handler to handle the slider value change
    const handleSliderChange = (event) => {
        setValue(event.target.value);  // Update the state with the new value

        
        
    }

    const totalPrice=price*value
  




    // for putting items into user food cart
    const handleFoodCartOrder = (_id) => {


        const foodData = {
            foodName: food?.foodName, foodPrice: totalPrice, quantity: value, userId: userData?._id,restaurant:food?.restaurant,status:'pending',foodId:_id
        }
        fetch(`http://localhost:5000/cart/${_id}`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(foodData),
        })
        alert('food ordered check cart!')
        setItemsAdded(true)
        setAction(true)

    }
    const handlePriceInit=(price)=>{
        setPrice(price)
    }

    return (
        <div className='flex justify-center items-center font-nunito'>
            <div className="card bg-base-100 w-96 shadow-xl w-[full] ">
                <figure>
                    <img className='max-h-[350px]'
                        src={food.imageUrl
                        }
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{food.foodName}</h2>
                    <p className='bg-gray-200 w-[25%] lg:w-[30%] text-center text-[1.7vh] font-bold'>{food.restaurant}</p>
                    <p>{food.foodDescription}</p>
                    <p className='bg-green-200 w-[25%] lg:w-[30%] text-center text-[2vh] font-bold'>{food.foodPrice} Taka</p>

                    <div className="card-actions justify-end">
                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn" onClick={() => {document.getElementById(food?._id).showModal(); handlePriceInit(food.foodPrice)}}>open modal</button>
                        <dialog id={food?._id} className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-lg">{food.foodName}</h3>

                                <input
                                    type="range"            // Slider input type
                                    min="1"                 // Minimum value of slider
                                    max="10"               // Maximum value of slider
                                    value={value}           // Bind the value to the state
                                    onChange={(event)=>{handleSliderChange(event,food.foodPrice)}}  // Update the value on change
                                />

                                {/* Display the current slider value */}
                                
                                <p>Current Value: {value}</p>
                                <p>Total Price: {totalPrice} Taka</p>
                                <button onClick={()=>handleFoodCartOrder(food._id)} className='btn bg-yellow-400'>Order Now</button>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    )
}
