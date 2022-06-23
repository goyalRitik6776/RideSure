import RideSelector from './RideSelector'
import { useContext,useEffect } from 'react'
import { useState } from 'react'
import { UberContext } from '../context/uberContext'
import { ethers } from 'ethers'
import Router, { useRouter } from 'next/router'
const style = {
  wrapper: `flex-1 h-full flex flex-col justify-between`,
  rideSelectorContainer: `h-full flex flex-col overflow-scroll no-scrollbar`,
  confirmButtonContainer: ` border-t-2 cursor-pointer z-10`,
  confirmButton: `bg-black text-white m-4 py-4 text-center text-xl`,
  distanceContainer:` text-center py-2 border-y border-x border-black font-bold font-medium`,
}

const Confirm = () => {

  const router = useRouter();

  
 
  const {
    currentAccount,
    pickup,
    dropoff,
    price,
    selectedRide,
    pickupCoordinates,
    dropoffCoordinates,
    metamask,setOrderStatus,distance
  } = useContext(UberContext)



 

  const storeTripDetails = async (pickup, dropoff) => {
    try {
      await fetch('/api/db/saveTrips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickupLocation: pickup,
          dropoffLocation: dropoff,
          userWalletAddress: currentAccount,
          price: price,
          selectedRide: selectedRide,
        }),
      })



       const tx =  await metamask.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to: process.env.NEXT_PUBLIC_UBER_ADDRESS,
            gas: '0x7EF40', // 520000 Gwei
            value: ethers.utils.parseEther(price)._hex,
          },
        ],
      })


      // console.log(tx)
      setOrderStatus(tx)
      // router.push('/thanks')
      router.push("/thanks","/order?status=complete")

    } catch (error) {
      if(error.code == '4001'){
       router.push('/paymentFailed',"/order?status=fail");
        
      }
    
    }


    
  }

  return (
    <div className={style.wrapper}>
      <div className={style.rideSelectorContainer}>
        {pickupCoordinates && dropoffCoordinates && <RideSelector />}
      </div>
      {pickupCoordinates && dropoffCoordinates ?(
         <div className={style.distanceContainer}>
         Total Distance = {(distance[0]/1000).toFixed(2)} Kms , Estimated Time = {(distance[1]/60).toFixed(0)} mins
      </div>
      ):('')}
     
      <div className={style.confirmButtonContainer}>
        <div className={style.confirmButtonContainer}>
          <div
            className={style.confirmButton}
            onClick={() => storeTripDetails(pickup, dropoff)}
          >
            Confirm {selectedRide.service || ' '}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirm