import React, { useState, useEffect } from "react";
import defisData from "./data/defis.json"; 
import Header from "./components/Header";
import BingoGrid from "./components/BingoGrid";

function App() {
  const [grilles, setGrilles] = useState([]);
  const [currentGridIndex, setCurrentGridIndex] = useState(0);

  useEffect(() => {
    const savedGrilles = localStorage.getItem("myBingoGrids");
    if (savedGrilles) {
      const parsed = JSON.parse(savedGrilles);
      setGrilles(parsed);
      setCurrentGridIndex(parsed.length - 1);
    }
  }, []);

  function saveGrillesToLocalStorage(updatedGrilles) {
    localStorage.setItem("myBingoGrids", JSON.stringify(updatedGrilles));
  }

  function generateNewGrid() {
    const minAdef = 2;
    const maxAdef = 4;
    const nbAdefinir = Math.floor(Math.random() * (maxAdef - minAdef + 1)) + minAdef;
    const totalCases = 25;
  
    const shuffledDefis = [...defisData].sort(() => 0.5 - Math.random());
  
    const uniqueDefis = [];
    const seen = new Set();
  
    for (let i = 0; i < shuffledDefis.length; i++) {
      const d = shuffledDefis[i];
      if (!seen.has(d.id)) {
        uniqueDefis.push(d);
        seen.add(d.id);
      }
    }
  
    const nbDefisToPick = totalCases - nbAdefinir;
    const selectedDefis = uniqueDefis.slice(0, nbDefisToPick).map((item) => ({
      ...item,
      status: "none",
    }));
  
    const aDefinirCards = Array.from({ length: nbAdefinir }, (_, i) => ({
      id: `adef-${Date.now()}-${i}`, 
      jeu: "Autre",
      defi: "A définir", 
      team: false, 
      status: "none",
    }));
  
    const combined = [...selectedDefis, ...aDefinirCards];
  
    const finalGrid = combined.sort(() => 0.5 - Math.random());
  
    const newGrille = {
      id: Date.now(),
      cases: finalGrid,
    };
  
    const newGrilles = [...grilles, newGrille];
    setGrilles(newGrilles);
    setCurrentGridIndex(newGrilles.length - 1);
    localStorage.setItem("myBingoGrids", JSON.stringify(newGrilles));
  }

  function handleSelectGrid(index) {
    setCurrentGridIndex(index);
  }

  function handleDeleteCurrentGrid() {
    if (grilles.length === 0) return;

    const newGrilles = [...grilles];
    newGrilles.splice(currentGridIndex, 1);

    if (newGrilles.length === 0) {
      setGrilles([]);
      setCurrentGridIndex(0);
      saveGrillesToLocalStorage([]);
      return;
    }

    let newIndex = currentGridIndex;
    if (newIndex >= newGrilles.length) {
      newIndex = newGrilles.length - 1;
    }

    setGrilles(newGrilles);
    setCurrentGridIndex(newIndex);
    saveGrillesToLocalStorage(newGrilles);
  }

  function handleCaseUpdate(cellIndex, newStatus) {
    const newGrilles = [...grilles];
    const currentGrid = { ...newGrilles[currentGridIndex] };
    const updatedCases = [...currentGrid.cases];

    const challengeId = updatedCases[cellIndex].id;

    updatedCases[cellIndex].status = newStatus;
    currentGrid.cases = updatedCases;
    newGrilles[currentGridIndex] = currentGrid;

    for (let g = 0; g < newGrilles.length; g++) {
      const grid = { ...newGrilles[g] };
      const copiedCases = [...grid.cases];
  
      for (let c = 0; c < copiedCases.length; c++) {
        if (copiedCases[c].id === challengeId) {
          copiedCases[c].status = newStatus;
        }
      }
  
      grid.cases = copiedCases;
      newGrilles[g] = grid;
    }

    setGrilles(newGrilles);
    saveGrillesToLocalStorage(newGrilles);
  }

  const currentGrid = grilles[currentGridIndex];

  return (
    <div className="min-h-screen bg-[#291F1E] text-white"> 
      <Header
        totalGrids={grilles.length}
        currentGridNumber={currentGridIndex + 1}
        onCreateGrid={generateNewGrid}
        onSelectGrid={handleSelectGrid}
        onDeleteGrid={handleDeleteCurrentGrid}
      />

      {currentGrid ? (
        <BingoGrid
          gridData={currentGrid}
          onCaseUpdate={handleCaseUpdate}
        />
      ) : (
        <div className="p-4 text-center">Aucune grille pour le moment</div>
      )}
    </div>
  );
}

export default App;