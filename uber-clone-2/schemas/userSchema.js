export const userSchema = {
    name: 'users',
    type: 'document',  // Wallet Address
    title: 'Users',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name',
      },
      {
        name: 'walletAddress',
        type: 'string',
        title: 'Wallet Address',
      },
      {
        name: 'profileImage',
        type: 'image',
        title: 'Profile Image',
      },
    ],
  }