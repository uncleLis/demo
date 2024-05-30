import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const contractAddress = '0x91087D561E7B5e0737a5420806dAa8e8A55dEBe6'; // 替换为你的合约地址
const contractABI = 
    [{"inputs":[{"internalType":"string","name":"_message","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_message","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}]
;

const App = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [message, setMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const init = async () => {
      // 连接到以太坊网络（使用 MetaMask 提供的提供者）
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      // 请求用户授权
      await provider.send('eth_requestAccounts', []);

      // 获取签名者
      const signer = provider.getSigner();
      setSigner(signer);

      // 获取用户账户
      const account = await signer.getAddress();
      setAccount(account);

      // 获取账户余额
      const balance = await provider.getBalance(account);
      setBalance(ethers.utils.formatEther(balance));

      // 创建合约实例
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(contract);

      // 获取合约中的消息
      const message = await contract.message();
      setMessage(message);
    };

    init();
  }, []);

  const handleSetMessage = async () => {
    console.log(1231255)
    if (contract) {
        console.log(contract,'33333333')
      const tx = await contract.setMessage(newMessage);
      console.log(tx,'tx112312312')
      await tx.wait();
      const message = await contract.message();
      setMessage(message);
    }
  };

  return (
    <div>
      <h1>Ethers.js Demo</h1>
      <div>
        <p>Account: {account}</p>
        <p>Balance: {balance} ETH</p>
        <p>Message: {message}</p>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter new message"
        />
        <button onClick={handleSetMessage}>Set Message</button>
      </div>
    </div>
  );
};

export default App;
