import React from 'react';

const HeaderTable = ({
    dataHeader = ["CLIENT NAME", "DIVISION", "PIC", "CONTACT", "TYPE", "STATE"]
}) => {
  return (
    <thead>
        <tr>
            {dataHeader.map((value, index) => (
                <th key={index} className="z-0 py-3.5 px-4 bg-neutral40 text-neutral500 text-sm font-semibold text-left">
                    <p>{value.toUpperCase()}</p>
                </th>
            ))}
        </tr>
    </thead>
  );
};

export default HeaderTable;