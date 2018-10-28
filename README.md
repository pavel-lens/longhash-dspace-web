# Longhash Hackathon - DSpace dapp using everiToken NTF tokens

Longhash Hackathon - everiToken: Shared office dapp implemented using Non-fungible Tokens (NFT).

Screenshots:

![Main page](https://cdn.pbrd.co/images/HKxYfV9.png)

![Host dashboard](https://cdn.pbrd.co/images/HKxYyWL.png)

![Host Property](https://cdn.pbrd.co/images/HKxYFYy.png)

![Rentee Dashboard](https://cdn.pbrd.co/images/HKxYNa9.png)

This is a simple application showing how we can use NTFs (non-fungible tokens) to grant access to access office space to people using everiToken blockchain network.

There are 3 roles in this sceario:

1. Master - owns "domain" for NFT space (for more information see everiToken documentation)
2. Host - owns properties (offices) to rent
3. Rentee - wants to rent and access office

## Instal and run

`npm install` and `npm start`

You should see application start:

```
Server started ! ✓

Access URLs:
-----------------------------------
Localhost: http://localhost:3000
      LAN: http://10.19.83.12:3000
-----------------------------------
Press CTRL-C to stop
```

## Important: Private and public keys

If you want to change private and public keys, you have to edit these 2 files:

```
./.env
./app/data/keys.js
```

#### Author

Pavel Svitek (http://pavelsvitek.com)

#### License

This project is licensed under the MIT license, Copyright (c) 2018 Pavel Svitek.
For more information see `LICENSE.md`.
