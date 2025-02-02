import { GearIcon } from "@primer/octicons-react";
import { LayoutState } from "../layout/type";
import { Popover } from "../popover/popover";
import { SettingsPanel } from "../settings/panel";
import { SettingsState } from "../settings/type";
import { ToolbarButton } from "./button/button";

interface Props extends SettingsState, LayoutState {}

export const ToolbarSettings = (props: Props): JSX.Element => {
  return (
    <Popover
      button={({ open }) => (
        <ToolbarButton Icon={GearIcon} label="Settings" selected={open} />
      )}
    >
      <SettingsPanel {...props} />
    </Popover>
  );
};
