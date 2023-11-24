# tyk-test-automation-wrappers
Wrappers for UI tests automation

## Wrappers docs
[link](https://github.com/TykTechnologies/tyk-test-automation-wrappers/docs/index.html)

## How to update wrappers
If you need to update or modify method used by any wrapper follow the steps:
- in folder _wrappers_ find class you are interested in (all class are extedning Wrapper.ts, maybe your method belengs there)
- edit the class and create PR inside this repository. You don't need to rebuild anything, it will happen in the background
- when PR will be merged -> in the framework repository execute
```
npm update tyk-test-automation-wrappers
```
- make sure that file package-lock.json was included in the framework (dash, ara, portal) PR
- make sure all tests passed in framework repository

Note: for now we don't have any pipeline checking changes in wrappers before merge. Make sure that your PR was reviewed.