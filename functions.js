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

  /**
 * Létrehoz egy dinamikus űrlapot az új sor hozzáadásához.
 * @returns {HTMLFormElement} A létrehozott űrlap elem.
 */
function generateForm() {
    const form = document.createElement('form');
    form.id = 'form';
    form.action = '#';
    
    /**
     * Segédfüggvény űrlap mező létrehozásához.
     * @param {string} labelText - A mező felirata.
     * @param {string} inputType - Az input típusa (pl. "text").
     * @param {string} id - Az input egyedi azonosítója, amelyet a name attribútumként is használ.
     * @param {string} errorMessage - Hibaüzenet, ha a validáció sikertelen.
     * @returns {HTMLElement} A mezőt tartalmazó konténer.
     */
    function createFormField(labelText, inputType, id, errorMessage) {
      const div = document.createElement('div');
      
      const label = document.createElement('label');
      label.htmlFor = id;
      label.textContent = labelText;
      div.appendChild(label);
      div.appendChild(document.createElement('br'));
      
      const input = document.createElement('input');
      input.type = inputType;
      input.id = id;
      input.name = id;
      div.appendChild(input);
      div.appendChild(document.createElement('br'));
      
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error';
      errorDiv.id = 'error-' + id;
      errorDiv.textContent = errorMessage;
      div.appendChild(errorDiv);
      
      return div;
    }
    
    // Kötelező mezők: szerzo_nev, csapat, első mű
    form.appendChild(createFormField('Szerző neve:', 'text', 'szerzo_nev', 'Kötelező mező!'));
    form.appendChild(createFormField('Csapat:', 'text', 'group', 'Kötelező mező!'));
    form.appendChild(createFormField('Első mű:', 'text', 'mu1', 'Kötelező mező!'));
    
    // Jelölőnégyzet: Szeretnél megadni második művet is?
    const masodikDiv = document.createElement('div');
    const masodikLabel = document.createElement('label');
    masodikLabel.htmlFor = 'masodik';
    masodikLabel.textContent = 'Szeretnél megadni második művet is?';
    masodikDiv.appendChild(masodikLabel);
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'masodik';
    checkbox.name = 'masodik';
    masodikDiv.appendChild(checkbox);
    
    // Hibajelzés a jelölőnégyzet feltételhez (ha mu2 mező kitöltött, de nincs bejelölve)
    const checkboxError = document.createElement('div');
    checkboxError.className = 'error';
    checkboxError.id = 'error-masodik';
    checkboxError.textContent = 'Második mű megadásához kötelező bejelölni';
    masodikDiv.appendChild(checkboxError);
    form.appendChild(masodikDiv);
    
    // Második mű mező
    form.appendChild(createFormField('Második mű:', 'text', 'mu2', 'Ha bejelölted, akkor kötelező kitölteni!'));
    
    // Űrlap elküldéséhez gomb
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Hozzáadás';
    form.appendChild(submitButton);
    
    document.body.appendChild(form);
    return form;
  }

  /**
 * Validál egy adott input mezőt.
 * @param {HTMLInputElement} inputElement - Az ellenőrizendő input mező.
 * @param {HTMLElement} errorElement - Az a hibaüzenet eleme, amelyet meg kell jeleníteni hibás esetben.
 * @returns {boolean} True, ha a mező nem üres; egyébként false.
 */
function validateField(inputElement, errorElement) {
    errorElement.style.display = 'none';
    if (inputElement.value === '') {
      errorElement.style.display = 'block';
      return false;
    }
    return true;
  }
  
  /**
   * Validálja a második művel kapcsolatos feltételeket.
   * Ha a jelölőnégyzet be van jelölve, akkor a mu2 mezőnek nem lehet üres.
   * Ha nincs bejelölve, akkor a mu2 mezőnek üresnek kell lennie.
   * @returns {boolean} True, ha a validáció sikeres, egyébként false.
   */
  function complexValidate() {
    const checkbox = document.getElementById('masodik');
    const mu2Input = document.getElementById('mu2');
    const mu2Error = document.getElementById('error-mu2');
    const masodikError = document.getElementById('error-masodik');
    
    // Hibák törlése
    mu2Error.style.display = 'none';
    masodikError.style.display = 'none';
    
    if (checkbox.checked) {
      // Ha bejelöltött, akkor a mu2 nem lehet üres
      if (mu2Input.value === '') {
        mu2Error.style.display = 'block';
        return false;
      }
    } else {
      // Ha nincs bejelölve, akkor a mu2 mezőnek üresnek kell lennie!
      if (mu2Input.value !== '') {
        masodikError.style.display = 'block';
        return false;
      }
    }
    return true;
  }

  