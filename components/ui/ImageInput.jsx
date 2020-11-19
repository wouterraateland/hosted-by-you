import "./ImageInput.scss";

import * as _ from "utils";
import cx from "classnames";

import React, { useCallback, useRef, useState } from "react";
import useTranslation from "hooks/useTranslation";

import * as Icons from "components/Icons";
import FlyOut from "./FlyOut";

const HiddenImageInput = ({ onChange }) => (
  <input
    className="input--hidden"
    type="file"
    accept="image/*"
    onChange={(event) => {
      if (event.target.files.length === 1) {
        onChange(event.target.files[0]);
      }
    }}
  />
);

export default function ImageInput({
  value,
  onChange,
  onDelete,
  disabled,
  compression,
  showIcon = true,
  children,
  className,
  ...props
}) {
  const containerRef = useRef(null);
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);

  const _onChange = useCallback(
    async (file) => {
      setOpen(false);
      const image = await _.fileToImage(file);
      const compressedImage = await _.compressImage(image, compression);
      onChange(compressedImage);
    },
    [compression, onChange]
  );

  const onRotate = useCallback(async () => {
    const image = await _.urlToImage(value);
    const rotatedImage = await _.rotateImage(image, compression);
    onChange(rotatedImage);
  }, [value, compression, onChange]);

  return (
    <div
      ref={containerRef}
      className={cx("image-input", { "cursor-pointer": !disabled }, className)}
      style={
        value
          ? { background: `url(${value}) no-repeat center / cover padding-box` }
          : null
      }
      onClick={isOpen ? null : () => setOpen(true)}
      {...props}
    >
      {disabled !== true &&
        (value ? (
          <FlyOut
            originRef={containerRef}
            isOpen={isOpen}
            onClose={() => setOpen(false)}
          >
            <FlyOut.Item color="error" onClick={onDelete}>
              <Icons.Bin size={1.25} /> {t`action.deleteImage`}
            </FlyOut.Item>
            <FlyOut.Item onClick={onRotate}>
              <Icons.Random size={1.25} /> {t`action.rotateImage`}
            </FlyOut.Item>
            <FlyOut.Item as="label" style={{ position: "relative" }}>
              <Icons.Camera size={1.25} /> {t`action.changeImage`}
              <HiddenImageInput onChange={_onChange} />
            </FlyOut.Item>
          </FlyOut>
        ) : (
          <>
            <span className="image-input__label text-caption">
              {showIcon && <Icons.Camera size={1.25} />}
              {children}
            </span>
            <HiddenImageInput onChange={_onChange} />
          </>
        ))}
    </div>
  );
}
