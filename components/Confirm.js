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
  wrapper: `flex-1 h-full flex flex-col justify-between`,
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
    try {
      if (price <= 0) return;
      console.log("HELLO");
      const provider = await detectEthereumProvider();
      const metamaskProvider = window.ethereum.providers.find(
        (provider) => provider.isMetaMask
      );
      console.log(metamaskProvider);
      const tx = await metamaskProvider.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: process.env.NEXT_PUBLIC_UBER_ADDRESS,
            gas: "0x7EF40", // 520000 Gwei
            value: ethers.utils.parseEther(price)._hex,
          },
        ],
      });

      setOrderStatus(tx);
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
      if (error.code == "4001") {
        router.push("/paymentFailed", "/order?status=fail");
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
              className="text-2xl font-semibold font-sans text-center bg-black text-white"
            >
              {"Confirm Ride?"}
            </DialogTitle>
            <DialogContent className="bg-black">
              <DialogContentText
                id="alert-dialog-description"
                className="text-white text-lg font-sans text-center"
              >
                Please Log In to continue
              </DialogContentText>
            </DialogContent>
            <DialogActions className="bg-black pb-4 pr-4 justify-center">
              <button
                onClick={() => {
                  router.push("/login");
                }}
                className="font-mono font-bold text-lg border-2 border-white text-blue-600 px-2 rounded-lg mr-2 hover:bg-slate-200 hover:text-black hover:transition ease-in duration-200 "
              >
                Log In
              </button>
              <button
                onClick={handleClose}
                className="font-mono font-bold text-lg border-2 border-white text-blue-600 px-2 rounded-lg hover:bg-slate-200 hover:text-black hover:transition ease-in duration-200 "
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
