import React from "react";

function BingoCell({ defiItem, index, onCellClick }) {
  const { jeu, defi, team, status } = defiItem;

  let bgClass = "bg-[#f2f2f2]";
  if (status === "green") {
    bgClass = "bg-[#c4d6b0]";
  } else if (status === "red") {
    bgClass = "bg-[#F64740]";
  }

  let textColorClass = "text-[#291F1E]";

  let borderColorClass = "border-[#291F1E]";

   switch (jeu.toLowerCase()) {
     case "bowling":
       borderColorClass = "border-[#A3333D]";
       break;
     case "billard":
       borderColorClass = "border-[#D7D474]";
       break;
     case "arcade":
       borderColorClass = "border-[#477998]";
       break;
     case "prison":
        borderColorClass = "border-[#689468]";
        break;
     case "hockey":
        borderColorClass = "border-[#9D869E]";
        break;
     case "cube":
        borderColorClass = "border-[#4FA8E0]";
        break;
     case "lasermax":
        borderColorClass = "border-[#F64740]";
        break;
     case "autre":
        borderColorClass = "border-[#384C5B]";
        break;
     default:
       borderColorClass = "border-[#291F1E]";
   }

   let borderClass = "border-0";
   if (status === "none") {
    borderClass = `border-[2px] ${borderColorClass}`;
   }

  return (
    <div
      className={`
        rounded 
        shadow 
        p-1 
        h-24 
        cursor-pointer 
        ${bgClass} 
        ${textColorClass} 
        ${borderClass}
        grid 
        grid-rows-[1fr_2fr_1fr]
      `}
      onClick={() => onCellClick(index)}
    >
      {/* Row 1 : Nom du jeu */}
      <div className="flex items-center justify-center text-[11px] font-bold leading-tight overflow-hidden text-ellipsis whitespace-nowrap">
        {jeu}
      </div>

      {/* Row 2 : Défi (milieu) => plus petit encore, et tronqué */}
      <div
        className="flex items-center justify-center text-center font-luciole px-1 text-[9px]"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {defi}
      </div>

      {/* Row 3 : SOLO/TEAM */}
      <div className="flex items-center justify-center text-[10px] font-luciole font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
        {team ? "TEAM" : "SOLO"}
      </div>
    </div>
  );
}

export default BingoCell;