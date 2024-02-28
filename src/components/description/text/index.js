import DOMPurify from 'dompurify';
import React from 'react';


const Description = ({
  title = "Title",
  value = "Description",
  isParseHtml = false,
}) => {
  
  const sanitizeHTML = (htmlString) => {
    return { __html: DOMPurify.sanitize(htmlString) };
  };


  {/* ADDED inline Tailwind */}

  return (
    <div className='w-full'>
      {title && <p className="text-sm font-normal text-black mb-1">{title}</p>}

      {!isParseHtml ? (
        <div className='py-1'>
          <p className='text-black font-medium text-base'>{value}</p>
        </div>
      ) : (
        <div className='py-1 text-black font-medium text-base description-content' dangerouslySetInnerHTML={sanitizeHTML(value)} /> 
      )}
    </div>
  );
};

export default Description;