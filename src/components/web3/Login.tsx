import React, {useState} from "react";
import Web3 from "web3";
import {NFT} from "../../utils/nft";

const Login = () => {
  const web3 = new Web3(Web3.givenProvider);
  const [globalAccounts, setGolabAccounts] = useState();
  const [nftAddress, setNftAddress] = useState();
  const [globalListTemplates, setGlobalListTemplates] = useState([]);
  const [fglobalTemplatesLoaded, setFglobalTemplatesLoaded] = useState(false);

  function getTemplates(): void {
    const nrTemplates 
  }
  return <p>Hello</p>;
};

export default Login;
