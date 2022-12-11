import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CarStoreModel } from "./CarStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
    carStore: types.optional(CarStoreModel, {}), // @demo remove-current-line
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
