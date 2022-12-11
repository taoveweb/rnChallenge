import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { FlatList } from "react-native";
import { Div, Icon, Snackbar, Text } from 'react-native-magnus';
import { AppStackScreenProps } from "../navigators"; // @demo remove-current-line
import p from "../utils/px2dp";
import ProductItem from "./components/ProductItem";

interface HomeScreenProps extends AppStackScreenProps<"Home"> { } // @demo remove-current-line
type itemType = {
  imgUrl: string;
  name: string;
  describe: string;
  price: number;
  format: string[];
  id: string;
}
const DATA: itemType[] = [
  {
    id: '1',
    imgUrl: 'https://demo.snipcart.com/images/painting.jpg',
    name: 'Starry Night',
    describe: `Subscribe to our painter's magazine. You can opt-in for a weekly or monthly subscription.`,
    price: 119.00,
    format: ['Physical copy', 'Digital copy (.jpeg)']
  },
  {
    id: '2',
    imgUrl: 'https://demo.snipcart.com/images/almond.jpg',
    name: 'Magazine subscription',
    describe: `Subscribe to our painter's magazine. You can opt-in for a weekly or monthly subscription.`,
    price: 65.95,
    format: ['Physical copy', 'Digital copy (.jpeg)']
  },
  {
    id: '3',
    imgUrl: 'https://demo.snipcart.com/images/starry-night.jpg',
    name: 'Rosy-Fingered Dawn at Louse Point',
    describe: `Subscribe to our painter's magazine. You can opt-in for a weekly or monthly subscription.`,
    price: 99.95,
    format: ['Physical copy', 'Digital copy (.jpeg)']
  },
  {
    id: '4',
    imgUrl: 'https://demo.snipcart.com/images/rosy.jpg',
    name: 'Irises',
    describe: `Subscribe to our painter's magazine. You can opt-in for a weekly or monthly subscription.`,
    price: 99.95,
    format: ['Physical copy', 'Digital copy (.jpeg)']
  },
];

const item:itemType={
  id: '4',
  imgUrl: 'https://demo.snipcart.com/images/rosy.jpg',
  name: 'Irises',
  describe: `Subscribe to our painter's magazine. You can opt-in for a weekly or monthly subscription.`,
  price: 99.95,
  format: ['Physical copy', 'Digital copy (.jpeg)']
};

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(props
) {

  const [list,setList]=useState<Array<itemType>>(DATA);
  const loadMore = () => {
     let tempArr=[...list];
    for(let i=list.length;i<list.length+10;i++){
      console.log(i);
      tempArr.push({
       ...item,
       id:`${i+1}`
      })
    }
    setList(tempArr);
  };

  const renderSpinner = () => {
    return <Div h={p(50)}  row justifyContent="center" alignItems="center"><Text fontSize={p(30)}>loading more...</Text></Div>;
  };

  const snackbarRef: any = React.createRef();
  const { navigation } = props;
  const renderItem = (item: any) => (
    <ProductItem navigation={navigation} show={(item, val) => {
      if (snackbarRef.current) {
        snackbarRef.current.show(
          `${val}  ${item.name} Add to car success !`,
          {
            duration: 2000,
            suffix: <Icon
              name="check"
              color="#ffffff"
              fontSize="md"
              fontFamily="AntDesign"
            />
          }
        );
      }
    }} {...item.item} />
  );
  return (
    <Div flex={1} bg="#fff" >
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderSpinner}
      />
      <Snackbar
        offset={p(500)}
        ref={snackbarRef}
        bg="#000"
        color="white"
      ></Snackbar>
    </Div>
  )
})

