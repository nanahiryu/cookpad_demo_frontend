import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderMark,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from "@chakra-ui/react";
import React, { Dispatch, FC, SetStateAction, useCallback } from "react";

type Props = {
  setSearchSeason: Dispatch<SetStateAction<number>>;
  setSearchFatUpper: Dispatch<SetStateAction<number>>;
  setSearchFatLower: Dispatch<SetStateAction<number>>;
  SearchYenUpper: number;
  SearchYenLower: number;
  setSearchYenUpper: Dispatch<SetStateAction<number>>;
  setSearchYenLower: Dispatch<SetStateAction<number>>;
  filterAbled: boolean;
  setFilterAbled: Dispatch<SetStateAction<boolean>>;
};

export const SideBar: FC<Props> = ({
  setSearchSeason,
  setSearchFatUpper,
  setSearchFatLower,
  SearchYenUpper,
  SearchYenLower,
  setSearchYenUpper,
  setSearchYenLower,
  filterAbled,
  setFilterAbled,
}) => {
  const setSearchFat = useCallback(
    (val: Array<number>) => {
      setSearchFatLower(val[0]);
      setSearchFatUpper(val[1]);
    },
    [setSearchFatLower, setSearchFatUpper]
  );

  return (
    <>
      <Box>
        <Box
          maxH="100vh"
          py={10}
          px={6}
          h="100vh"
          w="240px"
          bgColor="gray.100"
          pos="fixed"
          top="0"
          zIndex="1"
        >
          <Box textAlign="center" mb={6} className="titleLogo" fontSize="xl">
            <Text fontWeight="bold">目利き職人</Text>
          </Box>
          <Box textAlign="center">
            {filterAbled ? (
              <Button
                mx="auto"
                colorScheme="teal"
                onClick={() => setFilterAbled(false)}
              >
                フィルタをはずす
              </Button>
            ) : (
              <Button
                mx="auto"
                colorScheme="teal"
                onClick={() => setFilterAbled(true)}
              >
                フィルタをかける
              </Button>
            )}
          </Box>

          {/* 旬 */}
          <Box my={10}>
            <Text textAlign="center" my="4" fontSize="xl">
              旬
            </Text>
            <Checkbox
              isDisabled={!filterAbled}
              onChange={(e) => {
                if (e.target.checked) {
                  setSearchSeason(2);
                } else {
                  setSearchSeason(1);
                }
              }}
            >
              旬のものだけ表示する
            </Checkbox>
          </Box>

          {/* 脂 */}
          <Box my={14}>
            <Text textAlign="center" my="4" fontSize="xl">
              脂の量
            </Text>
            <RangeSlider
              defaultValue={[1, 3]}
              min={1}
              max={3}
              step={1}
              onChangeEnd={(val) => setSearchFat(val)}
              // isDisabled={!filterAbled}
            >
              <RangeSliderMark value={1} mt="2" ml="-2" fontSize="sm">
                少
              </RangeSliderMark>
              <RangeSliderMark value={3} mt="2" ml="-2" fontSize="sm">
                多
              </RangeSliderMark>
              <RangeSliderTrack bg="blue.100">
                <RangeSliderFilledTrack bg="teal" />
              </RangeSliderTrack>
              <RangeSliderThumb boxSize={4} index={0} />
              <RangeSliderThumb boxSize={4} index={1} />
            </RangeSlider>
          </Box>
          <Box my={14}>
            <Text textAlign="center" my="4" fontSize="xl">
              価格
            </Text>
            <Flex>
              <Input
                size="sm"
                bgColor="white"
                type="number"
                isDisabled={!filterAbled}
                value={SearchYenLower}
                onChange={(e) => setSearchYenLower(Number(e.target.value))}
              ></Input>
              <Box mx={2}>～</Box>
              <Input
                size="sm"
                bgColor="white"
                type="number"
                isDisabled={!filterAbled}
                value={SearchYenUpper}
                onChange={(e) => setSearchYenUpper(Number(e.target.value))}
              ></Input>
              <Box mx={2}>円</Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
};
