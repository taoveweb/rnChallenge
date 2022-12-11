import { el } from "date-fns/locale";
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"


const CarItemModel = types.model({
    imgUrl: types.string,
    name: types.string,
    describe: types.string,
    price:types.number,
    format: types.array(types.string),
    quantity: types.number,
    id: types.string,
})

export const CarStoreModel = types
    .model("CarStore")
    .props({
        price: 0,
        cartList: types.array(CarItemModel)
    })
    .actions(withSetPropAction)
    .actions((store) => ({
        async addToCar(item,quantity) {
            const { cartList } = store;
            let isIn = false;
            const newList: any = cartList.map(el => {
                if (el.id === item.id) {
                    el.quantity = el.quantity + quantity;
                    isIn = true;
                 return  {...el,...item};
                }
                return el;
            });
            if (!isIn) {
                newList.push({
                    ...item,
                    quantity,
                    //format: ['Physical copy', 'Digital copy (.jpeg)']
                  });
            }
            store.cartList = newList;
          return Promise.resolve(true);
        },
         addStep(id:string) {
            const { cartList } = store;
            let isIn = false;
            const newList: any = cartList.map(el => {
                if (el.id === id) {
                    el.quantity = el.quantity +1;
                    isIn = true;
                }
                return el;
            });
            store.cartList = newList;
        },
        subtractStep(id:string) {
            const { cartList } = store;
            let remove=false;
            const newList: any = cartList.map(el => {
                if (el.id === id) {
                    el.quantity = el.quantity - 1;
                    if(el.quantity==0){
                        remove=true;
                    }
                }
                return el;
            });
            store.cartList = newList;
            if(remove){
                this.remove(id);
            }
        },
        remove(id:string) {
            const { cartList } = store;
            const newList:any = cartList.filter(el => el.id !== id);
            store.cartList = newList;
        }
    }))
    .views((store) => ({

    }))
export interface CarItem extends Instance<typeof CarItemModel> { }
export interface CarStore extends Instance<typeof CarStoreModel> { }
export interface CarStoreSnapshot extends SnapshotOut<typeof CarStoreModel> { }

// @demo remove-file
