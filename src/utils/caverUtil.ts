import { wallet } from "../configs/Caver";

export const removeKeyring = (address:string) => {
    if(wallet.isExisted(address)) wallet.remove(address);
}
export const updateKeyring = (address:string, privateKey:string) => {
    removeKeyring(address)
    return wallet.newKeyring(address, privateKey);
}