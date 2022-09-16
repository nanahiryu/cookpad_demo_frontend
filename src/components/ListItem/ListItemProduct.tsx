import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { itemType } from "../../types/ProductType";

type Props = {
  name: string;
  price: number;
  subtitle: string;
  imgURL: string;
  item: itemType;
  searchSeason: number;
  searchFatUpper: number;
  searchFatLower: number;
  searchYenUpper: number;
  searchYenLower: number;
  filterAbled: boolean;
  onOpen: () => void;
  setConfirmName: Dispatch<SetStateAction<string>>;
  setConfirmPrice: Dispatch<SetStateAction<number>>;
};

export const ListItemProduct: FC<Props> = ({
  name,
  price,
  subtitle,
  imgURL,
  item,
  searchSeason,
  searchFatUpper,
  searchFatLower,
  searchYenUpper,
  searchYenLower,
  filterAbled,
  onOpen,
  setConfirmName,
  setConfirmPrice,
}) => {
  const nowMonth: number = new Date().getMonth() + 1;
  const season_on: boolean =
    (item.season_start <= nowMonth && item.season_end >= nowMonth) ||
    ((item.season_start <= nowMonth || item.season_end >= nowMonth) &&
      item.season_end < item.season_start);
  const onClickBuy = useCallback(() => {
    setConfirmName(name);
    setConfirmPrice(price);
    onOpen();
  }, [name, onOpen, price, setConfirmName, setConfirmPrice]);

  if (
    // searchSeasonが旬のみ(2)の時、旬でない物に空を返す
    filterAbled &&
    searchSeason !== 0 &&
    searchSeason === 2 &&
    season_on === false
  ) {
    return <></>;
  }
  if (
    filterAbled &&
    searchFatLower !== 0 &&
    (searchFatLower > item.fat || searchFatUpper < item.fat)
  ) {
    return <></>;
  }
  if (filterAbled && (searchYenLower > price || searchYenUpper < price)) {
    return <></>;
  }
  return (
    <Box
      p="2"
      mx="10"
      my="4"
      borderWidth="3px"
      borderRadius="xl"
      borderColor="gray.100"
      bgColor="gray.100"
      boxShadow="lg"
    >
      <Grid templateColumns="repeat(5, 1fr)" gap={2}>
        <GridItem colSpan={1} bg="papayawhip" borderRadius="xl">
          <Image
            src={`${process.env.PUBLIC_URL}/sampleImg/${imgURL}`}
            alt="Logo"
            borderRadius="xl"
          />
        </GridItem>
        <GridItem colSpan={4}>
          <Grid templateRows="repeat(4, 1fr)">
            <GridItem rowSpan={1}>
              <Text fontSize="2xl">{name}</Text>
            </GridItem>
            <GridItem rowSpan={3}>
              <Grid templateColumns="repeat(2, 1fr)">
                <GridItem rowSpan={1} gap="2">
                  <Grid templateRows="repeat(3, 1fr)">
                    <GridItem rowSpan={1}>
                      <Flex textAlign="left">
                        <Text mr={4} fontSize="2xl">{`${price}円`}</Text>
                        <Text
                          my="auto"
                          fontSize="md"
                        >{`${item.weight}g×${item.num}`}</Text>
                      </Flex>
                    </GridItem>
                    <GridItem rowSpan={2}>
                      <Text fontSize="md">{subtitle}</Text>
                    </GridItem>
                  </Grid>
                </GridItem>
                <GridItem rowSpan={1} gap="2">
                  <VStack mt={4} spacing={4}>
                    {season_on ? (
                      <Box
                        textAlign="center"
                        w="40%"
                        bgGradient="linear(to-r, teal.500, green.500)"
                        borderRadius="full"
                        textColor="gray.100"
                      >
                        <Text>{`旬：${item.season_start}-${item.season_end}月`}</Text>
                      </Box>
                    ) : (
                      <Box
                        textAlign="center"
                        w="40%"
                        bgGradient="linear(to-r, teal.500, green.500)"
                        borderRadius="full"
                        textColor="gray.100"
                        filter="auto"
                        brightness="60%"
                      >
                        <Text>{`旬：${item.season_start}-${item.season_end}月`}</Text>
                      </Box>
                    )}

                    {item.fat === 1 && (
                      <Box
                        textAlign="center"
                        w="40%"
                        bgGradient="linear(to-r, teal.500, green.500)"
                        borderRadius="full"
                        textColor="gray.100"
                        filter="auto"
                        brightness="60%"
                      >
                        <Text>脂ひかえめ</Text>
                      </Box>
                    )}
                    {item.fat === 2 && (
                      <Box
                        textAlign="center"
                        w="40%"
                        bgGradient="linear(to-r, teal.500, green.500)"
                        borderRadius="full"
                        textColor="gray.100"
                        filter="auto"
                        brightness="80%"
                      >
                        <Text>脂ふつう</Text>
                      </Box>
                    )}
                    {item.fat === 3 && (
                      <Box
                        textAlign="center"
                        w="40%"
                        bgGradient="linear(to-r, teal.500, green.500)"
                        borderRadius="full"
                        textColor="gray.100"
                      >
                        <Text>脂バチバチ</Text>
                      </Box>
                    )}
                  </VStack>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
      <Box m={4} textAlign="right">
        <Button colorScheme="teal" onClick={onClickBuy}>
          購入する
        </Button>
      </Box>
    </Box>
  );
};
