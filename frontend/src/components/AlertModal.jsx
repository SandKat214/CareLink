import {
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalOverlay,
    Text,
    VStack,
} from "@chakra-ui/react"

const AlertModal = ({ isOpen, onClose, message, callBack }) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			variant='alert'
			closeOnOverlayClick={false}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalBody>
                    <VStack spacing='20px' >
                        <Text as='p' >{message}</Text>
                        <Text as='p' >Are you sure you want to continue?</Text>
                    </VStack>
                                        
                </ModalBody>
				<ModalFooter>
					<Flex w='100%' justify='space-between' px='20px'>
						<Button
							onClick={onClose}
							variant='undo'
						>
							No, don't continue!
						</Button>
						<Button
							variant='undo'
							color='dkGreen'
							onClick={() => {
								callBack()
								onClose()
							}}
						>
							Yes, continue!
						</Button>
					</Flex>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default AlertModal
