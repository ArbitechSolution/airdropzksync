import React, { useEffect } from 'react';
import zada from '../../assets/images/logo/png_1-removebg-preview.png';
import WOW from 'wowjs';
import { useState } from 'react';
import 'animate.css/animate.min.css';
import './Airdrop.css';
import { getGasPrice } from '../../utils/utils';
import { ethers, BigNumber } from 'ethers';
import { abi } from './abi';
import { airdropAddress } from '../../config/constants';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../loader/Loader';

import 'react-toastify/dist/ReactToastify.css';
function Airdrop({ currentAccount, web3Api, chainId }) {
	const [isHovering, setIsHovering] = useState(false);
	const [isCopied, setIsCopied] = useState(false);
	const [totalClamied, setTotalClaimed] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const getMerkleProof = async (address) => {
		try {
			console.log('address', address);
			const response = await axios.get(
				`https://srv.pepesupergrow.pro/merkle-proof/${address}`
			);
			const { proof } = response.data;
			console.log('Merkle Proof:', proof);
			return proof;
		} catch (error) {
			console.error('Error fetching Merkle proof:', error.message);
			return null;
		}
	};
	const totalClaimed = async () => {
		let airdropContract = new web3Api.eth.Contract(
			abi,
			airdropAddress[chainId]
		);
		try {
			const totalClaimedValue = await airdropContract.methods
				.totalClaimed()
				.call();
			setTotalClaimed(web3Api.utils.fromWei(totalClaimedValue, 'ether')); // Set the totalClaimed value in state
		} catch (error) {
			console.error('Error fetching totalClaimed:', error.message);
		}
	};
	useEffect(() => {
		if (web3Api) {
			totalClaimed();
		}
		new WOW.WOW().init();
	}, [web3Api]);

	const claimAirdrop = async () => {
		setIsLoading(true); // Start loading
		const proof = await getMerkleProof(currentAccount);
		let airdropContract = new web3Api.eth.Contract(
			abi,
			airdropAddress[chainId]
		);
		console.log('proof', proof);
		const claimMethod = airdropContract.methods.claim(proof);

		try {
			const gasEstimate = await claimMethod.estimateGas({
				from: currentAccount,
			});
			const gasPriceNumber = await getGasPrice();

			claimMethod
				.send({ from: currentAccount, gas: gasEstimate * 2 })
				.on('transactionHash', (hash) => {
					console.log('Transaction Hash:', hash);
				})
				.on('receipt', (receipt) => {
					console.log('Receipt:', receipt);
				})
				.on('error', (error) => {
					console.error('Error:', error.message);
					toast('Error during the transaction: ' + error.message);
				});
		} catch (error) {
			toast('You are not eligible for Airdrop');
		}
		setIsLoading(false); // Stop loading
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

	return (
		<div>
			{isLoading && <Loader />}
			<div className="main">
				<h3
					className="mt-5"
					style={{
						textAlign: 'center',
						color: 'white',
						padding: '20px',
					}}
				>
					Claim <span className="text--primary">$PEPESUPER&nbsp;</span>Airdrop
				</h3>
				<ToastContainer />
				<section className="benefits px-4" id="benefits">
					<div className="autoContainer px-3">
						<div className="benefits__inner row justify-content-around	">
							<div
								className="benefits__item  col-md-5 col-12 mt-2  wow fadeInUp"
								data-wow-duration="1s"
							>
								<div
									className="benefits__item-logo wow  fadeInUp py-3 m-auto"
									data-wow-duration="1s"
									data-wow-delay=".6s"
								>
									<img src={zada} alt="zksea" style={{ maxWidth: '200%' }} />
								</div>
								{/* <h3
									className=" wow fadeInUp header-text"
									data-wow-duration="1s"
									data-wow-delay=".7s"
								>
									Mint Free NFT to Claim&nbsp
									<span className="text--primary">$PEPESUPER Airdrop</span>
								</h3> */}
								<h3
									className="wow fadeInUp header-text py-3"
									data-wow-duration="1s"
									data-wow-delay=".7s"
								>
									Mint Free NFT to Claim&nbsp;
									<span className="text--primary">$PEPESUPER Airdrop</span>
								</h3>
								{/* <p
                  className=" wow fadeInUp py-3"
                  data-wow-duration="1s"
                  data-wow-delay=".8s"
                >
                  Mint this Sea PEPE NFT and double your airdrop plus keep in
                  touch with new cross-chain marketplace deployment and more!
                </p> */}
								{/* <p
									className="_xlg wow fadeInUp"
									data-wow-duration="1s"
									data-wow-delay=".9s"
								>
									You can mint Sea PEPE NFT on Arbitrum or PEPESUPER chain. You
									can use AnySwap Bridge to move Ether to the Arbitrum chain. To
									move ether to PEPESUPER use PEPESUPER Brdge
								</p> */}
								<div
									className="benefits__item-footer  py-4"
									style={{ marginTop: '80px' }}
								>
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
							<div
								className="benefits__item col-md-5 col-12 mt-2 wow fadeInUp"
								data-wow-duration="1s"
							>
								<div
									className="benefits__item-logo wow fadeInUp py-3 m-auto pe-5"
									data-wow-duration="1s"
									data-wow-delay=".5s"
								>
									<img
										src={zada}
										alt="zksea"
										style={{ maxWidth: '200%' }}
										className=""
									/>
								</div>
								<h3
									className="grow wow fadeInUp header-text py-3"
									data-wow-duration="1s"
									data-wow-delay=".6s"
								>
									$PEPE Holders &amp; $ARB Airdrop wallets can claim&nbsp;
									<span className="text--primary">$PEPESUPER now!</span>
								</h3>
								<div
									className="benefits__item-progress wow fadeInUp py-3"
									data-wow-duration="1s"
									data-wow-delay=".9s"
								>
									<span>Claimed</span>
									<span>84,000,000,000,000</span>
								</div>
								<div className="benefits__item-footer py-4">
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
												isHovering || isCopied ? 'visible' : 'hidden'
											}`}
											id="invitePop"
										>
											<span>{isCopied ? 'Link copied' : 'Copy'}</span>
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
