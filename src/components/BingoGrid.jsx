import React, { useState } from "react";
import BingoCell from "./BingoCell";
import Confetti from "../assets/Confetti";

function BingoGrid({ gridData, onCaseUpdate }) {
  const { cases } = gridData;

  const [showModal, setShowModal] = useState(false);
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);

  const handleCellClick = (index) => {
    setSelectedCaseIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCaseIndex(null);
  };

  const markGreen = () => {
    if (selectedCaseIndex !== null) {
      onCaseUpdate(selectedCaseIndex, "green");
    }
    closeModal();

    setShowConfetti(true);
    setFadeOut(false); 
    setConfettiKey((prev) => prev + 1);

    setTimeout(() => {
        setFadeOut(true);
      }, 2000);

      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    };

  const markRed = () => {
    if (selectedCaseIndex === null) return;
    const currentStatus = cases[selectedCaseIndex].status;
    if (currentStatus === "red") {
      onCaseUpdate(selectedCaseIndex, "none");
    } else {
      onCaseUpdate(selectedCaseIndex, "red");
    }
    closeModal();
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-5 gap-2 p-4">
        {cases.map((item, index) => (
          <BingoCell
            key={index}
            defiItem={item}
            index={index}
            onCellClick={handleCellClick}
          />
        ))}
      </div>

      {showModal && selectedCaseIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-80"
            onClick={closeModal}
          ></div>

          {/* Modal box */}
          <div className="relative bg-[#291F1E] border border-white rounded p-4 z-50 w-4/5 max-w-md text-white">
            <h2 className="text-xl font-bold mb-2">
              {cases[selectedCaseIndex].jeu}
            </h2>
            <p className="mb-4">{cases[selectedCaseIndex].defi}</p>
            <p className="mb-4">
              {cases[selectedCaseIndex].team ? "TEAM" : "SOLO"}
            </p>

            <div className="flex flex-col gap-2">
              {/* Fermer */}
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                onClick={closeModal}
              >
                Fermer
              </button>

              {/* Vert */}
              <button
                className="bg-[#c4d6b0] text-black font-bold py-2 px-4 rounded"
                onClick={markGreen}
              >
                Valider
              </button>

              {/* Rouge (toggle) */}
              <button
                className="bg-[#F64740] hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={markRed}
              >
                Défi raté
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confettis + Fade out */}
      {showConfetti && (
        <div
          className={`
            fixed 
            inset-0 
            z-50 
            pointer-events-none 
            flex 
            items-center 
            justify-center
            transition-opacity 
            duration-1000
            ${fadeOut ? "opacity-0" : "opacity-100"}
          `}
        >
          <Confetti key={confettiKey} />
        </div>
      )}
    </div>
  );
}

export default BingoGrid;