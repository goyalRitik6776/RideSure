import { createContext, useState, useEffect } from 'react'
import { faker } from '@faker-js/faker'
import detectEthereumProvider from '@metamask/detect-provider'
export const UberContext = createContext()

export const UberProvider = ({ children }) => {
  const [pickup, setPickup] = useState('')
  const [isThere, setIsThere] = useState(false)
  const [ride,setRide] = useState(false)
  const [dark, setDark] = useState('drakosi/ckvcwq3rwdw4314o3i2ho8tph')
  const [orderStatus, setOrderStatus] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [pickupCoordinates, setPickupCoordinates] = useState()
  const [psuggestions, setpSuggestions] = useState([])
  const [dsuggestions, setdSuggestions] = useState([])
  const [dropoffCoordinates, setDropoffCoordinates] = useState()
  const [currentAccount, setCurrentAccount] = useState()
  const [currentUser, setCurrentUser] = useState([])
  const [selectedRide, setSelectedRide] = useState([])
  const [price, setPrice] = useState()
  const [route, setRoute] = useState()
  const [distance, setDistance] = useState([])
  const [basePrice, setBasePrice] = useState();


  let metamask

  if (typeof window !== 'undefined') {
    metamask = window.ethereum
  }
  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  useEffect(() => {
    if (!currentAccount) return
    requestToGetCurrentUsersInfo(currentAccount)
  }, [currentAccount])

  useEffect(() => {
    if (!pickupCoordinates || !dropoffCoordinates) return
    ;(async () => {
      try {
        // const response = await fetch('/api/map/getDuration',{
          const response = await fetch("api/map/getDuration",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pickupCoordinates: `${pickupCoordinates[0]},${pickupCoordinates[1]}`,
            dropoffCoordinates: `${dropoffCoordinates[0]},${dropoffCoordinates[1]}`,
          }),
        })

        const data = await response.json()
        setBasePrice(Math.round(await data.data))
       } catch (error) {
        // console.error(error)
      }
    })()
  }, [pickupCoordinates, dropoffCoordinates])


  //---------------------------------------------------------------------------------------

  useEffect(() => {
    if (!pickupCoordinates || !dropoffCoordinates) return
    ;(async () => {
      try {
        // const response = await fetch('/api/map/getDuration',{
          const response = await fetch("api/map/getRoute",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pickupCoordinates: `${pickupCoordinates[0]},${pickupCoordinates[1]}`,
            dropoffCoordinates: `${dropoffCoordinates[0]},${dropoffCoordinates[1]}`,
          }),
        })

        const data = await response.json()
        setDistance([data.data.distance,data.data.duration])
        setRoute(data.data.geometry.coordinates)
        // console.log("ROUTE",data.data.distance)
       } catch (error) {
        console.error(error)
      }
    })()
  }, [pickupCoordinates, dropoffCoordinates])


  //---------------------------------------------------------------------------------------


  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })

      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0])
        requestToCreateUserOnSanity(addressArray[0])
      }

      console.log("UC",currentAccount)
    } catch (error) {
      // console.error(error)
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      console.log("No Ethereum provider found. Please install MetaMask.");
      return;
    }
  
    try {
      const provider = window.ethereum;
  
      if (!provider.isMetaMask) {
        console.log("Connected provider is not MetaMask.");
        return;
      }
  
      // Check if already connected
      const accounts = await provider.request({ method: "eth_accounts" });
  
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        requestToCreateUserOnSanity(accounts[0]);
      } else {
        // Request connection if not already connected
        const newAccounts = await provider.request({
          method: "eth_requestAccounts",
        });
        if (newAccounts.length > 0) {
          setCurrentAccount(newAccounts[0]);
          requestToCreateUserOnSanity(newAccounts[0]);
        }
      }
    } catch (error) {
      const message = error.message || "An error occurred while connecting to the wallet.";
      console.log("Error:", message, error);
    }
  };

  //---------------------------------------------------------WC------------------------------------------------------------
  
  //-----------------------------------------------------------------------------------------------------------------------

  const createLocationCoordinatePromise = (locationName, locationType) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('api/map/getLC2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            location: locationName,
          }),
        })

        const data = await response.json()

        // console.log(data);
        
        
        if (data.message==='success') {
          // if(locationType==='pickup'){
            

            switch (locationType) {
              case 'pickup':{
                if(pickup!=='' && data.data!=="undefined" &&  data.data.features.length>0)
                setPickupCoordinates(data.data.features[0].center)
                setpSuggestions(data.data.features)
                // console.log("UC",suggestions)
              }
                break
              case 'dropoff':{
                if(dropoff!=='' && data.data!=="undefined" && data.data.features.length>0)
                setDropoffCoordinates(data.data.features[0].center)
                setdSuggestions(data.data.features)
              }
                break
            }
          // }
          resolve()
        } else {
          reject()
        }
      } catch (error) {
        console.error("FROM UC",error)
        // reject()
      }
    })
  }
  
  useEffect(() => {
    if (pickup) {
      ;(async () => {
        { createLocationCoordinatePromise(pickup,'pickup') }

        
      })()
    } else return
  }, [pickup])

  useEffect(() => {
    if (dropoff) {
      ;(async () => {
        { createLocationCoordinatePromise(dropoff,'dropoff') }

        
      })()
    } else return
  }, [dropoff])

  const requestToCreateUserOnSanity = async address => {
    if (!window.ethereum) return
    try {
      await fetch('/api/db/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userWalletAddress: address,
          name: faker.name.findName(),
        }),
      })
    } catch (error) {
      // console.error(error)
    }
  }

  const requestToGetCurrentUsersInfo = async walletAddress => {
    try {
      const response = await fetch(
        `/api/db/getUserInfo?walletAddress=${walletAddress}`,
      )

      const data = await response.json();

      setCurrentUser(data.data)
    } catch (error) {
      // console.error(error)
    }
  }

  return (
    <UberContext.Provider
      value={{
        pickup,
        setPickup,
        dropoff,
        setDropoff,
        pickupCoordinates,
        setPickupCoordinates,
        dropoffCoordinates,
        setDropoffCoordinates,
        connectWallet,
        currentAccount,
        currentUser,
        selectedRide,
        setSelectedRide,
        price,
        setPrice,
        basePrice,
        metamask,
        isThere, 
        setIsThere,
        orderStatus, distance, setDistance,
        setOrderStatus,route, setRoute,
        dark,setDark,ride,setRide,
        psuggestions, setpSuggestions,
        dsuggestions, setdSuggestions,
        
      }}
    >
      {children}
    </UberContext.Provider>
  )
}