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

export const PostAddBarang = async (dataBarang) => {
    try {
        const response = await BarangManagementService.post('api/barang/create', dataBarang);
        return response.data;
    } catch (error) {
        console.error('Error adding warehouse:', error);
        throw error;
    }
}

// export const UpdateBarang = async (id_barang) => {
//     try {
//         const response = await BarangManagementService.put('/api/barang/update/'+ id_barang);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// }

export const UpdateBarang = async (id_barang, updateData) => {
    try {
        const response = await BarangManagementService.put('/api/barang/update/'+ id_barang, updateData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        // Melakukan re-throw error agar bisa ditangkap dan dihandle di komponen
        throw error;
    }
}

