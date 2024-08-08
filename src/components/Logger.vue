<script setup lang="ts">
import { LogLevels, LogStatus } from '../types/Logger';

const logs = [
  {
    level: LogLevels.INFO,
    msg: "Hello",
    status: LogStatus.OK,
    owner: "admin"
  },
  {
    level: LogLevels.WARNING,
    msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    status: LogStatus.OK,
    owner: "admin"
  },
  {
    level: LogLevels.WARNING,
    msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    status: LogStatus.ERROR,
    owner: "admin"
  },
  {
    level: LogLevels.WARNING,
    msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    status: LogStatus.OK,
    owner: "admin"
  },
]
</script>

<template>
  <div class="bg-blue-300 w-1/5 h-1/2 rounded-lg shadow-md p-4 opacity-90 overflow-y-auto overflow-x-hidden scrollbar-w-2 scrollbar-bg-gray-200 scrollbar-thumb-rounded scrollbar-thumb-gray-500">
    <p v-for="(log, index) in logs" :key="index" class="mb-2 text-gray-700">
      <span :class="log.level.color">[{{log.level.text}}]</span> <span>{{log.owner}}:</span>  <span>{{log.msg}}</span> <span :class="log.status.color">[{{log.status.text}}]</span>
    </p>
  </div>
</template>

<style scoped>
 p {
   font-size: smaller;
 }
</style>