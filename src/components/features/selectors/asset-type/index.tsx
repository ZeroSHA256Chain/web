import { For, Text, createListCollection } from "@chakra-ui/react";
import { memo } from "react";

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui";
import { ASSET_TYPE_MAP } from "@/constants";

interface AssetTypeSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const assetsCollection = createListCollection({
  items: Object.values(ASSET_TYPE_MAP).map(({ label }) => ({
    label,
    value: label,
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
