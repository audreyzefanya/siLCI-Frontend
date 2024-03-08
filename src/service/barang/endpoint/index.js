import BarangService from "../barangService";

// [-----------Barang Management-----------]
// Get Semua Barang
export const GetAllBarang = async () => {
    try {
        const response = await BarangService.get('/api/barang/all');
        return response.data;
    } catch (error) {
        throw error;
    }
}