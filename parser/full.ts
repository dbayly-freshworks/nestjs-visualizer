export const ABCD_full ={
   "moduleName":"AppModule",
   "imports":[
      {
         "name":"AmoduleModule",
         "path":"./amodule/amodule.module",
         "module":{
            "moduleName":"AmoduleModule",
            "imports":[
               {
                  "name":"BmoduleModule",
                  "path":"src/bmodule/bmodule.module",
                  "module":{
                     "moduleName":"BmoduleModule",
                     "imports":[ ],
                     "controllers":[
                        
                     ],
                     "exports":[
                        
                     ],
                     "providers":[
                        
                     ]
                  }
               }
            ],
            "controllers":[
               
            ],
            "exports":[
               
            ],
            "providers":[
               
            ]
         }
      },
      {
         "name":"BmoduleModule",
         "path":"./bmodule/bmodule.module",
         "module":{
            "moduleName":"BmoduleModule",
            "imports":[
               {
                  "name":"CmoduleModule",
                  "path":"src/cmodule/cmodule.module",
                  "module":{
                     "moduleName":"CmoduleModule",
                     "imports":[                     ],
                     "controllers":[
                        
                     ],
                     "exports":[
                        
                     ],
                     "providers":[
                        
                     ]
                  }
               }
            ],
            "controllers":[
               
            ],
            "exports":[
               
            ],
            "providers":[
               
            ]
         }
      },
      {
         "name":"CmoduleModule",
         "path":"./cmodule/cmodule.module",
         "module":{
            "moduleName":"CmoduleModule",
            "imports":[
               {
                  "name":"AmoduleModule",
                  "path":"src/amodule/amodule.module",
                  "module":{
                     "moduleName":"AmoduleModule",
                     "imports":[],
                     "controllers":[
                        
                     ],
                     "exports":[
                        
                     ],
                     "providers":[
                        
                     ]
                  }
               }
            ],
            "controllers":[
               
            ],
            "exports":[
               
            ],
            "providers":[
               
            ]
         }
      }
   ],
   "controllers":[
      {
         "name":"AppController",
         "path":"./app.controller"
      }
   ],
   "exports":[
      
   ],
   "providers":[
      {
         "name":"AppService",
         "path":"src/app.service"
      }
   ]
}