import React, { useState } from "react";
import {
    Button, Div, Image, Input, Select, Text
} from 'react-native-magnus';
import { useStores } from "../../models";
import p from "../../utils/px2dp";



export type itemType = {
    imgUrl: string;
    name: string;
    describe: string;
    price: number;
    format: string[];
    id: string;
}


export interface ItemProps extends itemType {
    index: number;
    navigation: any;
    show: (item: itemType, val: number) => void;
}
export default function ProductItem(props: ItemProps) {
    const { carStore }: any = useStores();
    const { show, navigation, ...item } = props;
    const { imgUrl,
        name,
        describe,
        price,
        format,
        id } = item;
    const [quantity, setQuantity]: any = useState<number>(1);
    const [selectValue, setSelectedValue] = useState('Physical copy');
    const selectRef: any = React.createRef();
    return (<Div key={id} flex={1} m={p(28)} mb={p(64)}>
        <Button bg="transparent" block row={false} onPress={() => {
            navigation.push('Detail', { ...item })
        }}>
            <Div>
                <Image
                    source={{
                        uri: imgUrl,
                    }}
                    bg="#f1f1f1"
                    rounded={p(8)}
                    h={p(364)}
                    w={p(444)}
                />
                <Text fontSize={p(40)} fontWeight="600" lineHeight={0} py={p(28)} >{name}{id}</Text>
                <Text fontSize={p(20)} lineHeight={0} >{describe}</Text>
            </Div>

        </Button>
        <Div row mt={p(25)} mb={p(16)}   >
            <Div row={false} w={p(90)} >
                <Text mb={p(6)} fontSize={p(12)} color="#6b6b6b" lineHeight={0} >QUANTITY</Text>
                <Input
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                    value={`${quantity}`}
                    p={0}
                    h={p(49)}
                />
            </Div>
            <Div flex={1} ml={p(16)} >
                <Text mb={p(6)} fontSize={p(12)} color="#6b6b6b" lineHeight={0} >FORMAT</Text>
                <Button
                    block
                    m={0}
                    borderWidth={1}
                    w={'100%'}
                    h={p(49)}
                    fontSize={p(20)}
                    py={0}
                    bg="white"
                    color="gray900"
                    borderColor="gray300"
                    onPress={() => {
                        if (selectRef.current) {
                            selectRef.current.open();
                        }
                    }}>
                    {selectValue.toString()}
                </Button>
                <Select
                    onSelect={(value) => {
                        setSelectedValue(value)
                    }}
                    ref={selectRef}
                    title="Select Format"

                    value={selectValue}
                    data={format}
                    renderItem={(item, index) => (
                        <Select.Option value={item} py="md" px="xl">
                            <Text>{item}</Text>
                        </Select.Option>
                    )} />
            </Div>

        </Div>
        <Div h={p(49)} row flex={1}>
            <Div row alignItems="center" w={p(90)} justifyContent="center" h={p(49)} mr={p(16)} >
                <Text
                    fontWeight="700" textAlign="center" textAlignVertical="center" fontSize={p(20)} color="#000" lineHeight={0} >${price * quantity}</Text>
            </Div>

            <Button
                flex={1}
                w={'100%'}
                h={p(49)}
                fontSize={p(20)}
                bg="#003380"
                color="#fff"
                fontWeight="700"

                onPress={async () => {
                    const ret = await carStore.addToCar(item, Number(quantity))
                    if (ret) {
                        show(item, quantity)
                    }
                }}>
                Add to cart
            </Button>
        </Div>

    </Div>
    );
}


