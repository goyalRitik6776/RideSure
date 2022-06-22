const getLocationCoordinates = async (req, res) => {
    const mapboxUrl = `${process.env.MAPBOX_PLACES_API_URL}/${req.body.location}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}&autocomplete=true&country=in`
  
    try {
        // console.log(mapboxUrl)
      const response = await fetch(mapboxUrl)
      const data = await response.json()
      // console.log("LC2",data.features)
      res.status(200).send({ message: 'success', data: data})
    } catch (error) {
      res.status(500).send({ message: 'error', data: error.message })
    }
  }
  
  export default getLocationCoordinates