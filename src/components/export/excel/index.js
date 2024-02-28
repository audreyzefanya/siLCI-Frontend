import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import OutlineButton from '../../button/outlinebutton';

const ExportToExcel = ({ dataExport, fileName, title }) => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (dataExport, fileName) => {
        const ws = XLSX.utils.json_to_sheet(dataExport);
        const wb = { Sheets: { switching_biller: ws }, SheetNames: ["switching_biller"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    return (
        <OutlineButton title={title} onClick={() => exportToCSV(dataExport, fileName)}/>
    );
};

export default ExportToExcel