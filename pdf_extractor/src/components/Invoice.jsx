import React, { useState } from 'react'
import ExtractedData from './ExtractedData';

const Invoice = ({details}) => {
   
    const parseInvoiceData = () => {
     
      const textFormat = {};
      const jsonFormat = {};
    // Extract Text Format
    const textMatch = details.match(/\*\*Text Format:\*\*([\s\S]*?)\*\*JSON Format:\*\*/);
    console.log("Text match:", textMatch);
    if (textMatch) {
      const textContent = textMatch[1].trim();
      console.log("Text content:", textContent);

      // Extract Customer Details
      const customerMatch = textContent.match(/\*\*Customer Details:\*\*([\s\S]*?)\*\*Products:/);
      console.log("Customer match:", customerMatch);
      if (customerMatch) {
        textFormat.customerDetails = customerMatch[1]
          .replace(/\*\s?/g, '') // Remove leading asterisks and any spaces
          .trim()
          .split('\n') // Split lines
          .map(line => line.trim())
          .filter(line => line); // Remove empty lines
      }

      // Extract Products
      const productsMatch = textContent.match(/\*\*Products:\*\*([\s\S]*?)\*\*Total Amount:/);
      console.log("Products match:", productsMatch);
      if (productsMatch) {
        textFormat.products = productsMatch[1]
          .replace(/\*\s?/g, '') // Remove leading asterisks and any spaces
          .trim()
          .split('\n')
          .map(line => line.trim())
          .filter(line => line); // Remove empty lines
      }

      // Extract Total Amount
      const totalMatch = textContent.match(/\*\*Total Amount:\*\*([\s\S]*)/);
      console.log("Total match:", totalMatch);
      if (totalMatch) {
        textFormat.totalAmount = totalMatch[1].replace(/\*\s?/g, '').trim();
      }
    }
    
      // Extract JSON Format
      const jsonMatch = details.match(/```json([\s\S]*?)```/);
      console.log("JSON match:", jsonMatch);
      if (jsonMatch) {
        try {
          jsonFormat.data = JSON.parse(jsonMatch[1].trim());
        } catch (error) {
          console.error("Failed to parse JSON:", error);
        }
      }
    
      console.log("Parsed data:", { textFormat, jsonFormat });
      // setTextFormat(textFormat);
      // setJsonFormat(jsonFormat);
     
      return { textFormat, jsonFormat };
    }
    
      
const {textFormat, jsonFormat} = parseInvoiceData(details);

console.log(details,"details after function calling");


  return (
    <div className='flex flex-col items-center w-1/2  md:w-full justify-center gap-5 '>
  {details && <ExtractedData textFormat={textFormat} jsonFormat={jsonFormat}/> }

    </div>
      )
}

export default Invoice