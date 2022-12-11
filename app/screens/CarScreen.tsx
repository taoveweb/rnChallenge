import { observer } from "mobx-react-lite";
import React, { FC, useMemo, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  Button, Div, Image, Input, Text, Icon, Tooltip, Snackbar
} from 'react-native-magnus';
import BigNumber from "bignumber.js";
import { useStores } from "../models";
import { AppStackScreenProps } from "../navigators"; // @demo remove-current-line
import p from "../utils/px2dp";
const promoCode = "abc";
interface CarScreenProps extends AppStackScreenProps<"Home"> { } // @demo remove-current-line
type itemType = {
  imgUrl: string;
  name: string;
  describe: string;
  price: number;
  format: string[];
  quantity: number;
  id: string;

}


export const CarScreen: FC<CarScreenProps> = observer(function CarScreen(props
) {
  const tooltipRef: any = React.createRef();
  const { carStore }: any = useStores();
  const { cartList } = carStore;
  const [show, setShow] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [text, setText] = useState('');
  const snackbarRef: any = React.createRef();
  const { navigation } = props;
  const computeTotal = (list, discount) => {
    let total: any = 0;
    list.forEach((el: itemType) => {
      const x = new BigNumber(el.quantity);
      total =x.multipliedBy(el.price).plus(total);
      if (discount > 0) {
        total= total.minus(discount).toFixed(2);
      }else{
        total=total.toFixed(2);
      }
    })
    return total;
  }
  // const total=useMemo(()=>{
  //   let total: any = 0;
  //   cartList.forEach((el: itemType) => {
  //     const x = new BigNumber(el.quantity);
  //     total =x.multipliedBy(el.price).plus(total);
  //     if (discount > 0) {
  //       total= total.minus(discount).toFixed(2);
  //     }else{
  //       total=total.toFixed(2);
  //     }
  //   })
  //   return total;
  // },[cartList,discount])


  const renderItem = (item: any) => (
    <Item key={item.id} navigation={navigation} {...item} />
  );
  return (
    <Div flex={1} bg="#eef0f2" >
      <ScrollView
        automaticallyAdjustKeyboardInsets
      >
        {(cartList || []).map(renderItem)}
        {!show && <Div onTouchStart={() => {
          setShow(true);
        }} h={p(54)} mx={p(18)} borderColor="#e3e6e8" borderWidth={1} bg="#fff" mt={p(57)} row justifyContent="center" alignItems="center">
          <Text>Promo code?</Text>

        </Div>}
        {show && <Div mt={p(57)} mx={p(18)} alignItems="center" row>
          <Input clearButtonMode="while-editing" fontSize={p(30)} value={text} onChangeText={(val) => {
            console.log(val.replace(/\s*/g, ""))
            setText(val.replace(/\s*/g, "").toLocaleLowerCase());
          }} h={p(54)} flex={1} placeholder="Promo code" suffix={<Text color="#1a4db3" textDecorLine="underline" onPress={() => {
            if (text === promoCode.replace(/\s*/g, "").toLocaleLowerCase()) {
              setText('');
              setDiscount(100);
              snackbarRef.current.show(
                `Get 100 discount`,
                {
                  duration: 2000,
                  suffix: <Icon
                    name="checkcircleo"
                    color="white"
                    fontSize="md"
                    fontFamily="AntDesign"
                  />
                }
              );

            } else {
              snackbarRef.current.show(
                `No this promo code!`,
                {
                  duration: 2000,
                  suffix: <Icon
                    name="exclamationcircle"
                    color="white"
                    fontSize="md"
                    fontFamily="AntDesign"
                  />
                }
              );
            }
          }} >Apply</Text>} /><Button ml={p(8)} color="#000" textDecorLine="underline" onPress={() => {
            setShow(false);
            setDiscount(0)
          }} bg="transparent">Cancel</Button>
        </Div>}
        <Text mt={p(40)} ml={(18)} color="#64686b">Shipping and taxes will be calculated at checkout. </Text>

        <Div row alignItems="center" justifyContent="space-between" mx={p(18)}>
          <Div row alignItems="center">

            <Text color="#64686b"> Discounts </Text>

            <Tooltip
              mr={p(210)}
              color="#fff"
              rounded={0}
              ref={tooltipRef}
              text={
                <Div w={(p(250))} bg="transparent" alignItems="flex-start" justifyContent="center">
                  <Text >
                    Free shipping above 100$
                  </Text>
                  <Div w={(p(250))} row justifyContent="space-between">
                    <Text>
                      test 50% off
                    </Text>
                    <Text>
                      -${discount}
                    </Text>
                  </Div>

                </Div>
              }
              bg="#fff"
            >
              <Button
                onPress={() => {
                  if (tooltipRef.current) {
                    tooltipRef.current.show();
                  }
                }}
                borderColor="#1f9ff5" borderWidth={1} bg="#fff" alignItems="center" justifyContent="center" h={20} w={20} rounded="circle">

                <Icon name="question" color="#1f9ff5" h={20} w={20} fontSize={p(20)} />
              </Button>
            </Tooltip>
          </Div>
          <Text color="#64686b">-${discount}</Text>
        </Div>

        <Div mt={p(15)} row alignItems="center" justifyContent="space-between" mx={p(18)}>
          <Text fontSize={p(25)} >Total </Text>
          <Text fontSize={p(25)} >${computeTotal(cartList, discount)}</Text>
        </Div>

        <Button
          mt={p(21)}
          mb={p(54)}
          mx={p(18)}
          h={p(54)}
          bg="#1a4db3"
          color="white"
          block
          suffix={<Icon name="arrowright" ml="md" color="white" />}
        >
          Checkout
        </Button>
      </ScrollView>


      <Snackbar
        offset={p(500)}
        ref={snackbarRef}
        bg="#000"
        color="white"
      ></Snackbar>
    </Div>
  )
})



