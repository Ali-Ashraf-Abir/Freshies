import React, { useContext, useState } from 'react'
import { AuthContext } from '../ContextApi/ContextApi'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

export default function Business() {

  // contains the imagebb url that came after uploading in the fetch promise
  const [foodImage, setFoodImage] = useState(null)
  // contains the image data that the user has selected from his pc to send back in the image bb
  const [imageData, setImageData] = useState(null)
  // for url image update
  const [imageUrl, setImageUrl] = useState(null)
  // for managing food type
  const [foodType, setFoodType] = useState('Fast Food')
  // for handling status
  const [status,setStatus]= useState('')

  const { userData, action, setAction } = useContext(AuthContext)




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
    let imageUrl = null
    { imageData ? imageUrl = foodImage : imageUrl = url }

    const type = foodType
    const foodData = {
      foodName, foodPrice, foodDescription, imageUrl, type, restaurant: userData?.businessName
    }
    // for uploading data to backend server
    fetch('http://localhost:5000/addfood', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(foodData),
    })
    alert("food added!");
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

  // for handling food type

  const handleFoodType = (type) => {
    setFoodType(type)
  }

  // for handling food status

  const handleStatus=(status,order)=>{
    setStatus(status)

    const statusBody={status,order}

    fetch('http://localhost:5000/statusUpdate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(statusBody),
    })
    .then(res=>res.json())
    .then(data=>data)


    setInterval(() => {
      setAction(true)
    }, 1500);


  }

  return (
    <div>
      <div className="flex justify-around items-center mt-5 border-b-2 border-gray-200 pb-2 lg:w-[60vw] w-[100vw]">
        {/* section for total number of items and add more items button */}
        <div className="text-[2vh]">
          Total Items: { } <span className='text-blue-400 underline'><Link to='/profile/myitems'>See All</Link></span>
        </div>

        <div className="">
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <button className="btn" onClick={() => document.getElementById('my_modal_4').showModal()}>Add New Item</button>
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-lg">Enter The Details</h3>

              {/* details inside the modal forms */}
              <div className="py-4">
                <div className="">

                  <form onSubmit={handleSubmitFood}>
                    <div className="flex justify-center items-center flex-col lg:flex-row gap-5">
                      <div className="">
                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Name Of The Food</span>

                          </div>
                        </label>
                        <input name='name' type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Food Category</span>
                          </div>
                        </label>
                        <select onChange={(e) => handleFoodType(e.target.value)} className='dropdown w-[full] border-2 border-black text-[2vh] lg:text-[2vh] px-[5vw]'>
                          <option>Fast Food</option>
                          <option >Sea Food</option>
                          <option>Cusine</option>
                          <option>Drinks</option>
                        </select>

                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Price</span>
                          </div>
                          <input name='price' type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>

                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Description</span>
                          </div>
                          <textarea
                            name='description'
                            placeholder="Description"
                            className="textarea textarea-bordered textarea-lg w-full max-w-xs"></textarea>
                        </label>

                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Image url</span>
                          </div>
                          <input name='url' type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
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
                      <button className='btn btn-primary'>Add Food</button>
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

      </div>

      <div className="">
        <div className="lg:w-[80%] w-[100vw] text-center mt-4 text-[3vh] lg:text-[4vh]">
          Orders
        </div>
        <div className="flex flex-col justify-center items-center mt-[3vh]">

          <div className='flex justify-between items-center gap-4 w-[90%] mt-[2vh]'>
            <div className=" ">
              <img className='w-[10vw]' src='' alt="" />
            </div>
            <div className="text-[2.5vh] underline font-semibold text-nunito">
              Food Name
            </div>

            <div className="text-[2.5vh] underline font-semibold text-nunito">
              Quantity
            </div>

            <div className="text-[2.5vh] underline font-semibold text-nunito">
              Status
            </div>


          </div>

          {
            userData?.orders?.map(order => <div className='flex justify-between items-center gap-4 w-[90%] mt-[2vh]'>
              <div className=" ">
                <img className='w-[10vw]' src={order.imageUrl} alt="" />
              </div>
              <div className="">
                {order.foodName}
              </div>

              <div className="">
                {order.quantity}
              </div>

              <div className="">
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button className={`btn ${order.status == 'pending' ? 'bg-yellow-400' : order.status == 'preparing' ? 'bg-yellow-200' : order.status == 'out for delivery' ? 'bg-green-200' : order.status == 'delivered' ? 'bg-green-800' : ''}`} onClick={() => document.getElementById(order.UID).showModal()}>{order.status}</button>
                <dialog id={order.UID} className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Please Update The New Status!</h3>
                    <select onChange={(e) => handleStatus(e.target.value,order)} className='dropdown border-2 border-black text-[2vh] lg:text-[2vh] mt-[2vh]'>
                      <option>pending</option>
                      <option>preparing</option>
                      <option>out for delivery</option>
                      <option>delivered</option>
                    </select>

                  </div>
                </dialog>
              </div>


            </div>)
          }


        </div>

      </div>

    </div>
  )
}
