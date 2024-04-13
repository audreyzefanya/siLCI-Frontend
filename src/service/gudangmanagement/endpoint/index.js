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

export const getDaftarPengiriman = async (id_gudang) => {
  try {
    const response = await GudangManagementService.get('/api/gudang/permintaanpengiriman/' + id_gudang );
    return response.data;
  } catch (error) {
         console.error('Terjadi kesalahan saat mengambil data:', error);
         throw error;
  }
};

export const updateStatusPengiriman = async (kodePermintaan, newData) => {
    try {
        const response = await GudangManagementService.put(`/api/gudang/statuspengiriman/${kodePermintaan}`, newData);
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

export const updateDetailGudang = async (id_gudang, newData) => {
    try {
        console.log('Sending data:', newData); // Tambahkan ini untuk melihat data yang dikirim
        const response = await GudangManagementService.put('/api/gudang/barang-gudang/update/' + id_gudang + '/', newData);
        if (response && response.data) {
            return response.data;
        } else {
            throw new Error('Gagal memperbarui data gudang.');
        }
    } catch (error) {
        console.error('Error updating status:', error);
        if (error.response && error.response.data) {
            console.error('Error details:', error.response.data);
            alert('Error updating gudang: ' + (error.response.data.detail || error.message));
        } else {
            alert('Error updating gudang: ' + error.message);
        }
        throw error;
    }
}
