import React from 'react'
import {FcGoogle} from 'react-icons/fc'

const Oauth = () => {
  return (
    <div>
      <button className=" flex w-full bg-red-600 hover:bg-red-700 px-6 py-2 text-white rounded-sm uppercase font-medium text-sm transition duration-150 ease-in-out items-center justify-center shadow-md hover:shadow-lg active:shadow-lg">
        <FcGoogle  className='text-xl mr-2'/> Continue with Google
      </button>
    </div>
  );
}

export default Oauth