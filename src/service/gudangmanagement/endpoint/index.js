import GudangManagementService from "../gudangmanagementService";

export const fetchDataGudang = async (nama, alamat) => {
    try {
        const response = await GudangManagementService.get('/api/gudang/all', {
            'nama': nama,
            'alamat': alamat,
        });
        return response.data;
    } catch (error) {
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

export const tambahGudang = async (dataGudang) => {
    try {
        const response = await GudangManagementService.post('/api/gudang/create', dataGudang);
        return response.data;
    } catch (error) {
        console.error('Error adding warehouse:', error);
        throw error;
    }
};

export const PostAddBarangGudang = async (id_barang, id_gudang) => {
    try {
        const response = await GudangManagementService.post('/api/gudang/'+ id_gudang, {
            'id': id_barang,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const fetchAllGudang = async () => {
    try {
        const response = await GudangManagementService.get('/api/gudang/all');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addStokGudang = async (dataTambah) => {
    try {
        const response = await GudangManagementService.put('/api/gudang/barang-gudang/update/stok', dataTambah);
        return response.data;
    } catch (error) {
        throw error;
    }
}