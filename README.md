# renice
Change cpu process priority

## Installation

```
npm install renice
```

## Usage

```
const renice = require('renice')

// pid, priority
renice(process.pid, 42)
.then(() => {}).catch((err) => {})
```

For more informations about priorities see https://nodejs.org/api/os.html#os_os_setpriority_pid_priority. Note that on old node versions we'll fallback to `wmic` on windows and `renice` on unix.
