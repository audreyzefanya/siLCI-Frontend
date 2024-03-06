import GudangManagementService from "../detailgudangService";

export const fetchDetailGudang = async (id_gudang) => {
    try {
        const response = await GudangManagementService.get('/api/gudang/barang-gudang/+ id_gudang/detail');
        return response.data;
    } catch (error) {
        console.log("Error fetching detail gudang:", error);
        throw error;
    }
}