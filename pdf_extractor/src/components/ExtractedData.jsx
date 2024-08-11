import React from 'react'

const ExtractedData = ({textFormat, jsonFormat}) => {
  const handleJsonCopy=()=>{
    navigator.clipboard.writeText(JSON.stringify(jsonFormat.data));
  }
  const handleTextCopy=()=>{
    navigator.clipboard.writeText(textFormat);
  }
  return (
    <div className='flex flex-col md:flex-row md:flex md:justify-around  w-80% md:w-full justify-center gap-5 '>
           
    {textFormat && 
    <div className="flex flex-col w-full gap-3">
      <span className='text-lg bg-gray-100 px-2 font-serif border-sky-300 border-2 w-14 rounded-xl'>Text</span>
        <div className="flex flex-col items-start relative break-words h-auto p-10 text-wrap w-full bg-gray-100 rounded-2xl">
    <div className='break-words w-full'>
  <h3>Customer Details :</h3>
  <pre ><div className='whitespace-pre-wrap'>{textFormat.customerDetails}</div></pre>
</div>
    <div className="section">
      <h3>Products :</h3>
      <pre>{textFormat.products}</pre>
    </div>
    <div className="section">
      <h3>Total Amount :</h3>
      <pre>{textFormat.totalAmount}</pre>
    </div>
    <button type="button" onClick={handleTextCopy} className="text-white h-10 absolute bottom-5 right-10 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Copy</button>

        </div>
  </div>}

    
   {jsonFormat &&  
   <div className="flex flex-col w-full gap-3">
     <span className='text-lg bg-gray-100 px-2 font-serif border-sky-300 border-2 w-14 rounded-xl'>Json</span>
    <div className='flex h-auto p-10 relative  w-full bg-gray-100 rounded-2xl'>
    <div>
     
      <pre>{JSON.stringify(jsonFormat.data, null, 2)}</pre>
    </div>
    <button type="button" onClick={handleJsonCopy} className="text-white h-10 absolute bottom-5 right-10 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Copy</button>

    </div>
   </div>
    }
    </div>
  )
}

export default ExtractedData