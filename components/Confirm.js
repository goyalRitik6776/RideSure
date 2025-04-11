import RideSelector from "./RideSelector";
import { useContext, useEffect } from "react";
import { UberContext } from "../context/uberContext";
import { ethers } from "ethers";
import Router, { useRouter } from "next/router";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import detectEthereumProvider from "@metamask/detect-provider";

const style = {
  wrapper: `flex-1 h-full flex flex-col justify-between font-poppins`,
  rideSelectorContainer: `h-full flex flex-col overflow-scroll no-scrollbar`,
  confirmButtonContainer: ` border-t-2 cursor-pointer z-10`,
  confirmButton: `bg-black text-white m-4 py-4 text-center text-xl`,
  distanceContainer: ` text-center py-2 border-t border-black font-bold font-medium`,
};

const Confirm = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    currentAccount,
    pickup,
    dropoff,
    price,
    selectedRide,
    pickupCoordinates,
    dropoffCoordinates,
    metamask,
    setOrderStatus,
    distance,
  } = useContext(UberContext);

  const storeTripDetails = async (pickup, dropoff) => {
    console.log(";price", price);

    if (!price) return;

    if (!window.ethereum) {
      console.log("No Ethereum provider found. Please install MetaMask.");
      return;
    }

    const metamaskProvider = window.ethereum;

    if (!metamaskProvider.isMetaMask) {
      console.log("Connected provider is not MetaMask.");
      return;
    }

    try {
      const txParams = {
        from: currentAccount, // The sender's address (active account)
        to: process.env.NEXT_PUBLIC_UBER_ADDRESS, // Recipient address from env
        gas: "0x5208", // 21,000 gas (standard for simple ETH transfers, adjust as needed)
        value: ethers.utils.parseEther(price.toString())._hex, // Convert price to wei (hex)
      };

      const txHash = await metamaskProvider.request({
        method: "eth_sendTransaction",
        params: [txParams],
      });

      setOrderStatus(txHash);

      await fetch("/api/db/saveTrips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pickupLocation: pickup,
          dropoffLocation: dropoff,
          userWalletAddress: currentAccount,
          price: price,
          selectedRide: selectedRide,
        }),
      });

      router.push("/thanks", "/order?status=complete");
    } catch (error) {
      console.log("error", error);

      if (error.code == "4001") {
        console.log("payment-failed");
      }
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.rideSelectorContainer}>
        {pickupCoordinates && dropoffCoordinates && <RideSelector />}
      </div>
      {pickupCoordinates && dropoffCoordinates && distance ? (
        <div className={style.distanceContainer}>
          Total Distance = {(distance[0] / 1000).toFixed(2)} Kms , Estimated
          Time = {(distance[1] / 60).toFixed(0)} mins
        </div>
      ) : (
        ""
      )}
      {currentAccount ? (
        <div className={style.confirmButtonContainer}>
          <div
            className={style.confirmButton}
            onClick={() => storeTripDetails(pickup, dropoff)}
          >
            Confirm {selectedRide.service || " "}
          </div>
        </div>
      ) : (
        <div className={style.confirmButtonContainer}>
          <div className={style.confirmButton} onClick={handleClickOpen}>
            Confirm {selectedRide.service || " "}
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <div className="w-[320px] h-[180px] bg-black">
              <DialogTitle
                id="alert-dialog-title"
                className="text-2xl font-semibold text-center bg-black text-white"
              >
                {"Confirm Ride?"}
              </DialogTitle>
              <DialogContent className="bg-black">
                <DialogContentText
                  id="alert-dialog-description"
                  className="text-white text-lg text-center"
                >
                  Please Log In to continue
                </DialogContentText>
              </DialogContent>
              <DialogActions className="bg-black pb-4 pr-4 justify-center">
                <button
                  onClick={() => {
                    router.push("/login");
                  }}
                  className="font-bold text-lg border-2 border-white text-blue-600 px-3 py-0.5 rounded-lg mr-2 hover:bg-slate-200 hover:text-black hover:transition ease-in duration-200 "
                >
                  Log In
                </button>
                <button
                  onClick={handleClose}
                  className="font-bold text-lg border-2 border-white text-blue-600 px-3 py-0.5 rounded-lg hover:bg-slate-200 hover:text-black hover:transition ease-in duration-200 "
                >
                  Close
                </button>
              </DialogActions>
            </div>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Confirm;
