import React, { useEffect } from 'react';
import zada from '../../assets/images/airdrop/image.png';
import WOW from 'wowjs';
import { useState } from 'react';
import 'animate.css/animate.min.css';
import './Airdrop.css';
import { getGasPrice } from '../../utils/utils';
import { ethers, BigNumber } from 'ethers';
import { abi } from './abi';
import { airdropAddress } from '../../config/constants';

function Airdrop({ currentAccount, web3Api, chainId }) {
	useEffect(() => {
		new WOW.WOW().init();
	}, []);

	const [isHovering, setIsHovering] = useState(false);
	const [isCopied, setIsCopied] = useState(false);
	const claimAirdrop = async () => {
		try {
			let airdropContract = new web3Api.eth.Contract(
				abi,
				airdropAddress[chainId]
			);
			console.log('airdropContract', airdropContract);

			const claimMethod = airdropContract.methods.claim([
				'0x708e7cb9a75ffb24191120fba1c3001faa9078147150c6f2747569edbadee751',
			]);

			try {
				const gasEstimate = await claimMethod.estimateGas({
					from: currentAccount,
				});
				claimMethod
					.send({ from: currentAccount, gas: gasEstimate })
					.on('transactionHash', (hash) => {
						console.log('Transaction Hash:', hash);
					})
					.on('receipt', (receipt) => {
						console.log('Receipt:', receipt);
					})
					.on('error', (error) => {
						console.error('Error:', error.message);
						alert('Error during the transaction: ' + error.message);
					});
			} catch (error) {
				console.error('Error estimating gas:', error);
				alert('Error estimating gas: ' + error.message);
			}
		} catch (error) {
			console.log('error', error.message);
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
								<div
									className="benefits__item-progress wow fadeInUp"
									data-wow-duration="1s"
									data-wow-delay=".9s"
								>
									<span>Claimed</span>
									<span>84,000,000,000,000</span>
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
