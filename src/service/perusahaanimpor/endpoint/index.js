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

export const GetBarangPerusahaanImpor = async () => {
    try {
        // Assuming company ID is stored in localStorage
        const userCompanyId = localStorage.getItem('userCompanyId');

        const response = await PerusahaanImporService.get('all'); // Fetch all companies
        if (!response.data) return [];

        // Filter data to only include the barang of the user's company
        const filteredData = response.data.filter(perusahaan => perusahaan.id === userCompanyId);

        return filteredData;
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

// Increase Status of Pengadaan
export const IncreaseStatusPengadaan = async (pengadaan_id) => {
    try {
        const response = await PerusahaanImporService.put(`request/${pengadaan_id}/status`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Get Detail Pengadaan
export const GetDetailPengadaan = async (pengadaan_id) => {
    try {
        const response = await PerusahaanImporService.get(`request/detail/${pengadaan_id}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Reject Pengadaan
export const RejectPengadaan = async (pengadaan_id) => {
    try {
        const response = await PerusahaanImporService.put(`request/${pengadaan_id}/reject`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const GetAllPengadaan = async () => {
    try {
        const response = await PerusahaanImporService.get(`request/all/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const GetAllPengadaanAdminImpor = async (id) => {
    try {
        const response = await PerusahaanImporService.get(`request/all/` + id);
        return response.data;
    } catch (error) {
        throw error;
    }
}









