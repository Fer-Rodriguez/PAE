//Chakra
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Input,
  Center,
  IconButton,
  Text,
  InputLeftElement,
  InputGroup,
  Grid,
  GridItem,
} from "@chakra-ui/react";

//React imports
import React from "react";
import { Cell, useTable } from "react-table";
import { useMemo, useState } from "react";

//Components
import { ManagingTable } from "../../components/ManagingTable";
import { ButtonGeneric } from "../../components/Button";

//Assets
import makeData from "../../pages/Subject/makeData";
import info from "../../assets/info_icon.png";
import edit from "../../assets/edit_icon.png";
import search from "../../assets/search-icon.png";
import theme from "../../theme/index";

export const SubjectPage = ({ mobile }: { mobile?: boolean }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function GetData() {
    interface IColumnDetails {
      [key: string]: string;
    }
    const data = React.useMemo<IColumnDetails[]>(() => makeData(5), []);
    const [valor, setValor] = useState(data);
    const columns = useMemo(
      () => [
        { Header: "Codigo", accessor: "code" },
        { Header: "Nombre", accessor: "name" },
        { Header: "Carrera", accessor: "career" },
        { Header: "Semestre", accessor: "semester" },
        {
          Header: "",
          accessor: "button",
          Cell: (cell: Cell<any, any>) => (
            <>
              <IconButton
                aria-label="Info"
                size="lg"
                rounded={100}
                icon={<img src={edit} height="25em" width="25em" />}
                backgroundColor={theme.colors.blue}
                onClick={onOpen}
              >
                X
              </IconButton>
            </>
          ),
        },
        {
          Header: "",
          accessor: "button2",
          Cell: (cell: Cell<any, any>) => (
            <>
              <ButtonGeneric
                text="X"
                color={theme.colors.pink}
                onClick={() => {
                  // ES6 Syntax use the rvalue if your data is an array.
                  const dataCopy = [...valor];
                  // It should not matter what you name tableProps. It made the most sense to me.
                  dataCopy.splice(cell.row.index, 1);
                  setValor(dataCopy);
                }}
              />
            </>
          ),
        },
      ],
      [valor]
    );

    const { getTableProps, getTableBodyProps, flatHeaders, rows, prepareRow } =
      useTable({ columns, data });

    return (
      <ManagingTable
        headColor="blue"
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        flatHeaders={flatHeaders}
        rows={rows}
        prepareRow={prepareRow}
      />
    );
  }

  return (
    <>
      {mobile ? (
        <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(10, 1fr)"
          gap={1}
        >
          <GridItem rowSpan={15} colStart={1} colEnd={3}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<img src={search} height="25em" width="25em" />}
              />
              <Input
                type="search"
                _placeholder={{ opacity: 1, color: "black" }}
                placeholder="Buscar..."
                rounded={30}
                width={300}
                borderColor={theme.colors.white}
                boxShadow="lg"
              />
            </InputGroup>
          </GridItem>
          <GridItem rowSpan={15} colStart={11} colEnd={11}>
            <IconButton
              aria-label="Info"
              size="lg"
              backgroundColor={theme.colors.white}
              rounded={100}
              icon={<img src={info} height="30em" width="30em" />}
            />
          </GridItem>
          <GridItem rowSpan={1} colSpan={10}>
            {GetData()}
          </GridItem>

          <GridItem rowStart={40} rowEnd={25} colStart={10} colEnd={10}>
            <ButtonGeneric
              text="Agregar materia"
              color={theme.colors.purpleLight}
            />
          </GridItem>
          <Center>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent rounded={30}>
                <ModalHeader
                  fontSize={30}
                  textColor={theme.colors.purpleDark}
                  textAlign="center"
                >
                  Agregar materia
                </ModalHeader>
                <ModalCloseButton
                  margin={5}
                  backgroundColor="red.500"
                  textColor={theme.colors.white}
                  rounded={35}
                />
                <Grid
                  templateRows="repeat(1, 1fr)"
                  templateColumns="repeat(3, 1fr)"
                  gap={2}
                >
                  <GridItem colStart={2} colEnd={2}>
                    <ModalBody pb={6}>
                      <FormControl>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={
                              <img src={search} height="25em" width="25em" />
                            }
                          />
                          <Input
                            type="search"
                            _placeholder={{ opacity: 1, color: "black" }}
                            backgroundColor="#E1E0DC"
                            placeholder="Clave de la materia"
                            rounded={30}
                            width={300}
                            borderColor={theme.colors.white}
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl mt={4}>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={
                              <img src={search} height="25em" width="25em" />
                            }
                          />
                          <Input
                            type="search"
                            _placeholder={{ opacity: 1, color: "black" }}
                            backgroundColor="#E1E0DC"
                            placeholder="Nombre de la materia"
                            rounded={30}
                            width={300}
                            borderColor={theme.colors.white}
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl mt={4}>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={
                              <img src={search} height="25em" width="25em" />
                            }
                          />
                          <Input
                            type="search"
                            _placeholder={{ opacity: 1, color: "black" }}
                            backgroundColor="#E1E0DC"
                            placeholder="Carrera"
                            rounded={30}
                            width={300}
                            borderColor={theme.colors.white}
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl mt={4}>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={
                              <img src={search} height="25em" width="25em" />
                            }
                          />
                          <Input
                            type="search"
                            _placeholder={{ opacity: 1, color: "black" }}
                            backgroundColor="#E1E0DC"
                            placeholder="Semestre"
                            rounded={30}
                            width={300}
                            borderColor={theme.colors.white}
                          />
                        </InputGroup>
                      </FormControl>
                    </ModalBody>
                  </GridItem>
                </Grid>
                <Center>
                  <ModalFooter>
                    <ButtonGeneric
                      text="Añadir"
                      color={theme.colors.purpleLight}
                    />
                  </ModalFooter>
                </Center>
              </ModalContent>
            </Modal>
          </Center>
        </Grid>
      ) : (
        <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(10, 1fr)"
          gap={1}
        >
          <GridItem rowSpan={15} colStart={1} colEnd={3}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<img src={search} height="25em" width="25em" />}
              />
              <Input
                type="search"
                _placeholder={{ opacity: 1, color: "black" }}
                placeholder="Buscar..."
                rounded={30}
                width={300}
                borderColor={theme.colors.white}
                boxShadow="lg"
              />
            </InputGroup>
          </GridItem>
          <GridItem rowSpan={15} colStart={4} colEnd={5}>
            <IconButton
              aria-label="Info"
              size="lg"
              backgroundColor={theme.colors.white}
              rounded={100}
              icon={<img src={info} height="30em" width="30em" />}
            />
          </GridItem>
          <GridItem rowSpan={15} colStart={10} colEnd={10}>
            <Text fontSize="3xl">ASESORÍAS</Text>
          </GridItem>
          <GridItem rowSpan={1} colSpan={10}>
            {GetData()}
          </GridItem>
          <GridItem rowStart={40} rowEnd={25} colStart={10} colEnd={10}>
            <ButtonGeneric
              text="Agregar materia"
              color={theme.colors.purpleDark}
            />
          </GridItem>
          <Center>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent rounded={30}>
                <ModalHeader
                  fontSize={30}
                  textColor="purple"
                  textAlign="center"
                >
                  Agregar materia
                </ModalHeader>
                <ModalCloseButton
                  margin={5}
                  backgroundColor="red.500"
                  textColor="white"
                  rounded={35}
                />
                <Grid
                  templateRows="repeat(1, 1fr)"
                  templateColumns="repeat(3, 1fr)"
                  gap={2}
                >
                  <GridItem colStart={2} colEnd={2}>
                    <ModalBody pb={6}>
                      <FormControl>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={
                              <img src={search} height="25em" width="25em" />
                            }
                          />
                          <Input
                            type="search"
                            _placeholder={{ opacity: 1, color: "black" }}
                            backgroundColor="#E1E0DC"
                            placeholder="Clave de la materia"
                            rounded={30}
                            width={300}
                            borderColor="white"
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl mt={4}>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={
                              <img src={search} height="25em" width="25em" />
                            }
                          />
                          <Input
                            type="search"
                            _placeholder={{ opacity: 1, color: "black" }}
                            backgroundColor="#E1E0DC"
                            placeholder="Nombre de la materia"
                            rounded={30}
                            width={300}
                            borderColor="white"
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl mt={4}>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={
                              <img src={search} height="25em" width="25em" />
                            }
                          />
                          <Input
                            type="search"
                            _placeholder={{ opacity: 1, color: "black" }}
                            backgroundColor="#E1E0DC"
                            placeholder="Carrera"
                            rounded={30}
                            width={300}
                            borderColor={theme.colors.white}
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl mt={4}>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={
                              <img src={search} height="25em" width="25em" />
                            }
                          />
                          <Input
                            type="search"
                            _placeholder={{ opacity: 1, color: "black" }}
                            backgroundColor="#E1E0DC"
                            placeholder="Semestre"
                            rounded={30}
                            width={300}
                            borderColor={theme.colors.white}
                          />
                        </InputGroup>
                      </FormControl>
                    </ModalBody>
                  </GridItem>
                </Grid>
                <Center>
                  <ModalFooter>
                    <ButtonGeneric
                      text="Añadir"
                      color={theme.colors.purpleLight}
                    />
                  </ModalFooter>
                </Center>
              </ModalContent>
            </Modal>
          </Center>
        </Grid>
      )}
    </>
  );
};
