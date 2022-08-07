import { CSSProperties } from "react";
import { focusStyle } from "../focus/focus";
import * as s from "./range.module.scss";

type Props = JSX.IntrinsicElements["input"] & {
  step: number;
  min: number;
  max: number;
};

const getCss = (props: Props): CSSProperties => {
  const { min, max, step } = props;
  const steps = (max - min) / step;
  const percent = 100 / steps;
  // range's track uses this variable to render marks
  const style = { "--step": `${percent}%` } as CSSProperties;
  return style;
};

export const Range = (props: Props): JSX.Element => {
  const { ...native } = props;
  return (
    <input
      {...native}
      type="range"
      className={[s.range, focusStyle].join(" ")}
      style={getCss(props)}
    />
  );
};