// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import IssuerIDL from '../target/idl/issuer.json';
import type { Issuer } from '../target/types/issuer';

// Re-export the generated IDL and type
export { Issuer, IssuerIDL };

// The programId is imported from the program IDL.
export const ISSUER_PROGRAM_ID = new PublicKey('43Mr5YN8ktoWwFLtr8GEZQ6D3kYtwwyaJjK3ZR6bnLMY');

// This is a helper function to get the Counter Anchor program.
export function getIssuerProgram(provider: AnchorProvider) {
  return new Program(IssuerIDL as Issuer, provider);
}

// This is a helper function to get the program ID for the Counter program depending on the cluster.
export function getIssuerProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Counter program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg');
    case 'mainnet-beta':
    default:
      return ISSUER_PROGRAM_ID;
  }
}
