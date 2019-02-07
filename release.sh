RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'  

if [ $# -eq 0 ]
then
  echo ${RED}No arguments supplied${NC}
  exit 1
fi

npm run build

oldVersion=$(cat ./package.json | jq .version | tr -d '"')

if [ "$1" == "--major" ]
then
  npm version major
elif [ "$1" == "--minor" ]
then
  npm version minor
elif [ "$1" == "--patch" ]
then
  npm version patch
else
  echo ${RED}Invalid argument $1${NC}
  echo usage: sh release.sh [--major] [--minor] [--patch]
  exit 1
fi

version=$(cat ./package.json | jq .version | tr -d '"')

sed -i -e "s/$oldVersion/$version/g" README.md README.md
sed -i -e "s/$oldVersion/$version/g" docs/index.md docs/index.md

rm README.md-e
rm docs/index.md-e

js=calculator-dsl-"$version".js
css=calculator-dsl-"$version".css

cp ./dist/app.js ./dist/$js
cp ./dist/app.css ./dist/$css

echo '--------------------------------------------------------'

s3cmd put --acl-public -m text/javascript --add-header="Cache-Control:max-age=63072000" ./dist/$js s3://cleartax-media/calculator/dist/$js
s3cmd put --acl-public -m text/css --add-header="Cache-Control:max-age=63072000" ./dist/$css s3://cleartax-media/calculator/dist/$css

echo '--------------------------------------------------------'

CDN_PREFIX="https://assets1.cleartax-cdn.com/calculator/dist/"

echo ${GREEN}'The CDN links to the files are below.'${NC}
echo ${BLUE}$CDN_PREFIX$js${NC}
echo ${BLUE}$CDN_PREFIX$css${NC}

if [ "$2" == "--push" ]
then
  echo ${GREEN}'Pushing to git'${NC}
  echo " "
  git add -A
  git commit -m "update docs to $version"
  git push origin HEAD
fi
