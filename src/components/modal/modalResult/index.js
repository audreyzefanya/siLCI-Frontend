import { Fragment, useRef} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import LogoSuccess from "../../../assets/images/logo_success.png"
import LogoFailed from "../../../assets/images/logo_failed.png"

const ModalResult = (props) => {
  const cancelButtonRef = useRef(null)

  function handleBackgroundClick(e) {
    e.stopPropagation()
  }

  return (
    <Transition.Root show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => props.isOpen} static={true}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" onClick={handleBackgroundClick}/>
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-80">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-4 text-center">
                                <div className='flex justify-center items-center my-3'>
                                    {
                                        props.type == "success" ?
                                            <img src={LogoSuccess} className='w-14 h-14'/> 
                                            :
                                            <img src={LogoFailed} className='w-14 h-14'/>
                                    }
                                </div>
                                <p className='text-xl text-black font-semibold mt-2'>{props.type == "success" ? "Success" : "Failed"}</p>
                                <p className='text-sm text-black mb-2'>{props.subtitle}</p>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition.Root>
  )
}

export default ModalResult