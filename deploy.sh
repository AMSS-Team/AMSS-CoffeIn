rm -rf ./backend/public
mkdir ./backend/public
cd ./frontend
npm install
npm run build
echo "Done build"
ls ../backend/public
cd ../backend/functions
npm ci
npm run build

