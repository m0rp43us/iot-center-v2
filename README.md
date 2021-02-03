# Custom giraffe

build before yarn install
`yarn --cwd app giraffe:all`

- reverting manual giraffe building 
  - ui package original dependencies
"react": "^16.13.1",
"react-dom": "^16.13.1",
"@influxdata/giraffe": "^0.37.0",
  - ui package delete all "giraffe:*" commands 

# IoT Center v2

This repository contains the IoT Center application that provides a web UI that shows how to use InfluxDB v2 in various use cases. 
It also contains independent clients that write into InfluxDB.

## Features

* simple device management, automatic registration of devices in InfluxDB
* arduino, pyton, javasript clients
* various data visualizations, dashboards

## Quick Start

* Prerequisites
   * node 12 or newer
   * yarn 1.9.4 or newer

### Run IoT Center Application

#### From Source
```
cd app
yarn install
yarn build
yarn start
open http://localhost:5000
```

or

```
docker-compose up
open http://localhost:5000
```

#### Docker

Docker images are available on [GitHub Packages](https://github.com/bonitoo-io/iot-center-v2/packages) with `nightly` tag:

```
docker pull docker.pkg.github.com/bonitoo-io/iot-center-v2/iot-center:nightly

docker run \
  --name iot-center \
  --detach \
  --env INFLUX_URL=http://10.100.10.100:9999 \
  --env INFLUX_TOKEN=my-token \
  --env INFLUX_ORG=my-org \
  --publish 5000:5000 \
  docker.pkg.github.com/bonitoo-io/iot-center-v2/iot-center:nightly
```

##### Authenticating to GitHub Packages with personal access token

You must use a personal access token with the appropriate scopes to use image from GitHub Packages. 

For more information, see "[Authenticating with a personal access token](https://docs.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-docker-for-use-with-github-packages#authenticating-with-a-personal-access-token)".
```
cat ~/TOKEN.txt | docker login https://docker.pkg.github.com -u USERNAME --password-stdin
```

### Develop and Play with IoT Center Application (hot-swap enabled)

```
cd app
yarn install
yarn dev
```

### Environment Installation

* Install latest node.js
* Install latest yarn
* Download this GIT repository
* Install local InfluxDB 2 instance or register account in InfluxDB Cloud 2 if not exists
* Create admin token
* Set environment variable INFLUX_TOKEN with the admin token from the previous point
* Set environment variable INFLUX_URL (do not use localhost or 127.0.0.1 - IoT Devices need external address)
* Set environment variable INFLUX_ORG
* Run IoT Center

## License

The project is under the [MIT License](https://opensource.org/licenses/MIT).
