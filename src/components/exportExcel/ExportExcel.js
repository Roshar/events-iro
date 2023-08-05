import XLSX from 'xlsx'
const ExportExcel = () => {

    const handleOnExport = () => {
        let wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(enrollers)
        XLSX.utils.book_append_sheet(wb, ws, "MySheets");
        XLSX.writeFile(wb, "MyFile.xlsx")
    }
    return ( <>
    
    
    </> );
}

export default ExportExcel;