import {
  Box,
  Center,
  Divider,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  Select,
  Image,
} from "@chakra-ui/react";
import update from "immutability-helper";
import type { FC } from "react";
import { useCallback, useState } from "react";

import theme from "../../../theme/index";
import edit from "../../../assets/edit-icon.svg";
import radial from "../../../assets/radial-icon.svg";
import text from "../../../assets/text-icon.svg";
import { Card } from "../Card";

const style = {
  width: "100%",
};

export interface Item {
  id: number;
  text: string;
  typeQuestion: string;
  imageQuestion: string;
}

export interface ContainerState {
  cards: Item[];
}

export const StudentPollM: FC = () => {
  {
    //ESTADO DEL MODAL
    const { isOpen, onOpen, onClose } = useDisclosure();
    //ESTADO DE LA CARTA
    const [cards, setCards] = useState([
      {
        id: 1,
        text: "¿Sample question Student?",
        typeQuestion: "Text",
        imageQuestion: text,
      },
    ]);
    //ESTADO DEL INPUT
    const [commentActive, setCommentActive] = useState({
      id: 1,
      text: "HOLA",
    });
    //ESTADO DEL VALOR DEL INPUT
    const [value, setValue] = useState("");
    const handleChange = (event: any) => setValue(event.target.value);

    //ESTADO DEL VALOR DEL SELECT
    const [valueSelect, setValueSelect] = useState("");
    const handleChangeSelect = (event: any) =>
      setValueSelect(event.target.value);

    const openModal = (
      idOriginal: number,
      textOriginal: string,
      questionOriginal: string
    ) => {
      setCommentActive({ id: idOriginal, text: textOriginal });
      setValue(textOriginal);
      setValueSelect(questionOriginal);
      onOpen();
    };

    const deleteQuestion = (idQuestion: number) => {
      setCards((prevCards: Item[]) => {
        const idx = prevCards.findIndex((p) => p.id === idQuestion);
        console.log("EL ID ES: ", idx);
        if (idx >= 0) prevCards.splice(idx, 1);
        return [...prevCards];
      });
    };

    const editText = (
      idEdit: number,
      textEdit: string,
      questionEdit: string
    ) => {
      setCards((prevCards: Item[]) => {
        const idx = prevCards.findIndex((p) => p.id === idEdit);
        prevCards[idx].text = textEdit;
        prevCards[idx].imageQuestion = questionEdit == "Text" ? text : radial;
        prevCards[idx].typeQuestion = questionEdit;
        return [...prevCards];
      });
      onClose();
    };

    const addCard = () => {
      setCards((prevCards: Item[]) => [
        ...prevCards,
        {
          id: cards.length + 1,
          text: "Sample",
          typeQuestion: "Text",
          imageQuestion: text,
        },
      ]);
    };

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: Item[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
        })
      );
    }, []);

    const renderCard = useCallback((card: Item, index: number) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          moveCard={moveCard}
          content={
            <Grid
              templateRows="repeat(1, 1fr)"
              templateColumns="repeat(12, 1fr)"
              gap={1}
            >
              <GridItem rowStart={1} colStart={1} colEnd={7} overflowX="hidden">
                <Box fontSize={10}>
                  <text>{card.text}</text>
                </Box>
              </GridItem>
              <GridItem rowStart={1} colStart={8} colEnd={8}>
                <Center height="50px">
                  <Divider
                    orientation="vertical"
                    borderColor={theme.colors.purple}
                    sx={{ borderRightWidth: 2 }}
                  />
                </Center>
              </GridItem>
              <GridItem rowStart={1} colStart={9} colEnd={9}>
                <Image src={card.imageQuestion} boxSize={3} marginTop={4} />
              </GridItem>
              <GridItem rowStart={1} colStart={10} colEnd={10} marginTop={2}>
                <text>{card.typeQuestion}</text>
              </GridItem>
              <GridItem rowStart={1} colStart={11} colEnd={11} marginTop={2}>
                <Button
                  fontSize={10}
                  padding={0}
                  rounded={10}
                  backgroundColor="pink"
                  onClick={() => deleteQuestion(card.id)}
                >
                  Borrar
                </Button>
              </GridItem>
              <GridItem rowSpan={1} colStart={12} colEnd={12}>
                <Button
                  rounded={30}
                  backgroundColor="white"
                  width={50}
                  height={50}
                  onClick={() =>
                    openModal(card.id, card.text, card.typeQuestion)
                  }
                >
                  <Image src={edit} />
                </Button>
              </GridItem>
              <GridItem rowSpan={1} colSpan={12}>
                <Divider
                  orientation="horizontal"
                  borderColor={theme.colors.purpleDark}
                  sx={{ borderBottomWidth: 3 }}
                />
              </GridItem>
            </Grid>
          }
        />
      );
    }, []);

    return (
      <>
        <Box maxHeight="330px" overflowY="scroll" overflow="auto">
          <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
        </Box>
        <Box position="absolute" bottom={105}>
          <Button
            rounded={30}
            backgroundColor="purple"
            fontSize={10}
            onClick={() => addCard()}
            marginTop={3}
          >
            AÑADIR PREGUNTA
          </Button>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent rounded={30}>
            <ModalHeader>Encuesta</ModalHeader>
            <ModalCloseButton
              rounded={30}
              backgroundColor="#F44336"
              color="white"
            />
            <ModalBody>
              <Input
                value={value}
                onChange={handleChange}
                placeholder="large size"
                size="lg"
                marginBottom={5}
              />
              <Select
                value={valueSelect}
                onChange={handleChangeSelect}
                placeholder="Select option"
              >
                <option value="Text">Text</option>
                <option value="Radial">Radial</option>
              </Select>
            </ModalBody>

            <ModalFooter>
              <Button
                rounded={30}
                backgroundColor="blue"
                mr={3}
                onClick={() => editText(commentActive.id, value, valueSelect)}
              >
                Actualizar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
};
