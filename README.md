# Angular Air podcast 2016-07-12 code

On the podcast, we walk through a series of changes to a sample angular 1 ui-router application.
During these changes, we migrate to ui-router 1.0, then to a hybrid ng1/ng2 app, and finally migrate the app to Angular 2

This repository contains all the code shown in the podcast.

```
git clone https://github.com/christopherthielen/ngair-2016-07-12.git
cd ngair-2016-07-12
```

Each step of the process has its own branch in this repository

1) [A UI-Router 0.x app (legacy)](https://github.com/christopherthielen/ngair-2016-07-12/tree/1_legacy) 

2) [Migrating to UI-Router 1.0](https://github.com/christopherthielen/ngair-2016-07-12/tree/2_ui-router-1.0)

3) [Creating a hybrid ng1/ng2 app](https://github.com/christopherthielen/ngair-2016-07-12/tree/3_hybrid)

4) [Migrating to Angular 2](https://github.com/christopherthielen/ngair-2016-07-12/tree/4_ng2)

You can follow along with the changes by cloning this repository and checking out different branches.
After switching branches, make sure you update the npm dependencies, then run `npm start`.
For example:

```
git checkout 2_ui-router-1.0;
npm install;
npm start;
```

Each branch builds off the previous. 
Use Github branch compare feature to see the [total  differences between branches](https://github.com/christopherthielen/ngair-2016-07-12/compare/1_legacy...2_ui-router-1.0)
or view individual commits for more granularity.
