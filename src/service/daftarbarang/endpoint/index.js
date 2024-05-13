import BarangManagementService from "../daftarbarangService";


export const GetDaftarBarang = async () => {
    try {
        const response = await BarangManagementService.get('/api/barang/all');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const GetDetailBarang = async (id_barang) => {
    try {
        const response = await BarangManagementService.get('api/barang/detail/' + id_barang);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const PostAddBarang = async (formData) => {
    try {
        const response = await BarangManagementService.post('/api/barang/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding item:', error);
        throw error;
    }
}

export const UpdateBarang = async (id_barang, formData) => {
    try {
        const response = await BarangManagementService.put('/api/barang/update/'+ id_barang, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding item:', error);
        throw error;
    }
}