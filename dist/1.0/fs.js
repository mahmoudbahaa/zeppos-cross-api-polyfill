import{buf2str as o,str2buf as t}from"./data.js";const{O_RDONLY:n}=hmFS,{O_WRONLY:e}=hmFS,{O_RDWR:s}=hmFS,{O_APPEND:i}=hmFS,{O_CREAT:p}=hmFS,{O_EXCL:h}=hmFS,{O_TRUNC:f}=hmFS,r=o=>hmFS.open(o.path,o.flag||n),m=o=>hmFS.open_asset(o.path,o.flag||n),a=o=>{const[t,n]=hmFS.stat(o.path);return 0===n?t:void 0},S=o=>{const[t,n]=hmFS.stat_asset(o.path);return 0===n?t:void 0},F=o=>"number"==typeof o?hmFS.close(o):hmFS.close(o.fd),d=o=>(o.options=o.options||{},o.options.length=o.options.length||o.buffer.byteLength,o.options.offset=o.options.offset||0,o.options.position&&hmFS.seek(o.fd,o.options.position,hmFS.SEEK_SET),hmFS.read(o.fd,o.buffer,o.options.offset,o.options.length)),g=o=>(o.options=o.options||{},o.options.length=o.options.length||o.buffer.byteLength,o.options.offset=o.options.offset||0,o.options.position&&hmFS.seek(o.fd,o.options.position,hmFS.SEEK_SET),hmFS.write(o.fd,o.buffer,o.options.offset,o.options.length)),u=o=>"string"==typeof o?hmFS.remove(o):hmFS.remove(o.path),c=o=>hmFS.rename(o.oldPath,o.newPath),O=o=>"string"==typeof o?hmFS.mkdir(o):hmFS.mkdir(o.path),_=o=>{const[t,n]=hmFS.readdir(o.path);return 0===n?t:void 0},b=t=>{const n=a(t);if(void 0===n)return;const e=new ArrayBuffer(n.size),s=hmFS.open(t.path,hmFS.O_RDONLY);return d({fd:s,buffer:e}),F(s),t.options&&t.options.encoding?o(e,t.options.encoding):e},l=o=>{const n="number"==typeof o.path?o.path:hmFS.open(o.path,hmFS.O_WRONLY),e="string"==typeof o.data?t(o.data,o.options&&o.options.encoding):o.data instanceof ArrayBuffer?o.data:o.data.buffer;g({fd:n,buffer:e}),F({fd:n})};export{i as O_APPEND,p as O_CREAT,h as O_EXCL,n as O_RDONLY,s as O_RDWR,f as O_TRUNC,e as O_WRONLY,F as closeSync,O as mkdirSync,m as openAssetsSync,r as openSync,b as readFileSync,d as readSync,_ as readdirSync,c as renameSync,u as rmSync,S as statAssetsSync,a as statSync,l as writeFileSync,g as writeSync};
