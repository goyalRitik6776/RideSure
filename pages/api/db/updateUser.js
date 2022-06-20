import { client } from '../../../lib/sanity'

const updateUserInSanity = async (req, res) => {
  try {
    // const userDoc = {
    //   _type: 'users',
    //   _id: req.body.userWalletAddress,
    //   name: req.body.name,
    //   walletAddress: req.body.userWalletAddress,
    // }

    {
         mutations : [
          {
            patch: {
             _type: 'users',
              _id: req.body.userWalletAddress,
            //   "ifRevisionID": string,
              set:{
                "name": "John"
              },
            //   "setIfMissing": setIfMissing,
            //   "unset": unset,
            //   "inc": inc,
            //   "dec": dec,
            //   "insert": insert,
            //   "diffMatchPatch": diffMatchPatch,
            }
          }
        ]
      }
  

    // await client.createIfNotExists(userDoc)

    res.status(200).send({ message: 'success' })
  } catch (error) {
    res.status(500).send({ message: 'error', data: error.message })
  }
}

export default updateUserInSanity