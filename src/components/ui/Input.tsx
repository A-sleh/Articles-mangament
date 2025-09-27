"use client";

import React from "react";

export type inputType = {
  type: string;
  placeHolder?: string;
  label: string;
  required?: boolean;
  value?: string;
  register?: any;
  readOnly?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = React.forwardRef<HTMLInputElement, inputType>(
  (
    {
      label,
      type,
      placeHolder,
      required = false,
      readOnly = false,
      className = "",
      ...props
    },
    ref
  ) => (
    <div className="mb-2 flex flex-col rounded-md shadow-sm ">
      <label className="mb-1">{label}</label>
      <input
        className={`px-4 py-2 bg-white ${
          readOnly ? "border-2 border-primary dark:border-primary-dark" : ""
        } outline-primary dark:outline-secondary-dark rounded-md ${className}`}
        readOnly={readOnly}
        type={type}
        placeholder={placeHolder}
        required={required}
        ref={ref}
        {...props}
      />
    </div>
  )
);
