import { AssetType } from "@/services";

export const ASSET_TYPE_LABELS = [
  "Real",
  "ERC20",
  "ERC721",
  "ERC1155",
] as const;

export type AssetTypeLabel = (typeof ASSET_TYPE_LABELS)[number];

export const ASSET_TYPE_MAP = {
  [AssetType.Real]: {
    label: ASSET_TYPE_LABELS[0],
    value: AssetType.Real,
  },
  [AssetType.ERC20]: {
    label: ASSET_TYPE_LABELS[1],
    value: AssetType.ERC20,
  },
  [AssetType.ERC721]: {
    label: ASSET_TYPE_LABELS[2],
    value: AssetType.ERC721,
  },
  [AssetType.ERC1155]: {
    label: ASSET_TYPE_LABELS[3],
    value: AssetType.ERC1155,
  },
};

export const LABEL_TO_ASSET_TYPE = Object.values(ASSET_TYPE_MAP).reduce(
  (accumulator, { label, value }) => ({
    ...accumulator,
    [label]: value,
  }),
  {} as Record<string, AssetType>
);
