import { Fragment, useRef} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PiInfoDuotone } from "react-icons/pi";

const ModalLoading = (props) => {
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
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-16 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                        <PiInfoDuotone className="h-8 w-8 text-primary500" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-black">
                                            {props.title}
                                        </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-black">
                                            {props.subtitle}
                                        </p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition.Root>
  )
}

export default ModalLoading