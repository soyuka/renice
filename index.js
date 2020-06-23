'use strict'
const Spawner = require('promise-spawner')
const os = require('os')

const spawner = new Spawner()

/*
* http://superuser.com/questions/620724/changing-windows-process-priority-via-command-line
* idle: 64
* 
* below normal: 16384
* 
* normal: 32
* 
* above normal: 32768
* 
* high priority: 128
* 
* real time: 256
*/

module.exports = function(pid, priority) {
  let cmd

  // https://nodejs.org/api/os.html#os_os_setpriority_pid_priority
  if (typeof os.setPriority !== 'undefined') {
    return Promise.resolve(os.setPriority(pid, priority))
  }

  if (os.platform() == 'win32') {
    cmd = `wmic process where processid="${pid}" CALL setpriority ${priority}`
  } else {
    cmd = `renice -n ${priority} -p ${pid}`
  }

  return spawner.sp(cmd, {detached: true})
}
