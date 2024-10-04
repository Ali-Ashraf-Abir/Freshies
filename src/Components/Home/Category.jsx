import React, { useState } from 'react'

export default function Category() {


    const [active,setActive]=useState('FastFood')

    const activeCss='underline font-bold text-yellow-400 pointer'

    const handleActive=(current)=>{

        setActive(current)


    }



  return (
    <div>

        <div className="flex justify-between items-center text-[4vw] lg:text-[1.5vw] font-nunito pt-[5vh] pb-[2vh] lg:py-[2vh] px-[1.5vw] border-b-2 shadow">
            <div onClick={()=>handleActive('FastFood')} className={`${active=='FastFood'?activeCss:''} cursor-pointer`}>
                <p>Fast Food</p>
            </div>
            <div onClick={()=>handleActive('SeaFood')} className={`${active=='SeaFood'?activeCss:''} cursor-pointer`}>
                <p>Sea Food</p>
            </div>
            <div className="lg:min-w-[6vw] min-w-[10vw]">
                <p></p>
            </div>
            <div onClick={()=>handleActive('Cusine')} className={`${active=='Cusine'?activeCss:''} cursor-pointer`}>
                <p>Cusine</p>
            </div>
            <div onClick={()=>handleActive('Drinks')} className={`${active=='Drinks'?activeCss:''} cursor-pointer`}>
                <p>Drinks</p>
            </div>
        </div>



    </div>
  )
}
