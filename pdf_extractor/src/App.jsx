
import Home from './components/Home'

function App() {
  
  


  return (
    <>
       <div className=' h-auto p-10 w-full  bg-gradient-to-r from-rose-100 to-teal-100 flex flex-col items-center py-24 gap-20'>
       <h2 className='text-2xl mt-0 font-extrabold bg-gradient-to-l from-red-400 to-blue-700 bg-clip-text text-transparent leading-normal absolute left-10 top-7'>Invoice Intelligence</h2>

        <div className="flex flex-col text-center">
        <h1 className="text-6xl  font-extrabold bg-gradient-to-l from-pink-400 to-blue-700 bg-clip-text text-transparent leading-normal">
       Transform Your Invoices into Insights!
      </h1>  
      <h2 className='text-xl mt-0 font-extrabold bg-gradient-to-l from-sky-400 to-blue-800 bg-clip-text text-transparent leading-normal'>Invoice Intelligence: Know Your Numbers, Know Your Business...</h2>

        </div>
               <div className="flex w-full itmes-center justify-center">
    <Home/>
    </div>
    </div>
     
    </>
  )
}

export default App
