import { createSlice } from '@reduxjs/toolkit';
import { fetchAllBoosts } from '../actions/boosts';
import { fetchPartnersConfig } from '../actions/partners';
import { ChainEntity } from '../entities/chain';
import { PartnerEntity } from '../entities/partner';
import { VaultEntity } from '../entities/vault';

/**
 * State containing Vault infos
 */
export type PartnersState = {
  byId: {
    [partnerId: PartnerEntity['id']]: PartnerEntity;
  };
  moonpot: {
    byVaultId: {
      [vaultId: VaultEntity['id']]: boolean;
    };
  };
  insurace: {
    byChainId: {
      [chainId: ChainEntity['id']]: boolean;
    };
  };
  qidao: {
    byVaultId: {
      [vaultId: VaultEntity['id']]: boolean;
    };
  };
  solace: {
    byChainId: {
      [chainId: ChainEntity['id']]: boolean;
    };
  };
  nexus: {
    byChainId: {
      [chainId: ChainEntity['id']]: boolean;
    };
  };
};
export const initialPartnersState: PartnersState = {
  byId: {},
  moonpot: {
    byVaultId: {},
  },
  insurace: {
    byChainId: {},
  },
  qidao: {
    byVaultId: {},
  },
  solace: {
    byChainId: {},
  },
  nexus: {
    byChainId: {},
  },
};

export const partnersSlice = createSlice({
  name: 'partners',
  initialState: initialPartnersState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder.addCase(fetchPartnersConfig.fulfilled, (sliceState, action) => {
      for (const vaultId of action.payload.Moonpot) {
        if (!sliceState.moonpot.byVaultId[vaultId]) {
          sliceState.moonpot.byVaultId[vaultId] = true;
        }
      }
      for (const chainId of action.payload.Insurace) {
        if (!sliceState.insurace.byChainId[chainId]) {
          sliceState.insurace.byChainId[chainId] = true;
        }
      }
      for (const vaultId of action.payload.QiDao) {
        if (!sliceState.qidao.byVaultId[vaultId]) {
          sliceState.qidao.byVaultId[vaultId] = true;
        }
      }
      for (const chainId of action.payload.Solace) {
        if (!sliceState.solace.byChainId[chainId]) {
          sliceState.solace.byChainId[chainId] = true;
        }
      }
      for (const chainId of action.payload.Nexus) {
        if (!sliceState.nexus.byChainId[chainId]) {
          sliceState.nexus.byChainId[chainId] = true;
        }
      }
    });

    builder.addCase(fetchAllBoosts.fulfilled, (sliceState, action) => {
      for (const boosts of Object.values(action.payload)) {
        for (const boost of boosts) {
          for (const partner of boost.partners || []) {
            const id = partner.website;
            if (sliceState.byId[id] === undefined) {
              sliceState.byId[id] = { id, ...partner };
            }
          }
        }
      }
    });
  },
});
