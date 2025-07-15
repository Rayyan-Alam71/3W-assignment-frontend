import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  // NOTE : only, the name will be used for the db call
  const handleSubmit = async () =>{
    if(name === "" || age === "" || address === "" || phone === ""){
      alert('All fields are required')
      return
    }
    setLoading(true)

    try{
      await fetch("https://rayyan-alam-3w.onrender.com/api/v1/addUser",{
        method : 'POST',
        headers:{
          'Content-type' : 'application/json',
        },
        body : JSON.stringify({username : name})
      })
      navigate('/')
    }catch(e){
      console.log('Error occurred : '+e)
      return
    }finally{
      setLoading(false)
    }

  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f5f5dc] py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-xl p-8 space-y-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Add New User</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              id="age"
              type="number"
              min={10}
              max={99}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />
          </div>
        </div>

        <button
          onClick={()=>handleSubmit()}
          disabled={loading}
          className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-semibold cursor-pointer"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddUser;
