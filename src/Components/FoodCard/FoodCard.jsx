import React from 'react'

export default function FoodCard({food}) {


    console.log(food)


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
                    <button className="btn bg-yellow-400">Order Now</button>
                </div>
            </div>
        </div>
        </div>
    )
}
