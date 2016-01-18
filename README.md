# tpm
Typings package manager

## Requirements
Node >= 4.2  
Npm >= 2.14

## Installation
`npm install typings-package-manager --save`

## Usage
Put a typings.yaml file in the root directory of your project with the format like this:
```
typings:
  ramda: donnut/typescript-ramda
```

Where ramda will be the name of the typing (a folder that will be created and where
  the typings will be present in). "donnut" is the Github username
and "typescript-ramda" is the Github repository name.

The folder where the typings will be saved is by default: `typings_tpm`. It's possible to specify
a folder in the `typings.yaml` file like this:
```
typings_custom:
typings:
  ramda: donnut/typescript-ramda
```

Now the typings will be saved in the folder `typings_custom`.

Finally when the typings.yaml file is done, then just run: `tpm install`.

## Tests
`npm run test` will watch on save.  
`npm run test-once` will run the test suite one time.
