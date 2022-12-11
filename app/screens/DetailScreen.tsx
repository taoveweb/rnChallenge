import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { Div, Icon, Snackbar } from 'react-native-magnus';

import { AppStackScreenProps } from "../navigators"; // @demo remove-current-line
import p from "../utils/px2dp";
import { useHeader } from "../utils/useHeader";
import ProductItem from "./components/ProductItem";

interface DetailScreenProps extends AppStackScreenProps<"Home"> { } // @demo remove-current-line


export const DetailScreen: FC<DetailScreenProps> = observer(function DetailScreen(props
) {
    const {navigation,route}:any =props;
    const {name=route.name}=route?.params;
    
    useHeader({
        leftIcon:'back',
        title:name,
        onLeftPress:()=>{
            navigation.goBack();
        },
      })

    const snackbarRef: any = React.createRef();

    const renderItem = (item: any) => (
        <ProductItem show={(item, val) => {
            if (snackbarRef.current) {
                snackbarRef.current.show(
                    `${val}  ${item.name} Add to car success !`,
                    {
                        duration: 2000,
                        suffix: <Icon
                            name="success"
                            color="white"
                            fontSize="md"
                            fontFamily="AntDesign"
                        />
                    }
                );
            }
        }} {...item} />
    );
    return (
        <Div flex={1} bg="#fff" >
            {renderItem(route?.params)}
            <Snackbar
                offset={p(500)}
                ref={snackbarRef}
                bg="green700"
                color="white"
            ></Snackbar>
        </Div>
    )
})


