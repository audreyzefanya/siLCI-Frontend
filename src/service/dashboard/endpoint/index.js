import DashboardService from "../dashboardService";

export const GetDashboardStafPengadaan = async () => {
    try {
        const response = await DashboardService.get('api/barang/dashboard/stafpengadaan');
        return response.data;
    } catch (error) {
        console.error('Error Mengambil Data Dashboard Staf Pengadaan:', error);
        throw error;
    }
}

export const GetDashboardAdminImpor = async (id) => {
    try {
        const response = await DashboardService.get('api/barang/dashboard/adminimpor/' + id);
        return response.data;
    } catch (error) {
        console.error('Error Mengambil Data Dashboard Staf Pengadaan:', error);
        throw error;
    }
}