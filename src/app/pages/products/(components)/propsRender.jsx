import React from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Link from "next/link";

const PropsRender = ({ props, title }) => {
  return (
    <div className="w-full px-3 md:w-1/2">
      <label
        htmlFor={title}
        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
      >
        {title}
      </label>
      <Select
        name={title}
        id={title}
        color="neutral"
        placeholder="Choose category…"
        size="md"
      >
        {props.map((item, index) => (
          <Option key={index} value={item.name}>
            {item.name}
          </Option>
        ))}
        <Link className={"pl-[15px]"} href={"/"} value={"Add new"}></Link>
      </Select>
    </div>
  );
};

export default PropsRender;
