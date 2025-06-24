# ![JVC Logo](public/assets/logo.svg)

# Kaip keisti turinį

Šiame projekte visa svetainės informacija saugoma JSON failuose. Žemiau rasite žingsnis po žingsnio instrukcijas, kaip redaguoti turinį tiesiogiai per GitHub.

---

## 1. Įsitikinkite, kad esate šakoje **main**

Prieš redaguodami, patikrinkite, kad viršutiniame dešiniajame kampe GitHub yra pasirinkta šaka **main**.

---

## 2. Raskite JSON failus

1. GitHub meniu eikite į aplanką:
   ```
   public/data/
   ```
2. Čia rasite tris svarbius failus:
   - `contact.json`
   - `stores.json`
   - `marketplaces.json`

---

## 3. Redaguokite turinį

1. Spustelėkite vieną iš failų (pvz. `contact.json`).
2. Redaktoriaus lange atlikite norimus pakeitimus:
   - Keiskite tekstus
   - Atnaujinkite nuorodas
   - Pakeiskite paveikslėlių kelius
3. Įsitikinkite, kad:
   - JSON struktūra nepažeista
   - Laikomos kabutės, skliaustai ir kableliai

---

## 4. Įrašykite pakeitimus

1. Paspauskite **Commit changes**.

---

## 5. Automatinis publikavimas

- Po commit’o GitHub Actions automatiškai paleidžia diegimą.
- Per kelias minutes jūsų pakeitimai atsispindės svetainėje:
  ```
  https://laverna-jvc.github.io/
  ```

---

### Pastabos

- Jei JSON failuose yra klaidų, turinys nebus atnaujintas.
