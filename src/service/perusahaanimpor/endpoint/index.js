import PerusahaanImporService from "../perusahaanimporService";

// [-----------Perusahaan Impor Management-----------]
// Get Daftar Perusahaan
export const GetPerusahaan = async () => {
    try {
        const response = await PerusahaanImporService.get('/api/barang/perusahaan/all');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const GetBarangPerusahaanImpor = async (id_perusahaan) => {
    try {
        const response = await PerusahaanImporService.get('api/barang/perusahaan/' + id_perusahaan);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const GetDetailPerusahaan = async (id_perusahaan) => {
    try {
        const response = await PerusahaanImporService.get('api/barang/perusahaan/detail/' + id_perusahaan);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const PostAddBarangImpor = async (id_barang, id_perusahaan) => {
    try {
        const response = await PerusahaanImporService.put('api/barang/perusahaan/' + id_perusahaan, {
            'id': id_barang,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}