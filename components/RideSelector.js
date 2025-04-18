import Image from 'next/image'
import ethLogo from '../assets/eth-logo.png'
import { useEffect, useContext, useState } from 'react'
import { UberContext } from '../context/uberContext'
import auto from '../assets/rides/auto.jpeg'

const style = {
  wrapper: `h-full flex flex-col overflow-auto no-scrollbar`,
  title: `text-gray-500 text-center text-xs py-2 border-b`,
  car: `flex p-3 m-2 items-center border-2 border-white overflow-scroll no-scrollbar`,
  selectedCar: `border-2 rounded-lg border-gray-400 flex p-3 m-2 items-center `,
  carList:`overflow-scroll no-scrollbar cursor-pointer`,
  carImage: `h-14`,
  carDetails: `ml-2 flex-1`,
  service: `font-medium`,
  time: `text-xs text-blue-500`,
  priceContainer: `flex items-center`,
  price: `mr-[-0.8rem]`,
}

const RideSelector = () => {
  const [carList, setCarList] = useState([])
  const { selectedRide, setSelectedRide, setPrice, basePrice } =
    useContext(UberContext)

  // console.log(basePrice)

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch('/api/db/getRideTypes');
        const data = await response.json()
        setCarList(data.data)
        setSelectedRide(data.data[0])
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Choose a ride, or swipe up for more</div>
      <div className={style.carList}>
        {carList.map((car, index) => (
          <div
            key={index}
            className={`${
              selectedRide.service === car.service
                ? style.selectedCar
                : style.car
            }`}
            onClick={() => {
              setSelectedRide(car)
              setPrice(((basePrice / 10 ** 5) * car.priceMultiplier).toFixed(5))
            }}
          >
            <Image
              src={car.iconUrl}
              alt=""
              className={style.carImage}
              height={50}
              width={50}
            />
            <div className={style.carDetails}>
              <div className={style.service}>{car.service}</div>
              <div className={style.time}>{(car.priceMultiplier*4).toFixed(0)} Mins away</div>
            
            </div>
            <div className={style.priceContainer}>
              <div className={style.price}>
                {((basePrice / 10 ** 5) * car.priceMultiplier).toFixed(5)}
              </div>

              {/* {console.log(setPrice)} */}
              {console.log(basePrice)}
              {/* {console.log(price)} */}
              <Image src={ethLogo}
              alt=""
               height={25} width={40} />
            </div>
          </div>
        ))}
      </div>
    </div>
    
  )
}

export default RideSelector