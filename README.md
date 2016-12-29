# park
Node.js REPL sandboxer.


### Suggested Usage
`nodemon index.js`

This not only gives you the REPL for exploration but hot-loads code that changes.  Context is pre-loaded based on your index.js and persistent data is _pouched_

If you don't have `nodemon` or a similar utility then I highly recommend it.  This project also uses PouchDB which is one of the simplest and most extensible solutions for data IMHO.

To get really fancy you can use built-in Node-REPL commands to `.load` and `.save` files to/from the REPL (as well as others detailed on the `repl` API docs.)


### Context
The REPL allows access anything assigned to the `replServer.context` object.

Each property in the context is assigned on a separate line because the `blah: new Blah()` syntax is unavailable within the object literal declaration...i.e. this method is more robust.


### Wiki

Check the wiki for more details.
