local json = require("cjson") -- Assicurati di avere il modulo JSON installato

local systeminfo = io.popen('systeminfo')
local cmdout=systeminfo:read("*a")
systeminfo:close()
local osLanguage = string.match(cmdout, "..;")

local prefs = {
  language = osLanguage:gsub(";", "")
}

local prefsFilePath = os.getenv("AppData").."/cazz1-launcher/config.json" -- Sostituisci con il percorso corretto del file

local file = io.open(prefsFilePath, "w")
if file then
  file:write(json.encode(prefs))
  file:close()
  print("Preferences file created successfully.")
else
  print("Failed to create preferences file.")
end