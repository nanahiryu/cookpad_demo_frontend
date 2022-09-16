import {
  Box,
  Button,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { FC, useCallback, useState } from "react";
import { ListItemProduct } from "../ListItem/ListItemProduct";
import { SideBar } from "../SideBar/SideBar";

export const Home: FC = () => {
  const sampledata = [
    {
      id: 1,
      name: "今朝とれたての新鮮なサバ",
      price: 1000,
      subtitle: "今朝とれたてのサバをお届け！",
      imgURL: "saba1.jpg",
      item: {
        name: "サバ",
        weight: 200,
        explanation: "今朝とれたてのサバです",
        fat: 2,
        producing_area: "三崎",
        num: 2,
        season_start: 9,
        season_end: 2,
      },
    },
    {
      id: 2,
      name: "脂ののったサバセット",
      price: 500,
      subtitle: "サイズは小さいですが、大変脂の乗った美味しいサバです！",
      imgURL: "saba2.jpg",
      item: {
        name: "サバ",
        weight: 100,
        explanation: "小さいですが、脂の乗った良いサバです",
        fat: 3,
        producing_area: "三崎",
        num: 6,
        season_start: 9,
        season_end: 2,
      },
    },
    {
      id: 3,
      name: "マグロのお頭",
      price: 1500,
      subtitle: "通販でマグロのお頭が買えちゃう！？",
      imgURL: "maguro.jpg",
      item: {
        id: 1,
        name: "マグロ（頭）",
        weight: 1200,
        explanation: "昨日上がったマグロのお頭です",
        fat: 2,
        producing_area: "三崎",
        num: 1,
        season_start: 10,
        season_end: 2,
      },
    },
    {
      id: 4,
      name: "マダコ",
      price: 1000,
      subtitle: "小ぶりなタコをお得にお買い上げ！",
      imgURL: "madako.jpg",
      item: {
        name: "タコ",
        weight: 300,
        explanation: "今朝とれたてのタコです",
        fat: 1,
        producing_area: "銚子",
        num: 5,
        season_start: 11,
        season_end: 1,
      },
    },
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchSeason, setSearchSeason] = useState(0);
  const [searchFatUpper, setSearchFatUpper] = useState(0);
  const [searchFatLower, setSearchFatLower] = useState(0);
  const [filterAbled, setFilterAbled] = useState(false);
  const [searchYenUpper, setSearchYenUpper] = useState(10000);
  const [searchYenLower, setSearchYenLower] = useState(0);
  const [confirmName, setConfirmName] = useState("");
  const [confirmPrice, setConfirmPrice] = useState(0);
  const toast = useToast();
  const onClickFinishBuying = useCallback(() => {
    toast({
      title: `「${confirmName}」を購入しました`,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    onClose();
  }, [confirmName, onClose, toast]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>購入内容の確認</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text>{confirmName}</Text>
              <Text>{confirmPrice}円を購入します</Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button m={4} colorScheme="teal" onClick={onClickFinishBuying}>
              購入
            </Button>
            <Button m={4} colorScheme="red" onClick={onClose}>
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div>
        <Grid templateColumns="repeat(5, 1fr)">
          <GridItem colSpan={1}>
            <SideBar
              setSearchSeason={setSearchSeason}
              setSearchFatUpper={setSearchFatUpper}
              setSearchFatLower={setSearchFatLower}
              SearchYenUpper={searchYenUpper}
              SearchYenLower={searchYenLower}
              setSearchYenUpper={setSearchYenUpper}
              setSearchYenLower={setSearchYenLower}
              filterAbled={filterAbled}
              setFilterAbled={setFilterAbled}
            />
          </GridItem>
          <GridItem colSpan={4}>
            {sampledata.map((data) => (
              <ListItemProduct
                key={data.id}
                name={data.name}
                price={data.price}
                subtitle={data.subtitle}
                imgURL={data.imgURL}
                item={data.item}
                searchSeason={searchSeason}
                searchFatUpper={searchFatUpper}
                searchFatLower={searchFatLower}
                searchYenUpper={searchYenUpper}
                searchYenLower={searchYenLower}
                filterAbled={filterAbled}
                onOpen={onOpen}
                setConfirmName={setConfirmName}
                setConfirmPrice={setConfirmPrice}
              />
            ))}
          </GridItem>
        </Grid>
      </div>
    </>
  );
};
