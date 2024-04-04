import FileUploadService from "../fileUploadService";

export const CreatePerusahaanImpor = async (dataPerusahaan) => {
    try {
        const response = await FileUploadService.post('barang/perusahaan/create', dataPerusahaan);
        return response.data;
    } catch (error) {
        console.error('Error Menambahkan Perusahaan:', error);
        throw error;
    }
}

export const uploadInvoice = async (pengadaanId, fileData) => {
    try {
        const response = await FileUploadService.post(`barang/pengadaan/request/upload-invoice/${pengadaanId}`, fileData);
        return response.data;
    } catch (error) {
        console.error('Error uploading invoice:', error);
        throw error;
    }
};

export const uploadPayment = async (pengadaanId, fileData) => {
    try {
        const response = await FileUploadService.post(`barang/pengadaan/request/upload-payment/${pengadaanId}/`, fileData);
        return response.data;
    } catch (error) {
        console.error('Error uploading invoice:', error);
        throw error;
    }
};

export const changePengadaanStatus = async (pengadaanId) => {
    try {
        const response = await FileUploadService.put(`barang/perusahaan/request/${pengadaanId}/status`);
        return response.data;
    } catch (error) {
        console.error('Error changing pengadaan status:', error);
        throw error;
    }
};