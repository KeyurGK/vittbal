const BalanceContractAddr = "0xb2eb73e98f8140a46c4fa46d088954c5d16a6d9a";
const BalanceContractABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_deposit",
        type: "uint256",
      },
    ],
    name: "setDeposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "updateBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "currentBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
let BalanceContract = undefined;
let signer = undefined;
const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    BalanceContract = new ethers.Contract(
      BalanceContractAddr,
      BalanceContractABI,
      signer
    );
  });
});
const depositButton = document.querySelector(".deposit_btn");
const updateBalanceButton = document.querySelector(".update_btn");
const currentBalanceButton = document.querySelector(".current_btn");

const setDeposit = async () => {
  const depositAmt = document.getElementById("deposit_ip").value;
  await BalanceContract.setDeposit(depositAmt);
};
const updateBalance = async () => {
  await BalanceContract.updateBalance();
};
const currentBalance = async () => {
  const currentBalance = await BalanceContract.currentBalance();
  document.getElementById("currentBalance_op").value = currentBalance;
};

depositButton.addEventListener("click", setDeposit);
updateBalanceButton.addEventListener("click", updateBalance);
currentBalanceButton.addEventListener("click", currentBalance);
