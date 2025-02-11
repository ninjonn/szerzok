/**
 * Globális tömb a táblázat sorainak adataival.
 * @type {Array<{szerzo_nev: string, group: string, mu1: string, mu2?: string}>}
 */
let tableData = [
    { szerzo_nev: "Vörösmarty Mihály",
      group: "romantikus triász",
      mu1: "Zalán futása",
      mu2: "Szózat" 
    },
    { szerzo_nev: "Móricz Zsigmond",
      group: "Nyugat I.",
      mu1: "Hét krajcár" 
    },
    { szerzo_nev: "Illyés Gyula",
      group: "Nyugat II.",
      mu1: "Egy mondat a zsarnokságról",
      mu2: "Puszták népe"
    },
    { szerzo_nev: "Radnóti Miklós",
      group: "Nyugat III.",
      mu1: "Pogány köszöntő",
      mu2: "Járkálj csak, halálraítélt" 
    }
  ];
  
  const table = document.createElement('table');
  document.body.appendChild(table);
  
  /**
   * Létrehozza és a megadott táblázathoz hozzáadja a fejlécet.
   * @param {HTMLTableElement} table - A táblázat, amelyhez a fejlécet hozzáadja.
   */
  function generateTableHeader(table) {
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const thSzerzo = document.createElement('th');
    thSzerzo.textContent = "Szerző neve";
    headerRow.appendChild(thSzerzo);
    
    const thGroup = document.createElement('th');
    thGroup.textContent = "Csapat";
    headerRow.appendChild(thGroup);
    
    const thMu = document.createElement('th');
    thMu.textContent = "Művei";
    thMu.colSpan = 2;
    headerRow.appendChild(thMu);
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
  }
  
  /**
   * Létrehozza és a megadott táblázathoz hozzáadja a törzsrészt a data tömb alapján.
   * @param {HTMLTableElement} table - A táblázat, amelyhez a törzs tartalmát hozzáadja.
   * @param {Array<{szerzo_nev: string, group: string, mu1: string, mu2?: string}>} data - A sorok adatait tartalmazó tömb.
   */
  function generateTable(data) {
    table.innerHTML = ''; 
    generateTableHeader(table);
  
    const tbody = document.createElement('tbody');
    
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const tr = document.createElement('tr');
      
      // Szerző neve
      const tdSzerzo = document.createElement('td');
      tdSzerzo.textContent = item.szerzo_nev;
      tr.appendChild(tdSzerzo);   
      
      // Csapat
      const tdGroup = document.createElement('td');
      tdGroup.textContent = item.group;
      tr.appendChild(tdGroup);
      
      // Ha van második mű, két külön cella, egyébként egy cella colspan=2
      if(item.mu2 && item.mu2 !== "") {
        const tdMu1 = document.createElement('td');
        tdMu1.textContent = item.mu1;
        tr.appendChild(tdMu1);
        
        const tdMu2 = document.createElement('td');
        tdMu2.textContent = item.mu2;
        tr.appendChild(tdMu2);
      } else {
        const tdMu = document.createElement('td');
        tdMu.textContent = item.mu1;
        tdMu.colSpan = 2;
        tr.appendChild(tdMu);
      }
      
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
  }
  
  generateTable(tableData);
  