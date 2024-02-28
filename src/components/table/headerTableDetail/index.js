const HeaderTableDetail = ({
    dataHeader = ["CAMPAIGN NAME", "CLIENT", "DIVISION", "START DATE", "DUE DATE"]
}) => {
  return (
    <thead>
        <tr>
            {dataHeader.map((value, index) => (
                <th key={index} className="bg-white p-0 text-neutral500 text-sm font-semibold text-left">
                    {
                        index == 0 &&
                        <div className="border border-r-0 border-neutral40 bg-neutral20 rounded-l-lg py-3.5 px-4">
                            <p>{value.toUpperCase()}</p>
                        </div>
                    }
                    {
                        index != 0 && index != dataHeader.length - 1 &&
                        <div className="border-y border-neutral40 bg-neutral20 py-3.5 px-4">
                            <p>{value.toUpperCase()}</p>
                        </div>
                    }
                    {
                        index == dataHeader.length - 1 &&
                        <div className="border border-l-0 border-neutral40 bg-neutral20 rounded-r-lg py-3.5 px-4">
                            <p>{value.toUpperCase()}</p>
                        </div>
                    }
                </th>
            ))}
        </tr>
    </thead>
  );
};

export default HeaderTableDetail;