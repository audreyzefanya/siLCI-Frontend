import { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import PrimaryButton from '../../button/primarybutton';
import OutlineButton from '../../button/outlinebutton';
import DangerButton from '../../button/dangerbutton';
import Dropzone from '../../dropzone/uploadfile';
import TextInput from '../../textinput';
import DropdownText from '../../dropdown/dropdownText';
// import { GetAllProvince } from '../../../service/usermanagement/endpoint';

const ModalState = ({
    isOpen = false,
    onClose = () => { },
    title = 'Title Modal',
    subtitle = 'Subtitle Modal',
    isVisibleSubtitle = true,
    type = 'default',
    addition,
    placeholderTextArea,
    onChangeTextArea,
    valueTextArea,
    valueTextInput,
    valueTextDropDown,
    onSelectTextDropDown,
    selectDivision,
    onChangeTextInput,
    placeholderTextInput,
    titleButtonLeft = 'Cancel',
    titleButtonRight = 'Okay',
    leftAction = onClose,
    rightAction = onClose,

    entryId = null,
    
}) => {

    // ADDED VARIABLES
    const [specialPrice, setSpecialPrice] = useState('')
    const [specialPriceDivision, setSpecialPriceDivision] = useState('')
    const [specialPriceClient, setSpecialPriceClient] = useState('')
    const [flagResult, setFlagResult] = useState("success")
    const [dataSubtitleModal, setDataSubtitleModal] = useState("")
    const [isModalOpenResult, setIsModalOpenResult] = useState(false)
    const [dataIndustry, setDataIndustry] = useState([])


    useEffect(() => {
        // handleGetIndustry()
    }, [])

    const cancelButtonRef = useRef(null);

    function handleBackgroundClick(e) {
        e.stopPropagation()
    }

    function handleGetArrayFromApi(data) {
        if (data.length !== 0) {
            var arrayData = []
            for (var i = 0; i < data.length; i++) {
                arrayData.push(data[i].name)
            }
            return arrayData
        }
        else {
            return []
        }
    }

    // async function handleGetIndustry() {
    //     try {
    //         const response = await GetAllProvince()
    //         const industryName = handleGetArrayFromApi(response.data)
    //         setDataIndustry(industryName)
    //     }
    //     catch {
    //         handleOpenModalResult("failed", "Sorry, unable to get data industry at the moment. Please try again")
    //     }
    // }

    function handleOpenModalResult(type, subtitle) {
        setTimeout(() => {
            setFlagResult(type)
            setDataSubtitleModal(subtitle)
            setIsModalOpenResult(true)
            setTimeout(() => {
                setIsModalOpenResult(false)
            }, 1000);
        }, 250);
    }


    // ADDED FUNCTION TO ADD OR EDIT
    const handleSubmit = () => {

        if (!specialPriceDivision.trim() || !specialPriceClient.trim() || !specialPrice.trim()) {
            // Inform user that all fields are required
            alert("All fields are required.");
            return; // Prevent form submission
        }


        switch (type) {
            case 'add':
                rightAction(specialPriceDivision, specialPriceClient, specialPrice);
                setSpecialPrice('');
                setSpecialPriceDivision('');
                setSpecialPriceClient('');
                break;
            case 'edit':
                rightAction(entryId, specialPriceDivision, specialPriceClient, specialPrice);
                setSpecialPrice('');
                setSpecialPriceDivision('');
                setSpecialPriceClient('');
                break;
        }
        onClose();
    };

    // ADDED FUNCTION TO DELETE
    const handleDelete = () => {
        rightAction(entryId);
        onClose();
    };
    
    

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 overflow-y-auto z-10" initialFocus={cancelButtonRef} onClose={() => isOpen} static={false}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" onClick={handleBackgroundClick} />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div className="min-h-screen flex items-center justify-center">
                        <Dialog.Panel className="relative w-full max-w-lg bg-white rounded-lg shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="flex justify-between py-3 px-6">
                                <p className="font-semibold text-xl text-black">{title}</p>
                                <p className="cursor-pointer text-xl" onClick={onClose}>
                                </p>
                            </div>
                            <div className="border-y border-neutral30 py-3">
                                {
                                    isVisibleSubtitle &&
                                    <p className="font-normal text-lg text-neutral500 px-6">{subtitle}</p>
                                }
                                {
                                    addition == "textarea" &&
                                    <div className='py-3 px-6'>
                                        <textarea
                                            value={valueTextArea}
                                            onChange={(e) => onChangeTextArea(e.target.value)}
                                            placeholder={placeholderTextArea}
                                            className="w-full p-3.5 text-sm text-neutral300 border border-neutral50 rounded-md bg-neutral20 focus:outline-none"
                                        />
                                    </div>
                                }
                                {
                                    addition == "dropzone&input" &&
                                    <div className='py-3 px-6'>
                                        <div>
                                            <Dropzone />
                                        </div>
                                        <div className='pt-3'>
                                            <TextInput
                                                title='Limit Amount'
                                                type='number'
                                                value={valueTextInput}
                                                onChange={onChangeTextInput}
                                                placeholder={placeholderTextInput}
                                            />
                                        </div>
                                    </div>
                                }
                                {
                                    addition == "dropdown&inputtext" &&
                                    <div className='px-6'>
                                        <div>
                                        <DropdownText
                                                title='Division Name'
                                                placeholder="Select Division"
                                                value={specialPriceDivision}
                                                options={dataIndustry}
                                                optionsValue={dataIndustry}
                                                onSelect={(selectedValue) => {
                                                    setSpecialPriceDivision(selectedValue);
                                                    setSpecialPriceClient("Dummy Client Name");
                                                }}
                                            />
                                        </div>
                                        <div className='pt-3'>
                                            <TextInput
                                                title='Client Name'
                                                type="text"
                                                placeholder="Client Name"
                                                value={specialPriceClient}
                                                mode={"disable"}
                                                onChange={(e) => setSpecialPriceClient(e.target.value)}
                                            />
                                        </div>
                                        <div className='pt-3'>
                                            <TextInput
                                                title='Special Price'
                                                type='number'
                                                value={specialPrice}
                                                onChange={setSpecialPrice}
                                                placeholder='Input Special Price'
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                            
                            <div className="bg-gray-50 px-4 sm:flex sm:flex-row-reverse">
                            <div className="my-3">

                                {/* ADDED HANDLER BASED ON ADD, EDIT, OR DELETE */ }
                                {type !== 'danger' ? (
                                    <div className='ml-2'>
                                        <PrimaryButton
                                            title={type === 'edit' ? 'Save' : titleButtonRight}
                                            type="wrap"
                                            size="large"
                                            onClick={handleSubmit}
                                        />
                                    </div>
                                ) : (
                                    <div className='ml-2'>
                                        <DangerButton
                                            title="Delete"
                                            type="wrap"
                                            size="large"
                                            onClick={handleDelete}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mt-3">
                                <OutlineButton title={titleButtonLeft} type="full" size="large" onClick={leftAction} />
                            </div>
                        </div>
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    );
};

export default ModalState;
