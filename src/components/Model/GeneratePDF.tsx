import { Dispatch, SetStateAction, useState } from "react";
import "./modal.css";

const GeneratePDF = function ({
  children,
  setOpenModel,
}: {
  children: React.ReactNode;
  setOpenModel: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="modal">
      <div style={{ lineHeight: "30px" }}>
        <i
          className="bi bi-info-circle icon"
          style={{ color: "#05659997", fontSize: "5em" }}
        ></i>
        <span
          style={{
            fontWeight: "600",
            color: "#056699",
            fontSize: "1.3em",
            margin: "5px 0",
          }}
        >
          export article as PDF
        </span>
        <span className="modal-content">
          Are you sure you want to download it
          <b style={{ color: "#2b2121" }}>cancel print </b>.
        </span>
        <div style={{ display: "flex", gap: "5px", margin: "10px auto" }}>
          {children}
          <button
            onClick={() => {
              setOpenModel(false);
            }}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneratePDF;
