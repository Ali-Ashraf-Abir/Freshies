import React from 'react'

export default function Banner() {
  return (
        <div className="">
            <div className="relative max-w-[1920px] mx-auto">
        
            <div className="w-[100%] h-[80vh] bg-fit text-center bg-[url('https://images.unsplash.com/photo-1546724867-3b2dabdbc5b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
                    <div className="w-[100%] h-[80vh] bg-[rgb(0,0,0,0.5)] flex flex-col justify-center items-center gap-2">
                    <div className="text-[5vh] text-yellow-400 font-nunito ">
                              Explore All The Amazing Dishes
                            </div>
                            <div className="text-[2vh] text-yellow-400 font-nunito">
                                A place where food brings joy right at your doorsteps!
                            </div>

                            <div className="text-[3vh] text-green-400 border-2 rounded-lg  shadow py-4 px-3 mt-[2vh]">
                               Explore Now
                            </div>
                    </div>
            </div>

            <div className='text-[5vw] lg:text-[3vw] shadow-lg w-fit mt-5 absolute left-[25vw] lg:left-[35vw] top-[76vh] lg:top-[73vh] bg-[rgb(255,255,255,.8)] font-nunito px-5'>Explore The Diversity</div>
            </div>


        </div>
  )
}
