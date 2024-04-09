import PabrikService from "../pabrikService";

// [-----------Perusahaan Impor Management-----------]
// Get Daftar Pabrik
export const GetAllPabrik = async () => {
    try {
        const response = await PabrikService.get('allpabrik');
        return response.data;
            } catch (error) {
                console.log("bs dong")
                throw error;
            }
        };

export const GetPabrik = async (pabrik_name) => {
    try {
        const response = await PabrikService.get(pabrik_name);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllBatchProduksi = async (pabrik_name) => {
    try {
        const response = await PabrikService.get('batch/' + pabrik_name);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const GetBatchProduksi = async (pabrik_name, batch_code) => {
    try {
        const response = await PabrikService.get('batch/' + `${pabrik_name}/` + batch_code);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const GetBarangPabrik = async (pabrik_name) => {
    try {
        const response = await PabrikService.get('barang/' + pabrik_name);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const PostAddBarangPabrik = async (id_barang, pabrik_name) => {
    try {
        const response = await PabrikService.post('barang/' + pabrik_name, {
            'id': id_barang,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//export const PostAddBatchProduksiPabrik = async (pabrik_name) => {
//    try {
//        const response = await PabrikService.post('batch/' + pabrik_name);
//        return response.data;
//    } catch (error) {
//        throw error;
//    }
//};

//export const UpdateAddBatchProduksiPabrik = async (pabrik_name, batch_code) => {
//    try {
//        const response = await PabrikService.put('batch/' + '${pabrik_name}/' + batch_code);
//        if (response && response.data) {
//            return response.data;
//        } else {
//            throw new Error('Gagal memperbarui batch produksi: Data tidak ditemukan dalam respons');
//        }
//    } catch (error) {
//        console.error('Error updating status:', error);
//        throw error;
//    }
//};

export const PostAddPabrik = async (dataPabrik) => {
    try {
        const response = await PabrikService.post('create', dataPabrik);
        return response.data;
    } catch (error) {
        console.error('Error adding warehouse:', error);
        throw error;
    }
};

export const getDaftarPengiriman = async (pabrik_name) => {
  try {
    const response = await PabrikService.get('permintaanpengiriman/' + pabrik_name );
    return response.data;
  } catch (error) {
         console.error('Terjadi kesalahan saat mengambil data:', error);
         throw error;
  }
};

export const updateStatusPengiriman = async (kodePermintaan, newData) => {
    try {
        const response = await PabrikService.put(`statuspengiriman/${kodePermintaan}`, newData);
        if (response && response.data) {
            return response.data;
        } else {
            throw new Error('Gagal memperbarui status pengiriman: Data tidak ditemukan dalam respons');
        }
    } catch (error) {
        console.error('Error updating status:', error);
        throw error;
    }
};