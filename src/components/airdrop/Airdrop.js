import React, { useEffect } from "react";
import zada from "../../assets/images/airdrop/image.png";
import WOW from "wowjs";
import { useState } from "react";
import "animate.css/animate.min.css";
import "./Airdrop.css";
import { getGasPrice } from "../../utils/utils";
import { ethers, BigNumber } from "ethers";
import { abi } from "./abi";
import { airdropAddress } from "../../config/constants";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Airdrop({ currentAccount, web3Api, chainId }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const getMerkleProof = async (address) => {
    try {
      console.log("address", address);
      const response = await axios.get(
        `https://airdropzkysync.herokuapp.com/merkle-proof/${address}`
      );
      const { proof } = response.data;
      console.log("Merkle Proof:", proof);
      return proof;
    } catch (error) {
      console.error("Error fetching Merkle proof:", error.message);
      return null;
    }
  };
  useEffect(() => {
    new WOW.WOW().init();
  }, []);
  const claimAirdrop = async () => {
    try {
      const proof = await getMerkleProof(currentAccount);
      let airdropContract = new web3Api.eth.Contract(
        abi,
        airdropAddress[chainId]
      );
      console.log("proof", proof);
      const claimMethod = airdropContract.methods.claim(proof);

      try {
        const gasEstimate = await claimMethod.estimateGas({
          from: currentAccount,
        });
        claimMethod
          .send({ from: currentAccount, gas: gasEstimate })
          .on("transactionHash", (hash) => {
            console.log("Transaction Hash:", hash);
          })
          .on("receipt", (receipt) => {
            console.log("Receipt:", receipt);
          })
          .on("error", (error) => {
            console.error("Error:", error.message);
            // alert("Error during the transaction: " + error.message);
            toast.success("Error during the transaction: " + error.message);
          });
      } catch (error) {
        console.error("Error estimating gas:", error);
        // alert("Error estimating gas: " + error.message);
        toast.success("Error estimating gas: " + error.message);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleCopyClick = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const [date, setDate] = useState("10000000");

  const progress = () => {
    setDate(Date);
  };

  return (
    <div>
      <div className="main">
        <section className="benefits" id="benefits">
          <div className="autoContainer">
            <div className="benefits__inner">
              <div
                className="benefits__item wow fadeInUp"
                data-wow-duration="1s"
              >
                <div
                  className="benefits__item-logo wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".6s"
                >
                  <img src={zada} alt="zksea" />
                </div>
                <h3
                  className=" wow fadeInUp header-text"
                  data-wow-duration="1s"
                  data-wow-delay=".7s"
                >
                  Mint Free NFT to Claim
                  <span className="text--primary">$ZKZ Airdrop</span>
                </h3>
                <p
                  className=" wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".8s"
                >
                  Mint this Sea Monster NFT and double your airdrop plus keep in
                  touch with new cross-chain marketplace deployment and more!
                </p>
                <p
                  className="_xlg wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".9s"
                >
                  You can mint Sea Monster NFT on Arbitrum or zkSync chain. You
                  can use AnySwap Bridge to move Ether to the Arbitrum chain. To
                  move ether to zkSync use zkSync Brdge
                </p>
                <div className="benefits__item-footer">
                  <a
                    href="#lastSection"
                    className="button button--primary wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay="1s"
                  >
                    Mint Now
                  </a>
                </div>
              </div>
              <ToastContainer position="top-right" />
              <div
                className="benefits__item wow fadeInUp"
                data-wow-duration="1s"
              >
                <div
                  className="benefits__item-logo wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".5s"
                >
                  <img src={zada} alt="zksea" />
                </div>
                <h3
                  className="grow wow fadeInUp header-text"
                  data-wow-duration="1s"
                  data-wow-delay=".6s"
                >
                  $PEPE Holders &amp; $ARB Airdrop wallets can claim
                  <span className="text--primary">$ZKZ now!</span>
                </h3>
                {/* <div
                  className="benefits__item-progress wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".9s"
                > */}
                <div className="d-flex justify-content-between top_mag w-100">
                  <span>Claimed</span>
                  <span>84,000,000,000,000</span>
                  {/* </div> */}
                </div>
                <div className="progress w-100">
                  <div
                    className="progress-bar progress-bar color_bar"
                    role="progressbar"
                    aria-valuenow={40}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ width: `${progress}%` }}
                  >
                    <div>{date.toString()}</div>
                  </div>
                </div>
                <div className="benefits__item-footer">
                  <a
                    href="#"
                    className="button button--primary wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay="1s"
                    onClick={claimAirdrop}
                  >
                    Claim Air Drop
                  </a>
                  <button
                    className="button button--primary wow fadeInUp invite-friend-button"
                    data-wow-duration="1s"
                    data-wow-delay="1.1s"
                    id="inviteFriend"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleCopyClick}
                  >
                    Invite Friend
                    <div
                      className={`popUp ${
                        isHovering || isCopied ? "visible" : "hidden"
                      }`}
                      id="invitePop"
                    >
                      <span>{isCopied ? "Link copied" : "Copy"}</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Airdrop;
