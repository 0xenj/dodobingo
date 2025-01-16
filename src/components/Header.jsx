import React, { useState } from "react";
import Lottie from "lottie-react";
import plusAnimation from "../assets/addGrid.json";

function Header({ totalGrids, currentGridNumber, onCreateGrid, onSelectGrid, onDeleteGrid}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSelectGrid = (index) => {
    onSelectGrid(index);
    setShowDropdown(false);
  };

  const handleCreateGridClick = () => {
    onCreateGrid();
    setAnimationKey((prev) => prev + 1); 
  };

  const handleDeleteGridClick = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onDeleteGrid();
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const gridNumbers = Array.from({ length: totalGrids }, (_, i) => i);

  return (
    <header className="flex items-center justify-between p-4 bg-[#291F1E] text-white shadow mb-2 relative">
      {/* Affichage "currentGridNumber / totalGrids" */}
      {totalGrids > 0 ? (
        <div
          className="relative font-bold cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {currentGridNumber}/{totalGrids}

          {showDropdown && (
            <ul
              className="
                absolute
                left-0
                top-8
                bg-[#291F1E]
                text-white
                border
                border-white
                shadow-lg
                z-50
                max-h-80
                overflow-y-auto
              "
            >
              {gridNumbers.map((num) => (
                <li
                  key={num}
                  className="px-4 py-2 hover:bg-[#477998]"
                  onClick={() => handleSelectGrid(num)}
                >
                  Grille {num + 1}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="text-gray-300">Aucune grille</div>
      )}

      <div>
        <h1 className="font-obviously text-2xl">
            DodoBingo
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Icône Poubelle */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" onClick={handleDeleteGridClick} className="w-6 h-6 hover:text-red-400 cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>


        {/* Animation Lottie (loop=false) */}
        <div className="flex items-center">
          <Lottie
            key={animationKey}
            animationData={plusAnimation}
            loop={false}
            style={{ width: 40, height: 40, cursor: "pointer" }}
            onClick={handleCreateGridClick}
          />
        </div>
      </div>

      {/* Modal de suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={cancelDelete}
          ></div>

          {/* Boîte */}
          <div className="relative bg-white text-black p-4 rounded shadow-lg z-50 w-80">
            <h2 className="text-lg font-bold mb-2">
              Es-tu sûr de vouloir supprimer la grille actuelle ?
            </h2>
            <div className="flex gap-4 justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={cancelDelete}
              >
                Non
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                Oui
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;