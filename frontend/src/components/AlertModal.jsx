import { Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";

const AlertModal = ({ isOpen, onClose, message, callBack }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} variant='alert' closeOnOverlayClick={false} >
            <ModalOverlay />
            <ModalContent>
                <ModalBody>
                    {message}
                </ModalBody>
                <ModalFooter>
                    <Flex w='100%' justify='space-between' px='20px'>
                        <Button onClick={() => {
                            callBack()
                            onClose()
                        }} variant='undo'>
                            Yes, continue!
                        </Button>
                        <Button onClick={onClose} variant='undo' color='dkGreen'>
                            No, do not continue!
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}


export default AlertModal;