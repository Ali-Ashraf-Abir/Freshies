import React, { useState } from 'react'

export default function Business() {

  // contains the imagebb url that came after uploading in the fetch promise
  const [foodImage, setFoodImage] = useState()
  // contains the image data that the user has selected from his pc to send back in the image bb
  const [imageData, setImageData] = useState()

  const handleSubmitFood =async (event) => {

    event.preventDefault()

    // for uploading image to imagebb using api
    await fetch(`https://api.imgbb.com/1/upload?key=b590afab33d9f99a8d478e69992a0703`, {
      method: 'POST',
      body: imageData

    })
      .then(res => res.json())
      .then(data => {
        setFoodImage(data.data.url)
      })



    const form = event.target
    const foodName = form.name.value
    const foodPrice = form.price.value
    const foodDescription = form.description.value

    const foodData = {
      foodName, foodPrice, foodDescription, foodImage
    }

    // for uploading data to backend server
      fetch('http://localhost:5000/addfood', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(foodData),
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setFoodImage(null)
        })

        console.log(foodData)
  }

  // to get the image url from the computer
  const handleImageUpload = (event) => {
    const formData = new FormData();
    const img = event.target.files[0]
    formData.append('image', img)
    setImageData(formData)


  }


  return (
    <div>
      <div className="flex justify-around items-center mt-5 border-b-2 border-gray-200 pb-2 lg:w-[60vw] w-[100vw]">
        {/* section for total number of items and add more items button */}
        <div className="text-[2vh]">
          Total Items: { } <span className='text-blue-400 underline'>See All</span>
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
                          <input name='name' type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>


                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Price</span>
                          </div>
                          <input name='price' type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>

                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Descrition</span>
                          </div>
                          <textarea
                            name='description'
                            placeholder="Description"
                            className="textarea textarea-bordered textarea-lg w-full max-w-xs"></textarea>
                        </label>

                      </div>

                      <div className="">
                        <label className='label'>Upload Food Image</label>
                        <input onChange={handleImageUpload} name='image' type="file" className="file-input file-input-bordered w-full max-w-xs" />
                      </div>
                    </div>

                    {/* for finalizing the buttons */}

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
        <div className="lg:w-[80%] w-[100vw] text-center mt-4 text-[3vh] lg:text-[3vh]">
          Orders
        </div>

      </div>

    </div>
  )
}
