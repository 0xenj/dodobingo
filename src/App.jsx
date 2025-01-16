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
    // 1) Déterminer le nombre de cartes “A définir” (entre 2 et 4)
    const minAdef = 2;
    const maxAdef = 4;
    const nbAdefinir = Math.floor(Math.random() * (maxAdef - minAdef + 1)) + minAdef;
    // Total de 25 cases dans la grille
    const totalCases = 25;
  
    // 2) Mélanger le JSON de défis pour avoir un ordre aléatoire
    const shuffledDefis = [...defisData].sort(() => 0.5 - Math.random());
  
    // 3) Créer un set pour éviter les doublons (si "defi" ou "id" est unique)
    const uniqueDefis = [];
    const seen = new Set();
  
    for (let i = 0; i < shuffledDefis.length; i++) {
      const d = shuffledDefis[i];
      // par exemple, on prend d.id comme clé unique :
      if (!seen.has(d.id)) {
        uniqueDefis.push(d);
        seen.add(d.id);
      }
    }
  
    // 4) Sélectionner (25 - nbAdefinir) défis distincts
    //    Si uniqueDefis n'a pas assez d'entrées, vous pouvez fallback
    const nbDefisToPick = totalCases - nbAdefinir;
    const selectedDefis = uniqueDefis.slice(0, nbDefisToPick).map((item) => ({
      ...item,
      status: "none",
    }));
  
    // 5) Générer X cartes “A définir”
    //    On crée un objet minimal : { id, jeu, defi, team, status } 
    //    ou tout autre format nécessaire
    const aDefinirCards = Array.from({ length: nbAdefinir }, (_, i) => ({
      id: `adef-${Date.now()}-${i}`, 
      jeu: "Autre",
      defi: "A définir", 
      team: false, 
      status: "none",
    }));
  
    // 6) Combiner les cartes défis + cartes “A définir”
    const combined = [...selectedDefis, ...aDefinirCards];
  
    // 7) (Optionnel) Re-mélanger le lot final si vous voulez que 
    //    les “A définir” soient répartis aléatoirement
    const finalGrid = combined.sort(() => 0.5 - Math.random());
  
    // 8) Construire la grille
    const newGrille = {
      id: Date.now(),
      cases: finalGrid, // 25 entrées
    };
  
    // 9) Mettre à jour le state local + localStorage (comme vous le faisiez avant)
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

    // Si plus de grilles du tout
    if (newGrilles.length === 0) {
      setGrilles([]);
      setCurrentGridIndex(0);
      saveGrillesToLocalStorage([]);
      return;
    }

    // Sinon, on choisit un nouvel index valide
    let newIndex = currentGridIndex;
    if (newIndex >= newGrilles.length) {
      newIndex = newGrilles.length - 1;
    }

    setGrilles(newGrilles);
    setCurrentGridIndex(newIndex);
    saveGrillesToLocalStorage(newGrilles);
  }

  // Mettre à jour le statut (vert ou rouge, ou none)
  function handleCaseUpdate(cellIndex, newStatus) {
    const newGrilles = [...grilles];
    const currentGrid = { ...newGrilles[currentGridIndex] };
    const updatedCases = [...currentGrid.cases];

    updatedCases[cellIndex].status = newStatus;
    currentGrid.cases = updatedCases;
    newGrilles[currentGridIndex] = currentGrid;

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