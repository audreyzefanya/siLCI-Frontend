import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import Sidebar from '../../../components/sidebar/manajer';
import Header from '../../../components/header';
import { useParams } from 'react-router-dom';
import { GetAllBarang } from '../../../service/barang/endpoint';
import DropdownText from '../../../components/dropdown/dropdownText';
import ModalResult from '../../../components/modal/modalResult';
import { PostAddBarangGudang, fetchDetailGudang } from '../../../service/gudangmanagement/endpoint';

const AddBarangGudang = (props) => {
    const { id_gudang } = useParams()
    const [daftarBarang, setBarang] = useState([])
    const [gudang, setGudang] = useState([])
    const [choosenBarang, setChoosenBarang] = useState("")
    const [isModalOpenResult, setIsModalOpenResult] = useState(false)
    const [dataSubtitleModal, setDataSubtitleModal] = useState("")
    const [flagResult, setFlagResult] = useState("success")
    const navigateTo = useNavigate()

    useEffect(() => {
        getAllBarang()
        getDetailGudang()
    }, [])

    async function getAllBarang() {
        try {
            const barangData = await GetAllBarang(); 
            setBarang(barangData)
        } catch (error) {
            console.error('Error fetching barang data:', error);
        }
    }

    async function getDetailGudang() {
        try {
            const gudangData = await fetchDetailGudang(id_gudang); 
            setGudang(gudangData)
        } catch (error) {
            console.error('Error fetching gudang data:', error);
        }
    }

    function handleToDaftarBarang() {
        setTimeout(() => {
            navigateTo(`/manager-operasional/daftar-gudang/${id_gudang}`);
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
                var response = await PostAddBarangGudang(choosenBarang, id_gudang);
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
        <Sidebar currentNavigation={1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
        <div className='w-full h-screen flex flex-col'>
            <Header title={gudang.nama_gudang}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddBarangGudang);
