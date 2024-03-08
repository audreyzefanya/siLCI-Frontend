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
        }

export const GetPabrik = async (pabrik_name) => {
    try {
        const response = await PabrikService.get(pabrik_name);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const GetBarangPabrik = async (pabrik_name) => {
    try {
        const response = await PabrikService.get('barang/' + pabrik_name);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const PostAddBarangPabrik = async (id_barang, pabrik_name) => {
    try {
        const response = await PabrikService.post('barang/' + pabrik_name, {
            'id': id_barang,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const PostAddPabrik = async (dataPabrik) => {
    try {
        const response = await PabrikService.post('create', dataPabrik);
        return response.data;
    } catch (error) {
        console.error('Error adding warehouse:', error);
        throw error;
    }
}