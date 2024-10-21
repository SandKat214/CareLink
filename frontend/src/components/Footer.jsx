import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Flex as='footer' w='100%' p='40px 60px' justify='right' bg='dkNavy'  >
            <Text color='background' fontSize='12px' fontStyle='italic' >
                &copy; 2024 Katherine Sandeen
            </Text>
        </Flex>
    );
}

export default Footer;