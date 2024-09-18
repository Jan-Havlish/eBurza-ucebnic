# eBurza učebnic
Tento projekt burzy učebnic je součástí mé seminární práce. Aplikace nabízí alternativu ke každoroční tradiční burze učebnic na naší škole.

Aplikace využívá **React.js** s použitím **Vite**, **Tailwind CSS** pro stylování a **Firebase** pro backend.

## Jak si spustit tento projekt u sebe
0) Nainstalujte si NodeJS, NPM a git, pokud je ještě nemáte.
1) Klonujte tento repozitář:
```
git clone https://github.com/Jan-Havlish/eBurza-ucebnic.git
```
2) Přejděte do složky projektu a nainstalujte závyslosti. 
```
cd eBurza-ucebnic/
npm i
```
3) Vytvořte si projekt na [Firebase]("https://firebase.google.com/"), kde povolíte Firestore, Authentication a Storage a v Project settings si vytvořte webovou aplikaci.

4) Aktulizujte výchozí Firestore rules pomocí rules uložených v "./firebase-rules.txt"

5) Vytvořte soubor .env.local v hlavním adresářu projektu, zkopírujte základní definice proměných z pole pod tímto odstvcem a do prázdných textových řetezců v doplňte konfigurační údaje z předchozího kroku.

```
VITE_FIREBASE_API_KEY = ""
VITE_FIREBASE_AUTH_DOMAIN = ""
VITE_FIREBASE_PROJECT_ID = ""
VITE_FIREBASE_STORAGE_BUCKET = ""
VITE_FIREBASE_MESSAGING_SENDER_ID = ""
VITE_FIREBASE_APP_ID = ""
```

6) Spusťte projekt pomocí příkazu:
```
npm run dev
```
## Vlastní nasazení
1) Připravte si tento projekt na svém vývojovém zařízení.
2) Odstraňte odkazy na naši školu (např. loga).
3) Přidejte vlastní podmínky používání aplikace a prohlášení o zpracování osobních údajů (alespoň uložte ty naše u sebe).
4) Vytvořte produkční build:
   npm run build
5) Umístěte produkční build na server a zpřístupněte jej uživatelům.

## Spolupráce
Pokud mi chcete pomoci s tímto projektem, budu rád. Tento projekt je otevřený Pull requestům.