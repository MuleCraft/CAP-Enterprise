import { useState } from 'react';
import { AccordionItem, AccordionButton, AccordionPanel, Stack, Flex, Box, Checkbox, Link, Accordion, Tooltip } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { IoIosInformationCircleOutline } from "react-icons/io";

const CustomAccordionItem = ({ sectionTitle, subtitles = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCheckedArray, setIsCheckedArray] = useState(new Array(subtitles.length).fill(false));

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectAll = () => {
        const areAllChecked = isCheckedArray.every((isChecked) => isChecked);
        const updatedCheckedArray = isCheckedArray.map(() => !areAllChecked);
        setIsCheckedArray(updatedCheckedArray);
    };

    const handleCheckboxChange = (index) => {
        const updatedCheckedArray = [...isCheckedArray];
        updatedCheckedArray[index] = !isCheckedArray[index];
        setIsCheckedArray(updatedCheckedArray);
    };

    return (
        <Accordion allowMultiple>
            <AccordionItem>
                <h2>
                    <AccordionButton
                        bgColor="#eaeaea"
                        h={10}
                        borderBottomWidth={1}
                        borderTopWidth={1}
                        borderColor="gray.300"
                        onClick={handleToggle}
                    >
                        <Flex align="center" gap={3}>
                            {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
                            <Flex alignItems="center" justifyContent="space-between" flex="1">
                                <Box as='span' textAlign='left' fontSize="xs" flex="1">
                                    {sectionTitle}
                                </Box>
                            </Flex>
                        </Flex>
                    </AccordionButton>
                    <Box fontSize="xs" ml={530} mt={-30} zIndex={20} pb={2}>
                        <Link color="gray" fontSize="xs" onClick={handleSelectAll}>
                            {isCheckedArray.every((isChecked) => isChecked) ? "Deselect all" : "Select all"}
                        </Link>
                    </Box>
                </h2>
                <AccordionPanel pb={4} display={isOpen ? "block" : "none"} pt={4} maxHeight="200px" overflowY="auto">
                    <Stack>
                        {subtitles.map((subTitle, index) => (
                            <Flex key={index} alignItems="center" justifyContent="space-between" borderBottomWidth={1} borderColor="gray.300" p={1}>
                                <Flex alignItems="center" fontSize="xs" gap={3}>
                                    {subTitle.title}
                                    <Tooltip label={subTitle.tooltip} placement='right' fontSize="11" p={2} bg="gray">
                                        <Box as='span' display='inline-block'>
                                            <IoIosInformationCircleOutline style={{ height: "15px", width: "15px" }} />
                                        </Box>
                                    </Tooltip>
                                </Flex>
                                <Checkbox size='lg' color='boxColor' isChecked={isCheckedArray[index]} onChange={() => handleCheckboxChange(index)} />
                            </Flex>
                        ))}
                    </Stack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default CustomAccordionItem;