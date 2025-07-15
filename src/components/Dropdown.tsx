import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';


const Dropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([])
  const [claimLoading, setClaimLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  // should fetch the users list on Dropdown mounting
  useEffect(()=>{
    async function fetchUsers(){
      const res = await fetch("https://rayyan-alam-3w.onrender.com/api/v1/users", {
        method : 'GET'
      })
      const users_data = await res.json()
      console.log(users_data.users)
      setUsers(users_data.users)
    }
    fetchUsers()
  },[])

  
  
  const handleUserClaim = async (userId : string) => {
    setIsOpen(false)
    // send the claim call to te backend
    setClaimLoading(true)
    try{
      
      await fetch("https://rayyan-alam-3w.onrender.com/api/v1/claimPoints", {
        method : 'POST',
        headers : {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({userId : userId})
      })
      setClaimLoading(false)
      // go back to the home page
      window.location.reload()
    }catch(e){
      console.log("Error occured " + e)
      return
    }finally{
      setClaimLoading(false)
    }
    
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='pt-20 bg-gradient-to-b '> 
    <div className="w-full sm:w-1/2 md:max-w-1/3 mx-auto mt-10 rounded-lg flex flex-col gap-2 md:flex-row justify-between items-center border-blue-800 p-6 bg-gradient-to-r from-blue-700 via- to-cyan-900">
      
      <div className="relative w-full md:w-3/4">
        {/* Dropdown Button */}
        <button
          onClick={toggleDropdown}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-700 border border-gray-300 rounded-lg shadow-sm hover:border-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors focus:text-white"
        >
          <span className=' text-gray-300 text-sm md:text-md'>
            Select user to claim
          </span>
          <ChevronDown 
            className={`w-5 h-5 text-gray-200 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-gray-300 border border-gray-100 rounded-lg shadow-lg max-h-60 overflow-auto">
            {users.length!=0 && users.map((user : User) => (
              <>
              <div className='flex justify-between px-10 items-center hover:bg-gray-400 py-3 '>
                <div className=' text-gray-900 text-sm md:text-md'>{user.username}</div>
                <button
                  disabled={claimLoading}
                  onClick={()=>handleUserClaim(user._id)} 
                  className='border-gray-800 border-1 bg-gray-600 px-2 py-1 rounded-lg text-gray-200 text-sm md:text-md font-semibold hover:text-black hover:bg-gray-100 cursor-pointer'>
                  Claim Points
                </button>
              </div>
              </>
            ))}
          </div>
        )}
      </div>

      <div className=''>
        <button 
          className='bg-emerald-700 text-gray-100 text-md px-4 py-2 border-gray-800 rounded-lg cursor-pointer hover:border-black hover:bg-gradient-to-b hover:from-emerald-300  hover:to-emerald-700 transition-colors delay-100 text-sm md:text-md'
          onClick={()=>navigate('/add-user')}
        >
          Add User
        </button>
      </div>
    </div>
    </div>
  );
};

export default Dropdown;