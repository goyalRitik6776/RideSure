import Navbar from '../components/Navbar'
import Map from '../components/Map'
import { useState } from 'react'
import Confirm from '../components/Confirm'
import LocationSelector from '../components/LocationSelector'
const style = {
   wrapper: `h-screen w-screen flex flex-col `,
    main: `h-full w-screen flex-1 z-10 `,
    mapContainer: `flex-1 w-full h-full`,
    rideRequestContainer: `h-full w-[350px] md:w-[400px] md:ml-[1rem] py-[3rem] absolute md:top-7 md:left-5 flex flex-col justify-end z-10 `,
    rideRequest: `h-full max-h-[700px] bg-white rounded-lg flex flex-col overflow-scroll no-scrollbar  scale-75 md:scale-85 lg:scale-90 `,
}

export default function Home() {
  const [r,setr] = useState(false)

  


  return (

    

    
    <div className={style.wrapper}>
      {/* {Comp()} */}

      {/* <Navbar /> */}
      <Navbar setr = {setr} r={r}/>
      <div className={style.main}>
        <Map />
      </div>
    {r?(
       <div className={style.rideRequestContainer}>
       <div className={style.rideRequest}>
         <LocationSelector />
         <Confirm />
       </div>
     </div>
    ):("")}
     


 
    </div>
  )
}