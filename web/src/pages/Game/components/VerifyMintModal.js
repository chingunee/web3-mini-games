import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

  export default function VerifyMintModal({ isOpen, onClose, score, mint }) {
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent backgroundColor="#0a1f2f" textColor="white">
            <ModalHeader className="font-body text-center">Are you sure</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <div className="font-body">
                    <div className="flex justify-center items-center font-bold text-xl">
                        {score}
                    </div>
                    <div className="w-full flex justify-center space-x-4 py-6 font-medium">
                        <button onClick={onClose} className="w-24 py-1 bg-blue-500 rounded">Close</button>
                        <button onClick={mint} className="w-24 py-1 bg-green-500 rounded">Mint</button>
                    </div>
                </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }