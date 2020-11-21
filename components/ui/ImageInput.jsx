import { fileToImage, compressImage } from "utils/images";
import cx from "classnames";

import React, { useCallback, useRef } from "react";

import Bin from "components/icons/Bin";
import Camera from "components/icons/Camera";
import Button from "./Button";

const HiddenImageInput = ({ onChange }) => (
  <input
    className="hidden absolute inset-0"
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
  className,
  ...props
}) {
  const containerRef = useRef(null);

  const _onChange = useCallback(
    async (file) => {
      const image = await fileToImage(file);
      const compressedImage = await compressImage(image, compression);
      onChange(compressedImage);
    },
    [compression, onChange]
  );

  return (
    <div className="flex items-center space-x-4">
      <label
        ref={containerRef}
        className={cx(
          "block relative overflow-hidden flex-shrink-0",
          { "cursor-pointer": !disabled },
          className
        )}
        {...props}
      >
        {value ? (
          <img className="w-full h-full object-cover" src={value} />
        ) : (
          disabled !== true && (
            <Camera className="relative w-4 h-4 stroke-current stroke-3" />
          )
        )}
        <HiddenImageInput onChange={_onChange} disabled={disabled} />
      </label>
      {value ? (
        <>
          <Button
            type="button"
            className="flex items-center space-x-2 px-2 py-1 rounded-full bg-red-100 hover:bg-red-200 text-red-500"
            onClick={onDelete}
            disabled={disabled}
          >
            <Bin className="w-4 h-4 stroke-current stroke-3" />
            <strong>Delete image</strong>
          </Button>
          <label className="relative flex items-center space-x-2 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer">
            <Camera className="w-4 h-4 stroke-current stroke-3" />
            <strong>Change image</strong>
            <HiddenImageInput onChange={_onChange} disabled={disabled} />
          </label>
        </>
      ) : (
        <span>Upload image</span>
      )}
    </div>
  );
}
