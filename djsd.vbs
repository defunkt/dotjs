set sh = WScript.CreateObject("Wscript.Shell")
set fso = WScript.CreateObject("Scripting.FileSystemObject")

if WScript.Arguments.length > 0  then
  folder = sh.SpecialFolders("Startup")
  shortcut_file = folder & "\dotjs.lnk"
  if WScript.Arguments(0) = "setup" then
    set shortcut = sh.CreateShortcut(shortcut_file)
    shortcut.TargetPath = WScript.ScriptFullName
    shortcut.WindowStyle = 1
    shortcut.WorkingDirectory = "<%= JS_DIR %>"
    shortcut.Save
  end if
  if WScript.Arguments(0) = "uninstall" then
    fso.DeleteFile shortcut_file
    Wscript.Quit(0)
  end if
end if

sh.Run "ruby ""<%= File.join(DAEMON_INSTALL_DIR, "djsd") %>""", 0, False
