// import { createPublicClient, http } from 'viem';
// import './App.css'
// import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';
// import { mainnet } from 'viem/chains';

// const client = createPublicClient({
//   chain: mainnet,
//   transport: http()
// })


// async function getBalance() {
//   const client = createPublicClient({
//     chain: mainnet,
//     transport: http(),
//   });

//   const balance = await client.getBalance({address: "0x075c299cf3b9FCF7C9fD5272cd2ed21A4688bEeD"})
//   return balance.toString();
// }


// const queryClient = new QueryClient()


// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Todos />
//     </QueryClientProvider>
//   )
// }

// function Todos() {
//   // Queries
//   const query = useQuery({ queryKey: ['balance'], queryFn: getBalance ,refetchInterval: 10 * 1000 })

//   return (
//     <div>
//       Balance:
//       {query.data}
//     </div>
//   )
// }

// export default App

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {  mainnet } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'
import { http, createConfig, WagmiProvider } from 'wagmi'

import {  useConnect } from 'wagmi'


export const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http()
  },
})

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletOptions />
      </QueryClientProvider>
    </WagmiProvider>
  )
}


function WalletOptions() {
  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}

export default App
