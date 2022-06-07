import "./Switch.css";
import cx from "classnames";

interface ISwitch {
  rounded: boolean;
  isToggled: any;
  onToggled: any;
  click?: React.MouseEventHandler<HTMLInputElement>;
}

export const Switch = (props: ISwitch) => {
  const sliderCX = cx("slider", {
    rounded: props.rounded,
  });

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={props.isToggled}
        onChange={props.onToggled}
        onClick={props.click}
      />
      <span className={sliderCX} />
    </label>
  );
};
