Bots Arena Client
=================

Récupérer le code
-----------------

```
git clone https://github.com/Bornholm/bots-arena-client.git
cd bots-arena-client
git submodule init
git submodule update
npm install
bower install
cd lib/shared
npm install
```

Lancer le client
----------------

Dans le répertoire parent du client

```
mkdir node-webkit
cd node-webkit
# Récuperer le runtime node-webkit à cette adresse https://github.com/rogerwang/node-webkit
# Au moment d'écrire ce document et pour ma machine, version 0.7.5, 64bits
wget https://s3.amazonaws.com/node-webkit/v0.7.5/node-webkit-v0.7.5-linux-x64.tar.gz
tar xzf node-webkit-*.tar.gz
mv node-webkit-*/* .
rm -rf node-webkit-*
./nw ../bots-arena-client
```