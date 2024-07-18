'use client';

import {
  getIssuerProgram,
  getIssuerProgramId,
} from '@certi-sol-issuer/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';


interface CertIssuerArgs {
  owner: PublicKey,
  name: string,
  address: string,
};

export function useIssuerProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getIssuerProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getIssuerProgram(provider);

  const accounts = useQuery({
    queryKey: ['issuer', 'all', { cluster }],
    queryFn: () => program.account.certIssuerState.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });


  //Create Certification Issuer
  const createCertIssuer = useMutation<string, Error, CertIssuerArgs>({
    mutationKey: ['issuer', 'create', { cluster }],
    mutationFn: async ({ name, address, owner }) => {
      const [certIssuerAddress] = await PublicKey.findProgramAddress(
        [Buffer.from('Issuer'), Buffer.from(name), owner.toBuffer()],
        programId
      );
      console.log({ certIssuerAddress });

      return program.methods.createCertIssuer(name, address).accounts({ cert_issuer: certIssuerAddress }).rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    createCertIssuer,
  };
}



export function useIssuerProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useIssuerProgram();

  const accountQuery = useQuery({
    queryKey: ['issuer', 'fetch', { cluster, account }],
    queryFn: () => program.account.certIssuerState.fetch(account),
  });



  /*   const closeMutation = useMutation({
      mutationKey: ['counter', 'close', { cluster, account }],
      mutationFn: () =>
        program.methods.close().accounts({ counter: account }).rpc(),
      onSuccess: (tx) => {
        transactionToast(tx);
        return accounts.refetch();
      },
    }); */







  return {
    accountQuery,
    //closeMutation,

  };
}
