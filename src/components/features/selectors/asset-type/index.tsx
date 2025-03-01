import { For, Text, createListCollection } from "@chakra-ui/react";
import { memo } from "react";

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui";
import { AssetType } from "@/services";

interface AssetTypeSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const assetsCollection = createListCollection({
  items: Object.values(AssetType).map((assetType) => ({
    label: assetType,
    value: assetType,
  })),
});

export const AssetTypeSelector: React.FC<AssetTypeSelectorProps> = memo(
  ({ value, onChange }) => {
    return (
      <SelectRoot
        _placeholder={{
          color: "white",
        }}
        color="white"
        colorPalette="teal"
        size="sm"
        collection={assetsCollection}
        value={value}
        onValueChange={({ value }) => onChange(value)}
      >
        <SelectTrigger>
          <SelectValueText
            placeholder="Select"
            fontWeight="semibold"
            color="white"
          />
        </SelectTrigger>

        <SelectContent>
          <For
            each={assetsCollection.items}
            fallback={<Text>No assets found</Text>}
          >
            {(asset) => (
              <SelectItem item={asset} key={asset.value}>
                {asset.label}
              </SelectItem>
            )}
          </For>
        </SelectContent>
      </SelectRoot>
    );
  }
);
