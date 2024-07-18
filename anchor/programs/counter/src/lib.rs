#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("43Mr5YN8ktoWwFLtr8GEZQ6D3kYtwwyaJjK3ZR6bnLMY");

#[program]
pub mod issuer {
    use super::*;

    pub fn create_cert_issuer(
        ctx: Context<CreateCertIssuer>,
        name: String,
        address: String,
       // typ_issuer: TypeIssuer,
    ) -> Result<()> {
        msg!("Certification Issuer Created");
        msg!("Name: {}", name);
        msg!("Adress: {}", address);
       // msg!("Type: {:?}", typ_issuer);

        let cert_issuer = &mut ctx.accounts.cert_issuer;
        cert_issuer.owner = ctx.accounts.owner.key();
        cert_issuer.name = name;
        cert_issuer.address = address;
      //  cert_issuer.typ_issuer = typ_issuer;
        cert_issuer.validated = false;
        cert_issuer.active = false;

        Ok(())
    }

    pub fn activate_desactivate_cert_issuer(
        ctx: Context<UpdateCertIssuer>,
        active: bool,
    ) -> Result<()> {
        msg!("Certification Issuer Activation/Desactivation");
        msg!("Active: {}", active);

        let cert_issuer = &mut ctx.accounts.cert_issuer;
        cert_issuer.active = active;

        Ok(())
    }

    pub fn validate_unvalidation_cert_issuer(
        ctx: Context<UpdateCertIssuer>,
        validated: bool,
    ) -> Result<()> {
        msg!("Certification Issuer Validation/Unvalidation");
        msg!("Validated: {}", validated);

        let cert_issuer = &mut ctx.accounts.cert_issuer;
        cert_issuer.validated = validated;

        Ok(())
    }

    pub fn delete_cert_issuer(_ctx: Context<DeleteCertIssuer>, name: String) -> Result<()> {
        msg!("Certification Issuer {} Deleted", name);
        Ok(())
    }

}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct CreateCertIssuer<'info> {
    #[account(
    init,
    payer =owner,
    space = 8 + CertIssuerState::MAX_SIZE, 
    seeds= [b"Issuer".as_ref(),name.as_bytes(), owner.key().as_ref()],
    bump,
  )]
    pub cert_issuer: Account<'info, CertIssuerState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateCertIssuer<'info> {
    #[account(mut, has_one=owner )]
    pub cert_issuer: Account<'info, CertIssuerState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct DeleteCertIssuer<'info> {
    #[account(
    mut,
    seeds= [b"Issuer".as_ref(),name.as_bytes(), owner.key().as_ref()],
    bump,
    close=owner,
  )]
    pub cert_issuer: Account<'info, CertIssuerState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct CertIssuerState {
    pub owner: Pubkey,          //32
    pub name: String,           //32
    pub address: String,        //32
   // pub typ_issuer: TypeIssuer, // 1 + 1
    pub validated: bool,        // 1
    pub active: bool,           // 1
}

impl CertIssuerState {
    pub const MAX_SIZE: usize = 32 + 32 + 32 + (1 + 1) + 1 + 1;
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, Debug)]
#[repr(u8)]
pub enum TypeIssuer {
    School = 0,
    University = 1,
    TrainingCenter = 2,
}


