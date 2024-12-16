import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function DialogBox(props) {
    let [isOpen, setIsOpen] = useState(false)

    function open() {
        setIsOpen(true)
        props.setPopUp({ ...props.popUp, flag: true })
    }
    useEffect(() => {
        setIsOpen(props.popUp.flag)
    }, [props.popUp])

    function close() {
        setIsOpen(false)
        props.setPopUp({ ...props.popUp, flag: false })
    }

    return (
        <>


            <AnimatePresence>
                {isOpen && (
                    <Dialog static open={isOpen} onClose={close} className="relative z-50">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 1, }}
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm "
                        />
                        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
                            <DialogPanel
                                as={motion.div}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 1, scale: 0.95 }}
                                className="max-w-lg space-y-4 bg-black p-2 rounded-lg w-3/4 flex justify-center items-center flex-col"
                            >
                                <DialogTitle className={"text-center font-bold"}>GAME</DialogTitle>
                                <Description>{props.popUp.message}</Description>
                             
                                <div className="flex gap-4">
                                    <button onClick={close} className='px-7 py-2 rounded-lg bg-red-700'>Ok</button>
                                </div>
                            </DialogPanel>
                        </div>
                    </Dialog>
                )}
            </AnimatePresence>
        </>
    )
}
