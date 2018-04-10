#!/usr/bin/env bash

# set environment to instance (use for cronjob script)
#export GITHUB_TOKEN=${GITHUB_TOKEN}

# prepare github access token
git config --global credential.helper store
git config --global user.email "magestore.system@gmail.com"
git config --global user.name "Mkdocs tool"
echo "https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com" > /root/.git-credentials
echo ${GITHUB_TOKEN} > ./GITHUB_TOKEN

# create mkdocs app
mkdocs new app

# remote default doc
if [ -f ./app/docs/index.md ]; then
  rm ./app/docs/index.md
fi

#sed -i 's/site_name: \(.*\)/site_name: Magestore Docs/' ./app/mkdocs.yml

# rebuild from github
if [ "${RE_BUILD:-}" ]; then
  echo "Rebuild docs-tool"
  if [ -d ./mytheme ]; then
    rm -rf ./docs-tool
  fi
  git clone ${RE_BUILD} ./docs-tool
  cp -rf ./docs-tool/* .
fi

# copy to replace default mkdocs.yml
rm ./app/mkdocs.yml
cp -f ./mkdocs.yml ./app/
cp -rf ./docs/* ./app/docs/

if [ -d ./mytheme ]; then
  echo "Copy custom_theme"
  mkdir -p ./app/mytheme
  cp -r ./mytheme/* ./app/mytheme/
else
  mkdir -p ./app/mytheme
fi


# clone docs from github and build
cp -f ./mkdocs_build.sh ./app/

# run build script
cd ./app/ && /bin/sh ./mkdocs_build.sh

#service cron restart
#sudo /etc/init.d/cron restart

# run mkdocs with port
#mkdocs serve -a 0.0.0.0:${PORT} --dirtyreload

# wait for docker container running in minutes
#sleep 1000
