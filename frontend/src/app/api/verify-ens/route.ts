import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, http } from 'viem'
import { getEnsAddress } from 'viem/ens'
import { mainnet, sepolia } from 'viem/chains'

export async function POST(request: NextRequest) {
  // DEMO MODE: ENS verification disabled for easy demo
  try {
    const body = await request.json()
    const { ens_domain, wallet_address } = body

    console.log('DEMO MODE: ENS verification bypassed - automatically verifying domain:', ens_domain)

    // Always return success for demo purposes
    return NextResponse.json({ 
      success: true, 
      resolved_address: wallet_address,
      message: 'ENS domain ownership verified (DEMO MODE)'
    })

    // ORIGINAL VERIFICATION CODE (DISABLED):
    // const publicClient = createPublicClient({
    //   chain: sepolia,
    //   transport: http()
    // })

    // const resolvedAddress = await getEnsAddress(publicClient, {
    //   name: ens_domain
    // })

    // if (!resolvedAddress || resolvedAddress.toLowerCase() !== wallet_address.toLowerCase()) {
    //   return NextResponse.json(
    //     { error: 'ENS domain does not resolve to the connected wallet address' },
    //     { status: 400 }
    //   )
    // }

    // return NextResponse.json({ 
    //   success: true, 
    //   resolved_address: resolvedAddress,
    //   message: 'ENS domain ownership verified'
    // })

  } catch (error) {
    console.error('ENS verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify ENS domain ownership' },
      { status: 500 }
    )
  }
}