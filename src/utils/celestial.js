import { Celestial as $Celestial, Module } from 'celestial';

export let Celestial;

export const init = async options => {
    const rpcAddr = '206.81.29.202:26657';
    Celestial = await $Celestial.create({
        rpcAddress: rpcAddr,
        modules: [Module.BANK, Module.AUTH],
        options,
    });
};
