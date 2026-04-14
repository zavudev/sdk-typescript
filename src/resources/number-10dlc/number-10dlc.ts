// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as BrandsAPI from './brands';
import {
  BrandCreateParams,
  BrandCreateResponse,
  BrandListParams,
  BrandListUseCasesResponse,
  BrandRetrieveResponse,
  BrandSubmitResponse,
  BrandSyncStatusResponse,
  BrandUpdateParams,
  BrandUpdateResponse,
  Brands,
  TenDlcBrand,
  TenDlcBrandsCursor,
} from './brands';
import * as CampaignsAPI from './campaigns/campaigns';
import {
  CampaignCreateParams,
  CampaignCreateResponse,
  CampaignListParams,
  CampaignRetrieveResponse,
  CampaignSubmitResponse,
  CampaignSyncStatusResponse,
  CampaignUpdateParams,
  CampaignUpdateResponse,
  Campaigns,
  TenDlcCampaign,
  TenDlcCampaignsCursor,
} from './campaigns/campaigns';

export class Number10dlc extends APIResource {
  brands: BrandsAPI.Brands = new BrandsAPI.Brands(this._client);
  campaigns: CampaignsAPI.Campaigns = new CampaignsAPI.Campaigns(this._client);
}

Number10dlc.Brands = Brands;
Number10dlc.Campaigns = Campaigns;

export declare namespace Number10dlc {
  export {
    Brands as Brands,
    type TenDlcBrand as TenDlcBrand,
    type BrandCreateResponse as BrandCreateResponse,
    type BrandRetrieveResponse as BrandRetrieveResponse,
    type BrandUpdateResponse as BrandUpdateResponse,
    type BrandListUseCasesResponse as BrandListUseCasesResponse,
    type BrandSubmitResponse as BrandSubmitResponse,
    type BrandSyncStatusResponse as BrandSyncStatusResponse,
    type TenDlcBrandsCursor as TenDlcBrandsCursor,
    type BrandCreateParams as BrandCreateParams,
    type BrandUpdateParams as BrandUpdateParams,
    type BrandListParams as BrandListParams,
  };

  export {
    Campaigns as Campaigns,
    type TenDlcCampaign as TenDlcCampaign,
    type CampaignCreateResponse as CampaignCreateResponse,
    type CampaignRetrieveResponse as CampaignRetrieveResponse,
    type CampaignUpdateResponse as CampaignUpdateResponse,
    type CampaignSubmitResponse as CampaignSubmitResponse,
    type CampaignSyncStatusResponse as CampaignSyncStatusResponse,
    type TenDlcCampaignsCursor as TenDlcCampaignsCursor,
    type CampaignCreateParams as CampaignCreateParams,
    type CampaignUpdateParams as CampaignUpdateParams,
    type CampaignListParams as CampaignListParams,
  };
}