interface ItemProps extends itemType {
  index: number;
  navigation: any;
}
function Item(props: ItemProps) {
  const { carStore }: any = useStores();
  const { subtractStep, addStep, remove } = carStore;
  const { navigation, ...item } = props;
  const { imgUrl,
    name,
    describe,
    price,
    quantity,
    id } = item;
  const totalPrice = useMemo(() => {
    const x = new BigNumber(price);
    return x.multipliedBy(quantity).toFixed(2);
  }, [price, quantity])

  return (
    <Button bg="transparent" onPress={(e) => {
      navigation.push('Detail', { ...item });
    }}>
      <Div key={id} bg="#fff" px={p(50)} py={p(32)} mt={p(24)}>
        <Div row alignItems="center" pb={p(25)} justifyContent="space-between">
          <Image
            source={{
              uri: imgUrl,
            }}
            bg="#ff6600"
            rounded={p(8)}
            h={p(32)}
            w={p(41)}
          />
          <Text fontSize={p(20)} fontWeight="600"   >{name}</Text>
          <Button onPress={(e) => {
            remove(id);
            e.stopPropagation();
          }} bg="#ffe6e4" alignItems="center" justifyContent="center" h={36} w={36} rounded="circle">
            <Icon name="delete" color="#a30b03" h={20} w={20} fontSize={p(20)} />
          </Button>
        </Div>

        <Text fontSize={p(20)} color="#9c9ea1" lineHeight={0} >{describe}</Text>
        <Div row mt={p(25)} justifyContent="space-between" alignItems="center" mb={p(16)}   >
          <Div row={false} >
            <Text mb={p(6)} fontSize={p(12)} color="#6b6b6b" lineHeight={0} >QUANTITY</Text>
            <Div onTouchStart={(e) => {
              e.stopPropagation();
            }} pt={p(7)} px={p(10)} borderColor="#00a1fc" alignItems="center" justifyContent="center" h={p(50)} borderWidth={1} w={p(160)} row>
              <Button onPress={() => {
                subtractStep(id)
              }} bg="#dff5ff" alignItems="center" justifyContent="center" h={25} w={25} rounded="circle">
                <Icon name="minus" color="#00a1fc" h={25} w={25} fontSize={p(20)} />
              </Button>
              <Input
                flex={1}
                editable={false}
                textAlign="center"
                borderWidth={0}
                keyboardType="numeric"
                value={`${quantity}`}
                p={0}
              />
              <Button
                onPress={() => {
                  addStep(id)
                }}
                bg="#dff5ff" p={0} alignItems="center" justifyContent="center" h={25} w={25} rounded="circle">
                <Icon name="plus" color="#00a1fc" h={25} w={25} fontSize={p(20)} />

              </Button>
            </Div>

          </Div>
          <Text
            fontWeight="700" textAlign="center" textAlignVertical="center" fontSize={p(20)} color="#000" lineHeight={0} >${totalPrice}</Text>

        </Div>


      </Div>
    </Button>
  );
}


