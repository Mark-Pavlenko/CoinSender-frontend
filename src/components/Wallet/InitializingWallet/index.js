import { useContext } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { WALLETS } from "../../../utils/const";

import s from "./InitializingWallet.module.scss";
// import Loader from "@modules/look/Loader";
import metaLogo from "../../../assets/images/wallet-icons/metamask.svg";
import walletConnectLogo from "../../../assets/images/wallet-icons/wallet-connect.svg";

const InitializingWallet = ({ connector, error = false, activateWallet, setPendingError }) => {
	return (
		<>
			<Stack className={s.initializingWallet} wrap={false} align='middle'>
				{error ? (
					<>
						Error Connecting
						<Button
							className='button-3 btn-error small'
							onClick={() => {
								setPendingError(false);
								connector && activateWallet(connector);
							}}>
							try again
						</Button>
					</>
				) : (
					<>
						{/* <Loader isDark={isLightMode} /> */}
						Waiting...
					</>
				)}
			</Stack>
			{WALLETS.map(({ name, icon, walletConnector }) => {
				if (walletConnector === connector) {
					return (
						<Stack
							direction='row'
							className={s.initializingWallet__wallet}
							wrap={false}
							sx={{ justifyContent: "space-between" }}
							key={name}>
							<div>
								<p>{name}</p>
								<span>Connecting to {name}</span>
							</div>
							{name == "Metamask" && <img src={metaLogo} alt='icon' />}
							{name == "WalletConnect" && <img src={walletConnectLogo} alt='icon' />}
						</Stack>
					);
				}
				return null;
			})}
		</>
	);
};

export default InitializingWallet;
