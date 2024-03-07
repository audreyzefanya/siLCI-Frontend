import GudangManagementService from "../daftargudangService";

export const fetchDataGudang = async (nama, alamat) => {
    try {
        const response = await GudangManagementService.get('/api/gudang/all', {
            'nama': nama,
            'alamat': alamat,
        });
        return response.data;
    } catch (error) {
        console.log("bs dong")
        throw error;
    }
   }