import PerusahaanImporService from "../perusahaanimporService";

// [-----------Perusahaan Impor Management-----------]
// Get Daftar Perusahaan
export const GetPerusahaan = async () => {
    try {
        const response = await PerusahaanImporService.get('all');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const GetBarangPerusahaanImpor = async (id_perusahaan) => {
    try {
        const response = await PerusahaanImporService.get(id_perusahaan);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const GetDetailPerusahaan = async (id_perusahaan) => {
    try {
        const response = await PerusahaanImporService.get('detail/' + id_perusahaan);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const PostAddBarangImpor = async (id_barang, id_perusahaan) => {
    try {
        const response = await PerusahaanImporService.put(id_perusahaan, {
            'id': id_barang,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const PostCreatePengadaan = async (dataPengadaan) => {
    try {
        const response = await PerusahaanImporService.post('barang/request', dataPengadaan);
        return response.data;
    } catch (error) {
        throw error;
    }
}