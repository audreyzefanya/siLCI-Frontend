import GudangManagementService from "../gudangmanagementService";

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

export const fetchDetailGudang = async (id_gudang) => {
  try {
      const response = await GudangManagementService.get(`api/gudang/barang-gudang/detail/${id_gudang}`);
      return response.data;
  } catch (error) {
      throw error;
  }
}