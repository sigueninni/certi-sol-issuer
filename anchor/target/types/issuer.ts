/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/issuer.json`.
 */
export type Issuer = {
  "address": "43Mr5YN8ktoWwFLtr8GEZQ6D3kYtwwyaJjK3ZR6bnLMY",
  "metadata": {
    "name": "issuer",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "activateDesactivateCertIssuer",
      "discriminator": [
        79,
        160,
        168,
        216,
        56,
        29,
        4,
        235
      ],
      "accounts": [
        {
          "name": "certIssuer",
          "writable": true
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "certIssuer"
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "active",
          "type": "bool"
        }
      ]
    },
    {
      "name": "createCertIssuer",
      "discriminator": [
        187,
        75,
        18,
        161,
        103,
        170,
        122,
        96
      ],
      "accounts": [
        {
          "name": "certIssuer",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  73,
                  115,
                  115,
                  117,
                  101,
                  114
                ]
              },
              {
                "kind": "arg",
                "path": "name"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "address",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteCertIssuer",
      "discriminator": [
        219,
        71,
        97,
        83,
        79,
        244,
        254,
        171
      ],
      "accounts": [
        {
          "name": "certIssuer",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  73,
                  115,
                  115,
                  117,
                  101,
                  114
                ]
              },
              {
                "kind": "arg",
                "path": "name"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "validateUnvalidationCertIssuer",
      "discriminator": [
        226,
        151,
        129,
        107,
        215,
        214,
        59,
        29
      ],
      "accounts": [
        {
          "name": "certIssuer",
          "writable": true
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "certIssuer"
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "validated",
          "type": "bool"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "certIssuerState",
      "discriminator": [
        227,
        166,
        228,
        178,
        228,
        246,
        107,
        239
      ]
    }
  ],
  "types": [
    {
      "name": "certIssuerState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "address",
            "type": "string"
          },
          {
            "name": "validated",
            "type": "bool"
          },
          {
            "name": "active",
            "type": "bool"
          }
        ]
      }
    }
  ]
};
