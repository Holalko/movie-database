import React, { FC } from "react";
import { OverlayTrigger, Tooltip as RTooltip } from "react-bootstrap";
type TooltipProps = {
  id: string;
  tooltip: string | JSX.Element;
};

const Tooltip: FC<TooltipProps> = ({ children, id, tooltip }) => {
  return (
    <OverlayTrigger
      placement={"top"}
      overlay={<RTooltip id={`tooltip-${id}`}>{tooltip}</RTooltip>}
    >
      <>{children}</>
    </OverlayTrigger>
  );
};

export default Tooltip;
