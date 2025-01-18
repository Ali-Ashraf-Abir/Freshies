import React, { useContext, useEffect, useState } from 'react'
import FoodCard from '../FoodCard/FoodCard'
import { AuthContext } from '../ContextApi/ContextApi'
export default function Category() {


    const [active, setActive] = useState('Fast Food')

    const { foodData, loading, setLoading } = useContext(AuthContext)
    const activeCss = 'underline font-bold text-blue-400 pointer'

    const handleActive = (current) => {

        setActive(current)


    }
    console.log(foodData)

    useEffect(() => {
        { foodData ? setLoading(false) : setLoading(true) }
        if (setLoading == true) {
            return <span className="loading loading-dots loading-lg"></span>
        }
    }, [])
    return (
        <div>

            <div className="flex justify-between items-center text-[4vw] lg:text-[1.5vw] font-nunito pt-[5vh] pb-[2vh] lg:py-[2vh] px-[1.5vw] border-b-2 shadow max-w-[1920px] mx-auto">
                <div onClick={() => handleActive('Fast Food')} className={`${active == 'Fast Food' ? activeCss : ''} cursor-pointer`}>
                    <p>Fast Food</p>
                </div>
                <div onClick={() => handleActive('Sea Food')} className={`${active == 'Sea Food' ? activeCss : ''} cursor-pointer`}>
                    <p>Sea Food</p>
                </div>
                <div className="lg:min-w-[6vw] min-w-[10vw]">
                    <p></p>
                </div>
                <div onClick={() => handleActive('Cusine')} className={`${active == 'Cusine' ? activeCss : ''} cursor-pointer`}>
                    <p>Cusine</p>
                </div>
                <div onClick={() => handleActive('Drinks')} className={`${active == 'Drinks' ? activeCss : ''} cursor-pointer`}>
                    <p>Drinks</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mt-4 max-w-[1920px] mx-auto">
                {foodData?.filter(food => food.type == active).map(food => <FoodCard food={food}></FoodCard>)}
            </div>



        </div>
    )
}
