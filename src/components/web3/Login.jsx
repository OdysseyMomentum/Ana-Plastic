import React, { useState } from "react";
import Web3 from "web3";
import { NFT } from "../../utils/nft";

const Login = () => {
  const web3 = new Web3(Web3.givenProvider);
  const [globalAccounts, setglobalAccounts] = useState();
  const [nftAddress, setNftAddress] = useState();
  const [globalListTemplates, setGlobalListTemplates] = useState([]);
  const [fglobalTemplatesLoaded, setFglobalTemplatesLoaded] = useState(false);
  const [globalBadgeInfo, setGlobalBadgeInfo] = useState([]);
  let contract = new web3.eth.Contract(
    NFT,
    "0x12e424d02Fd26A5DC5A388d7d52371d45eBDd211"
  );

  async function getTemplates() {
    const nrTemplates = await contract.methods.nrTemplates().call();
    for (let i = 0; i < nrTemplates; i += 1) {
      const info = await contract.methods.GetTemplateInfo(i).call();
      setGlobalListTemplates((globalListTemplates) => [
        ...globalListTemplates,
        info,
      ]);
    }
    setFglobalTemplatesLoaded(true);
  }

  function findBadge(wantedName) {
    if (!fglobalTemplatesLoaded) return undefined;
    for (let i = 0; i < globalListTemplates.length; i += 1) {
      const name = globalListTemplates[i].name;
      if (name === wantedName) return i;
    }
    return -1;
  }

  async function getJson(source) {
    const f = await fetch(source);
    try {
      const items = await f.json();
      return items;
    } catch (e) {
      console.error(`error ${e} ${source}`);
    }

  }

  async function getWorldBadge() {
    const sbn = "Worldbatch";
    if (!web3) {
      console.log("Login first");
      return;
    }

    if (!fglobalTemplatesLoaded) {
      console.log("List of badges is not loaded yet, wait a while and retry");
      return;
    }

    const wantedDid = findBadge(sbn);

    if (wantedDid < 0) {
      console.log(`No badges are present ${sbn} ${wantedDid}`);
      return;
    }

    const balance = await web3.eth.getBalance(globalAccounts[0]);
    console.log(`balance ${web3.utils.fromWei(balance, "ether")} ether`);
    console.log(`my balance ${balance}`);

    const privateKey =
      "0x0da19552d21de3da01e4a5ff72f6722b9a86c78ee6c6a46e5cdcf0fb5a936110"; // note very insecure, but for test ETH this is usable
    const addressFaucet = web3.eth.accounts.privateKeyToAccount(privateKey)
      .address;
    console.log(addressFaucet);
    web3.eth.accounts.wallet.add(privateKey);
    const value = web3.utils.toWei("10", "milli");
    console.log(value);

    if (balance < value) {
      console.log("Wait 20 seconds to get some ETH");
      result = await web3.eth
        .sendTransaction({
          from: addressFaucet,
          to: globalAccounts[0],
          gas: 200000,
          value: value,
        })
        .catch((x) => console.log(`Error: ${x.code} ${x.message}`));
      const etherscan = `https://rinkeby.etherscan.io/tx/${result.transactionHash}`;
      console.log(`<a href="${etherscan}" target="_blank">etherscan</a>`);
    }

    balance = await web3.eth.getBalance(globalAccounts[0]);
    console.log("Confirm metamask popup and wait 20 seconds");
    const result = await contract.methods
      .createToken(globalAccounts[0], wantedDid)
      .send({ from: globalAccounts[0] });
    console.log("after");
    const id = result.events.Transfer.returnValues._tokenId;
    const etherscan = `https://rinkeby.etherscan.io/tx/${result.blockHash}`;
    console.log("Badge received");
    console.log(`Details about this badge...<br>`);
    console.log(`id:${id}<br>`);
    const opensea = `https://rinkeby.opensea.io/assets/${nftAddress}/${id}`;
    console.log(`<a href="${opensea}" target="_blank">opensea</a><br>`);
  }

  async function login() {
    if (!window.ethereum) {
      console.log("Install metamask");
      return;
    }

    const result = await web3.eth
      .requestAccounts()
      .catch((x) => console.log(x.message));
    const gba = await web3.eth
      .getAccounts()
      .catch((x) => console.log(x.message));
    setglobalAccounts(gba);

    const nid = await web3.eth.net.getId();
    if (nid != 4) {
      console.log(
        `Make sure you are on the Rinkeby network (currently ${nid})`
      );
      return;
    }

    const nft_jsonurl =
      "https://raw.githubusercontent.com/OdysseyMomentum/Ana-Plastic/main/badges/build/contracts/WORLDNFT.json";
    const nft_jsonobject = await getJson(nft_jsonurl);
    nftAddress = nft_jsonobject.networks[nid].address;
    const nft_code = await web3.eth.getCode(nftAddress);
    if (nft_code.length <= 2) {
      console.error("No contract code");
    } else {
      contract = await new web3.eth.Contract(
        nft_jsonobject.abi,
        nft_jsonobject.networks[nid].address
      );
      await getTemplates();
    }
  }

  return <button onClick={() => login()}>Login</button>;
};

export default Login;
