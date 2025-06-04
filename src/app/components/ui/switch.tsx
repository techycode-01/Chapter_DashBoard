import React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, disabled }) => {
  return (
    <label style={{ display: "inline-block", cursor: disabled ? "not-allowed" : "pointer" }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        disabled={disabled}
        style={{ display: "none" }}
      />
      <span
        style={{
          display: "inline-block",
          width: 40,
          height: 20,
          background: checked ? "#4ade80" : "#ccc",
          borderRadius: 20,
          position: "relative",
          transition: "background 0.2s"
        }}
      >
        <span
          style={{
            display: "block",
            width: 18,
            height: 18,
            background: "#fff",
            borderRadius: "50%",
            position: "absolute",
            top: 1,
            left: checked ? 20 : 1,
            transition: "left 0.2s"
          }}
        />
      </span>
    </label>
  );
};
