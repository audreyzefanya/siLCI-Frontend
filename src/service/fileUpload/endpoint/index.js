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