#!/usr/bin/env bash

executeTask() {
  local task=$1

  echo "Executing task $task"

  case "$1" in
    menu)
      adb shell input keyevent 82
      ;;

    reload)
      adb shell input keyevent 82
      adb shell input keyevent 66
      adb shell input keyevent 66
      ;;

    *)
      echo $"Usage: $0 {menu|reload}"
      exit 1
      ;;

  esac
}

executeTask "$@"