import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { GetDetailPerusahaan, PostAddBarangImpor } from '../../../../service/perusahaanimpor/endpoint';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';
import Header from '../../../../components/header';
import { useParams } from 'react-router-dom';
import { GetAllBarang } from '../../../../service/barang/endpoint';
import DropdownText from '../../../../components/dropdown/dropdownText';
import ModalResult from '../../../../components/modal/modalResult';
import Sidebar from '../../../../components/sidebar/adminperusahaan';

const AddBarangPerusahaan = (props) => {
    const { id_perusahaan } = useParams()
    const [daftarBarang, setBarang] = useState([])
    const [perusahaan, setPerusahaan] = useState([])
    const [choosenBarang, setChoosenBarang] = useState("")
    const [isModalOpenResult, setIsModalOpenResult] = useState(false)
    const [dataSubtitleModal, setDataSubtitleModal] = useState("")
    const [flagResult, setFlagResult] = useState("success")
    const navigateTo = useNavigate()

    useEffect(() => {
        getAllBarang()
        getDetailPerusahaan()
    })

    async function getAllBarang() {
        try {
            const barangData = await GetAllBarang(); 
            setBarang(barangData)
        } catch (error) {
            console.error('Error fetching barang data:', error);
        }
    }

    async function getDetailPerusahaan() {
        try {
            const perusahaanData = await GetDetailPerusahaan(id_perusahaan); 
            setPerusahaan(perusahaanData)
        } catch (error) {
            console.error('Error fetching perusahaan data:', error);
        }
    }

    function handleToDaftarBarang() {
        setTimeout(() => {
            navigateTo(`/admin-perusahaan/perusahaan/${id_perusahaan}`);
        }, 500);
    }   

    function handleOpenModalResult(type, subtitle) {
        setTimeout(() => {
            setFlagResult(type)
            setDataSubtitleModal(subtitle)
            setIsModalOpenResult(true)
            setTimeout(() => {
                setIsModalOpenResult(false)
            }, 1000);
        }, 100);
    }

    async function handlePostBarang() {
        if (choosenBarang) {
            try {
                var response = await PostAddBarangImpor(choosenBarang, id_perusahaan);
                handleOpenModalResult("success", "Barang berhasil ditambahkan");
                setTimeout(() => {
                    handleToDaftarBarang()
                }, 1000);
            } catch (error) {
                if (error.request && error.request.status === 404) {
                    handleOpenModalResult("failed", "ID Barang tidak ditemukan");
                } else {
                    handleOpenModalResult("failed", error.response.data.message);
                }
            }
        } else {
            handleOpenModalResult("failed", "Tolong pilih salah satu barang.");
        }
    }

  return (
    <div className='flex w-screen h-screen'>
        <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
        <div className='w-full h-screen flex flex-col'>
            <Header title={perusahaan.nama}/>
            <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-3 px-8'>
                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-md drop-shadow-md p-4 mb-4">
                        <DropdownText
                            title="Select Barang"
                            options={daftarBarang.map(barang => barang.nama)}
                            optionsValue={daftarBarang.map(barang => barang.id)}
                            placeholder="Pilih Barang Yang Ingin Ditambahkan"
                            onSelect={setChoosenBarang}
                        />
                        <br></br><br></br>
                        <button onClick={handlePostBarang} className="bg-primary500 text-white py-2 px-4 rounded-md">Tambah</button>
                    </div>
                </div>
            </div>
        </div>
        <ModalResult
            subtitle={dataSubtitleModal}
            type={flagResult}
            isOpen={isModalOpenResult}
        />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBarangPerusahaan);
